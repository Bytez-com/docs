from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("google/vit-base-patch16-224")

model.load()

img_url = (
    "https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg"
)

result = model.run(img_url)

labelObjects = result.get("output")

for labelObject in labelObjects:
    # depending on the model, there may be additional props returned
    print(labelObject)

    label = labelObject["label"]
    score = labelObject["score"]

    print({"label": label, "score": score})
