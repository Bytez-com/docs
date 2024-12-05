using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon")

model.load()

input_text = "We are furious with the results of the experiment!"

result = model.run(input_text)

label_objects = result["output"]

for label_object in label_objects
	# Depending on the model, there may be additional props returned
	println(label_object)

	# Extract and print label and score
	label = get(label_object, "label", "N/A")
	score = get(label_object, "score", 0.0)

	println(Dict("label" => label, "score" => score))
end
