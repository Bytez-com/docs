from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

input_text = "Hello, how are you? Beautiful day today, isn't it?"

# Load and run the model
model = client.model("Helsinki-NLP/opus-mt-en-zh")
model.load()

result = model.run(input_text)

# Extract the translation text
output = result["output"]
translation_text = output[0]["translation_text"]

print(translation_text)
