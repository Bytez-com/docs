using Bytez
using Base64
using HTTP
using Printf

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("vinvino02/glpn-nyu")

model.load()

input_image_url = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

# Run the model with the input image
result = model.run(input_image_url)

output = result["output"]

#  depending on the model, there may be additional props returned
depth_png = output["depth_png"]
formatted_predicted_depth_array = output["formatted_predicted_depth_array"]

##### Decode and save the image #####
img_buffer = base64decode(depth_png)

image_path = joinpath(WORKING_DIR, "testImage.png")
open(image_path, "w") do f
	write(f, img_buffer)
end

# Write the original image for comparison
original_image_path = joinpath(WORKING_DIR, "originalImage.jpg")
response = HTTP.get(input_image_url)

open(original_image_path, "w") do f
	write(f, response.body)
end

println("Wrote the original image to: ", original_image_path)
println("Wrote the inference image to: ", image_path)

##### 2D depth map, object representation of the pixel values for the depth map #####
rows = formatted_predicted_depth_array
for (j, row) in enumerate(rows)
	for (i, pixel) in enumerate(row)
		# insert code here if you need these values directly
	end
end
