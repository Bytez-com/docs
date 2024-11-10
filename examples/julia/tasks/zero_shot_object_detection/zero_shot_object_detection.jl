using Bytez
using HTTP
using Base64

function get_base64_image(url::String)::String
	response = HTTP.get(url)
	image_bytes = response.body
	return base64encode(image_bytes)
end

input_image_base64 = get_base64_image(
	"https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9",
)

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("BilelDJ/clip-hugging-face-finetuned")

model.load()

input_data = Dict(
	"b64ImageBufferPng" => input_image_base64,
	"candidate_labels" => ["squid", "octopus", "human", "cat"],
)

result = model.run(input_data)

label_objects = result["output"]

# Sort label objects by score in descending order
sorted_label_objects = sort(label_objects, by = x -> x["score"], rev = true)

for label_object in sorted_label_objects
	# Depending on the model, there may be additional props returned
	println(label_object)

	# Extract and print score and label
	score = label_object["score"]
	label = label_object["label"]

	println(Dict("score" => score, "label" => label))
end
