using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

input_image_url = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

model = client.model("Salesforce/blip-image-captioning-base")

model.load()

result = model.run(input_image_url)

#  depending on the model, there may be additional props returned
output = result["output"]

println(output)

generated_text = output[1]["generated_text"]

println(generated_text)
