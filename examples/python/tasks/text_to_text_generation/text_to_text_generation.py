from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model_params = {"max_new_tokens": 20, "temperature": 2}

# Load and run the model
model = client.model("google/flan-t5-base")
model.load()

result = model.run(
    "Once upon a time there was a small little man who", model_params=model_params
)

output = result["output"]

generated_text = output[0]["generated_text"]

print(generated_text)
