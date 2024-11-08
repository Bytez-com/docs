using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("dslim/bert-base-NER")

model.load()

input_text = "John Doe is a software engineer at Google."

result = model.run(input_text)

word_objects = result["output"]

for word_object in word_objects
	#  depending on the model, there may be additional props returned
	println(word_object)

	word = get(word_object, "word", "N/A")
	entity = get(word_object, "entity", "N/A")
	score = get(word_object, "score", 0.0)
	index = get(word_object, "index", 0)
	start = get(word_object, "start", 0)
	_end = get(word_object, "end", 0)

	println(
		Dict(
			"word" => word,
			"entity" => entity,
			"score" => score,
			"index" => index,
			"start" => start,
			"end" => _end,
		),
	)
end
