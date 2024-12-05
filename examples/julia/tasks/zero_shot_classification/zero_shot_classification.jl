using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("facebook/bart-large-mnli")

model.load()

input_data = Dict(
	"text" => "One day I will see the world",
	"candidate_labels" => ["travel", "cooking", "dancing"],
)

result = model.run(input_data)

output = result["output"]
sequence = output["sequence"]
labels = output["labels"]
scores = output["scores"]

# Create label objects with sequence, label, and score
label_objects = [Dict("sequence" => sequence, "label" => labels[i], "score" => scores[i]) for i in 1:length(labels)]

# Sort label objects by score in descending order
sorted_label_objects = sort(label_objects, by = x -> x["score"], rev = true)

for label_object in sorted_label_objects
	sequence = label_object["sequence"]
	label = label_object["label"]
	score = label_object["score"]

	println(Dict("sequence" => sequence, "label" => label, "score" => score))
end
