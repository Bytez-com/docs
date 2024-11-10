using Bytez
using Base64
using Printf

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("ali-vilab/text-to-video-ms-1.7b")

model.load()

input_text = "A cat playing with a rose"

result = model.run(input_text)

output_mp4 = result["output_mp4"]

# Decode the base64 string to bytes
video_bytes = base64decode(output_mp4)

# Write the video to the local file system
output_path = joinpath(WORKING_DIR, "output.mp4")
open(output_path, "w") do video_file
	write(video_file, video_bytes)
end

println("Video successfully saved to $output_path")
