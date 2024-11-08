using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("ahmedabdo/video-classifier")

model.load()

input_video_url = "https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4"

result = model.run(input_video_url)

outputs = result["output"]

label_objects = outputs[1]

# Sort label objects by score in descending order
sorted_label_objects = sort(label_objects, by = x -> x["score"], rev = true)

for label_object in sorted_label_objects
	# Depending on the model, there may be additional props returned
	println(label_object)

	# Extract and print score and label
	score = get(label_object, "score", 0.0)
	label = get(label_object, "label", "N/A")

	println(Dict("score" => score, "label" => label))
end
