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

model = client.model("aaraki/wav2vec2-base-finetuned-ks")

model.load()

result = model.run(Dict("b64AudioBufferWav" => input_audio_base64))

label_objects = result["output"]

for label_object in label_objects
	# Depending on the model, there may be additional props returned
	println(label_object)
	score = label_object["score"]
	label = label_object["label"]
	println("Score: $score, Label: $label")
end
