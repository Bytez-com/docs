from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("nomic-ai/nomic-embed-vision-v1")

model.load()

input_image_url = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

result = model.run(input_image_url)

output = result.get("output")

# Depending on the model, there may be additional props returned
print(output)

embedding = output[0]

print(embedding)
