using Bytez
using Base64
using Printf

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("sayeed99/segformer-b3-fashion")

model.load()

input_image_url = "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"

result = model.run(input_image_url)

mask_objects = result["output"]

for (index, mask_object) in enumerate(mask_objects)
	#  depending on the model, there may be additional props returned
	println(mask_object)

	label = mask_object["label"]
	score = mask_object["score"]
	mask_png = mask_object["mask_png"]

	println(Dict("label" => label, "score" => score))

	mask_png_buffer = base64decode(mask_png)

	open("$(WORKING_DIR)/mask-$index.png", "w") do file
		write(file, mask_png_buffer)
	end
end
