using Bytez
using Base64
using Printf

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("dreamlike-art/dreamlike-photoreal-2.0")

model.load()

input_text = "A beautiful landscape with mountains and a river"

result = model.run(input_text)

output_png = result["output_png"]

# Decode the base64 string to bytes
image_bytes = base64decode(output_png)

# Write the image to the local file system
output_path = joinpath(WORKING_DIR, "output.png")
open(output_path, "w") do image_file
	write(image_file, image_bytes)
end

println("Image successfully saved to $output_path")
