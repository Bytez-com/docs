using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("BilelDJ/clip-hugging-face-finetuned")

model.load()

input_data = Dict(
	"image" => "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg",
	"candidate_labels" => ["squid", "octopus", "human", "cat"],
)

result = model.run(input_data)

# Extract the output label objects
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
