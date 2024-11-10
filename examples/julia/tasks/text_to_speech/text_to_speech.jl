using Bytez
using Base64
using Printf

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("suno/bark-small")

model.load()

input_text = "Hello, how are you today?"

result = model.run(input_text)

output_wav = result["output_wav"]

# Decode the base64 string to bytes
audio_bytes = base64decode(output_wav)

# Write the audio to the local file system
output_path = joinpath(WORKING_DIR, "output.wav")
open(output_path, "w") do audio_file
	write(audio_file, audio_bytes)
end

println("Audio successfully saved to $output_path")
