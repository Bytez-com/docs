module Bytez
using HTTP
using JSON3
include("types.jl")

global API_KEY = ""

const MODEL_LOAD_TIMEOUT_MINUTES = 15  # Number of minutes for timeout
const MODEL_LOAD_TIMEOUT_MINUTES_AS_SECONDS = MODEL_LOAD_TIMEOUT_MINUTES * 60

struct HttpError <: Exception
	message::String
	http_status::Int
end


struct List
	models::Function
	instances::Function
	List() = new(list_models, list_instances)
end
struct Client
	key::String
	list::List
	model::Function
end
mutable struct Model
	# props
	id::String
	timeout::Int
	concurrency::Int
	# methods
	start::Function
	load::Function
	stop::Function
	status::Function
	run::Function

	# custom constructor
	function Model(model_id::String, concurrency::Int, timeout::Int)
		model_id_dict = Dict("model" => model_id)
		start_dict = merge(
			model_id_dict,
			Dict("concurrency" => concurrency, "timeout" => timeout))

		model = new(
			model_id,
			timeout,
			concurrency,
			() -> start(start_dict),
			() -> load(start_dict),
			() -> stop(model_id_dict),
			() -> status(model_id_dict),
			(input, params = Dict()) -> run(input, model_id_dict, params),
		)

		return model
	end
end

function request(path::String, body::Union{Dict, Nothing} = nothing)
	is_streaming = get(body, "stream", false)
	data_channel = Channel{Any}(Inf)
	status_code_channel = Channel{Any}(Inf)

	@async begin
		try
			response = HTTP.open(
				body === nothing ? "GET" : "POST",
				"$HOST/$path",
				status_exception = false,
				body = JSON3.write(body),
				headers = Dict(
					"Authorization" => "Key $API_KEY",
					"Content-type" => "application/json",
				),
			) do http_io
				write(http_io, JSON3.write(body))
				startread(http_io)

				# Stream the http_io in chunks and write each to the channel
				while !eof(http_io)
					chunk = String(readavailable(http_io))  # Read available chunk as a string

					put!(data_channel, chunk)  # Write chunk to channel
				end

				# get the last chunk once you've reached the end
				chunk = String(readavailable(http_io))
				put!(data_channel, chunk)
			end
			# always make the status code available via a channel for non streaming calls
			status_code = response.status
			put!(status_code_channel, status_code)
		catch error
			println(error)
		finally
			close(data_channel)
			close(status_code_channel)
		end
	end

	# just return the data channel directly if streaming
	if is_streaming
		return data_channel
	end

	json_string = ""
	while isopen(data_channel)
		item = String(take!(data_channel))
		json_string *= item
	end

	result = JSON3.read(json_string)

	error = get(result, "error", nothing)

	if error !== nothing
		http_status = take!(status_code_channel)
		http_error = HttpError(error, http_status)

		return Dict("error" => http_error)
	end

	return result
end
#
# model methods
#
const status = (body::Dict) -> request("model/status", body)
const start = (body::Dict) -> request("model/load", body)
const stop = (body::Dict) -> request("model/delete", body)

function run(input::Any, model_id_dict::Dict, options::Dict)
	body = merge(
		model_id_dict,
		Dict("stream" => get(options, "stream", false)),
		Dict("params" => get(options, "params", Dict())),
	)

	# Check if input is a dictionary
	if isa(input, Dict)
		body = merge(body, input)
	else
		body["input"] = input
	end

	results = request("model/run", body)

	if get(body, "stream", false) === true
		return results
	end

	error = get(results, "error", nothing)

	if error !== nothing
		throw(error)
	end

	return results
end

function load(body::Dict)
	json = start(body)
	error = get(json, "error", nothing)

	if error !== nothing
		# model is already loaded
		if error.http_status === 409
			return
		end
		# // We allow 429's to proceed, that means that a loading operation is already in progress
		if error.http_status !== 429 || occursin("credits", error.message)
			throw(error)
		end

	end

	time_to_timeout = time() * 1000 + MODEL_LOAD_TIMEOUT_MINUTES_AS_SECONDS

	status = "UNSET"
	while time() < time_to_timeout
		json = request("model/status", body)
		new_status = json["status"]
		error = get(json, "error", nothing)

		if status !== new_status
			status = new_status
			println(status)
		end

		if status === "RUNNING"
			return
		end

		if status === "FAILED"
			exception = Exception(error)
			throw(exception)
		end

		sleep(5)
	end
end
#
# list functions
#
const list_models = () -> request("model/list")
#   function list_models(task::Union{Task,Nothing} = nothing)
#     return request(task === nothing ? "model/list" : "model/list?task=$task")
#   end
const list_instances = () -> request("model/instances")
#
# bytez
#
function init(key::String, dev::Bool = false)
	global API_KEY = key

	global HOST

	if dev
		HOST = "http://localhost:8080"
	else
		HOST = "https://bytez.com"
	end

	function create_new_model(model_id::String; concurrency::Int = 1, timeout::Int = 300)
		return Model(model_id, concurrency, timeout)
	end

	return Client(key, List(), create_new_model)
end


export init
end