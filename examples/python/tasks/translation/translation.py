from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("Helsinki-NLP/opus-mt-en-zh")

model.load()

input_text = "Hello, how are you? Beautiful day today, isn't it?"

result = model.run(input_text)

# Extract the translation text
output = result["output"]

translation_text = output[0]["translation_text"]

print(translation_text)
