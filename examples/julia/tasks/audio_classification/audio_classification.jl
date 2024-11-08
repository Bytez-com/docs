using Bytez
using Base64
using HTTP


# Function to get the audio as base64-encoded string
function get_base64_audio(url::String)::String
	response = HTTP.get(url)
	return base64encode(response.body)
end

# Get the base64 encoded audio from the URL
input_audio_base64 = get_base64_audio(
	"https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav",
)

# Initialize the Bytez client with your API key
client = Bytez.init("YOUR BYTEZ KEY HERE")

# Load the model
model = client.model("aaraki/wav2vec2-base-finetuned-ks")

model.load()

# Run inference on the model
result = model.run(Dict("b64AudioBufferWav" => input_audio_base64))

# Process and print the results
label_objects = result["output"]

for label_object in label_objects
	score = label_object["score"]
	label = label_object["label"]
	println("Score: $score, Label: $label")
end
