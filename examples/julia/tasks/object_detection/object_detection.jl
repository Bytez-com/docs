using Bytez
using HTTP
using Images
using Colors
using FileIO
using Luxor

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("facebook/detr-resnet-50")

model.load()

img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"

result = model.run(img_url)

box_objects = result["output"]

# Print each box object with additional information
for box_object in box_objects
	# Depending on the model, there may be additional properties returned
	println(box_object)

	score = box_object["score"]
	label = box_object["label"]
	box = box_object["box"]

	println(Dict("score" => score, "label" => label, "box" => box))
end

# Fetch image from URL
response = HTTP.get(img_url)
image_bytes = response.body

# Load image and convert to RGB format
image = load(IOBuffer(image_bytes))
image_rgb = colorview(RGB, image)
width, height = size(image_rgb)

# Save the loaded image temporarily as PNG for Luxor compatibility
temp_image_path = joinpath(WORKING_DIR, "temp_image.png")
save(temp_image_path, image_rgb)

# Read the dimensions of the saved temporary image
temp_image = load(temp_image_path)
temp_height, temp_width = size(temp_image)

# Visualization function using Luxor
function debug_image(src_img_path, box_objects, output_path, img_width, img_height)
	colors = [
		RGB(1.0, 0.0, 0.0),  # Red
		RGB(0.0, 1.0, 0.0),  # Green
		RGB(0.0, 0.0, 1.0),  # Blue
		RGB(1.0, 1.0, 0.0),   # Yellow
	]

	# Start a drawing with exact dimensions of the source image
	Drawing(img_width, img_height, output_path)
	origin(Point(0, 0))  # Keep the origin at the top-left corner

	# Load the PNG image and place it on the drawing canvas
	src_img = readpng(src_img_path)
	placeimage(src_img, 0, 0, centered = false)

	# Draw bounding boxes and labels
	for (index, box_object) in enumerate(box_objects)
		box = box_object["box"]
		score = box_object["score"]
		label = box_object["label"]
		color = colors[mod1(index, length(colors))]

		# Set color for the bounding box
		sethue(color)

		# Draw bounding box
		xmin, ymin, xmax, ymax = box["xmin"], box["ymin"], box["xmax"], box["ymax"]
		box_width, box_height = xmax - xmin, ymax - ymin
		box_position = Point(xmin, ymin)
		@layer begin
			rect(box_position, box_width, box_height, :stroke)
		end

		# Draw label and score above bounding box
		sethue("white")
		fontsize(12)
		text_position = Point(xmin, ymin - 10)
		text("$label ($(round(score, digits=2)))", text_position, halign = :left)
	end

	# Finish and save the drawing
	finish()
end

# Define output path and call the function with exact dimensions
output_path = joinpath(WORKING_DIR, "test_image.png")
debug_image(temp_image_path, box_objects, output_path, temp_width, temp_height)
