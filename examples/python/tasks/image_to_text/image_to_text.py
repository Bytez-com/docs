from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

inputImage = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

model = client.model("Salesforce/blip-image-captioning-base")
model.load()
result = model.run(inputImage)

# depending on the model, there may be additional props returned
output = result.get("output")

print(output)

generated_text = output[0]["generated_text"]

print(generated_text)
