using Bytez
using Base64
using HTTP

function get_base64_audio(url::String)::String
	response = HTTP.get(url)
	return base64encode(response.body)
end

input_audio_base64 = get_base64_audio(
	"https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav",
)

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("facebook/data2vec-audio-base-960h")

model.load()

result = model.run(Dict("b64AudioBufferWav" => input_audio_base64))

output = result["output"]

# Depending on the model, there may be additional props returned
println(output)

text = output["text"]

println("Inference is: $text")

