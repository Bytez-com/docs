from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("Salesforce/SFR-Embedding-2_R")

model.load()

input_text = "Your text for feature extraction goes here..."

result = model.run(input)

output = result.get("output")

# depending on the model, there may be additional props returned
print(output)

embedding = output[0]

print(embedding)
