module Bytez
  using HTTP
  using JSON3
  include("types.jl")

  global API_KEY = ""

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
      status::Function
      start::Function
      stop::Function
      run::Function
      load::Function
      # custom constructor
      function Model(model_id::String, concurrency::Int, timeout::Int)
          body_with_model_id = Dict("model" => model_id)
          json_body = JSON3.write(body_with_model_id)
          json_body_model_start = JSON3.write(
              merge( 
                  body_with_model_id,
                  Dict("concurrency" => concurrency, "timeout" => timeout)
              )
          )

          model = new(
              model_id,
              timeout,
              concurrency,
              () -> status(json_body),
              () -> start(json_body_model_start),
              () -> stop(json_body),
              (input, params = Dict()) -> run(input, body_with_model_id, params),
              () -> load(json_body_model_start)
          )

          return model
      end
  end

  function request(path::String, body::String = "")
      response = HTTP.request( 
          body == "" ? "GET" : "POST", 
          "https://api.bytez.com/$path",
          status_exception = false,
          body = body,
          headers =  Dict(
              "Authorization" => "Key $API_KEY", 
              "Content-type" => "application/json"
          )
      )

      return JSON3.read(response.body)
  end
  #
  # model methods
  #
  const status = (body::String) -> request("model/status", body)
  const start = (body::String) -> request("model/load", body)
  const stop = (body::String) -> request("model/delete", body)

  function run(input::Any, body_with_model_id::Dict, params::Dict)
        body = merge(
            body_with_model_id,
            Dict("stream"=> false),
            Dict("params"=> params)
        )
        
        # Check if input is a dictionary
        if isa(input, Dict)
            body = merge(body, input)
        else
            body["input"] = input
        end
    
        return request("model/run", JSON3.write(body))
    end
    function load(body::String)
        json = nothing
        lastStatus = ""
        status = ""
        
        try
            json = request("model/start", body)
        catch
            json = request("model/status", body)
        finally
            status = json["status"]
        end
    
        while status != "FAILED" && status != "RUNNING"
            json = request("model/status", body)
            status = json["status"]
            
            if status != "RUNNING" 
                if status != lastStatus
                    lastStatus = status;
                    println(status);
                end
      
                sleep(5)    
            end
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
  function init(key::String)
      global API_KEY = key

      function create_new_model(model_id::String; concurrency::Int = 1, timeout::Int = 300)
          return Model(model_id, concurrency, timeout)
      end

      return Client(key,  List(), create_new_model)
  end

      
  export init
end