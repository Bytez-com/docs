using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("google/vit-base-patch16-224")

model.load()

input_image_url = "https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg"

result = model.run(input_image_url)

labelObjects = result["output"]

for labelObject in labelObjects
	#  depending on the model, there may be additional props returned
	println(labelObject)

	label = labelObject["label"]
	score = labelObject["score"]

	println(Dict("label" => label, "score" => score))
end
