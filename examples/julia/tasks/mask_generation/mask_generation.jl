using Bytez
using Base64
using HTTP
using JSON
using Images
using ColorTypes

WORKING_DIR = dirname(@__FILE__)

function get_base64_image(url::String)::String
	response = HTTP.get(url)
	image_bytes = response.body
	return base64encode(image_bytes)
end

input_image_base64 = get_base64_image(
	"https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png",
)

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("facebook/sam-vit-base")

model.load()

result = model.run(Dict("b64ImageBufferPng" => input_image_base64))

output = result["output"]

input_image_dimensions = output["input_image_dimensions"]
masks = output["masks"]
scores = output["scores"]

# masks and scores are far too large to print
println(
	Dict(
		"input_image_dimensions" => input_image_dimensions,
		# "masks" => masks,
		# "scores" => scores,
	),
)

# Save masks to a JSON file for later visualization
test_masks_path = joinpath(WORKING_DIR, "testMasks.json")
open(test_masks_path, "w") do file
	write(file, JSON.json(masks, 2))
end

# Load masks for visualization
test_masks = JSON.parsefile(test_masks_path)

function write_masks_to_image(input_image_base64, masks)
	# Decode the base64 image buffer
	src_img_bytes = base64decode(input_image_base64)
	src_img = load(IOBuffer(src_img_bytes))

	# Colors for masks
	colors = [
		RGBA(1.0, 0.0, 0.0, 0.2),  # Red
		RGBA(0.0, 1.0, 0.0, 0.2),  # Green
		RGBA(0.0, 0.0, 1.0, 0.2),  # Blue
		RGBA(1.0, 1.0, 0.0, 0.2),  # Yellow
	]

	# Apply masks to the image
	for (mask_index, mask) in enumerate(masks)
		color = colors[mod1(mask_index, length(colors))]
		for i in 1:length(mask), j in 1:length(mask[i])
			if mask[i][j] != 0
				src_img[i, j] = color
			end
		end
	end

	# Save the image with masks applied
	image_path = joinpath(WORKING_DIR, "testImage.png")
	save(image_path, src_img)
end

write_masks_to_image(input_image_base64, test_masks)
