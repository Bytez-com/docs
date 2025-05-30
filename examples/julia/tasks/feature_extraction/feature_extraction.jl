using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("Salesforce/SFR-Embedding-2_R")

model.load()

input_text = "Your text for feature extraction goes here..."

result = model.run(input_text)

output = result["output"]

# Depending on the model, there may be additional props returned
println(output)

embedding = output[1]

println(embedding)
