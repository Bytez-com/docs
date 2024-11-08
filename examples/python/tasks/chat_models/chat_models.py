from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("microsoft/Phi-3-mini-4k-instruct")

model.load()

messages = [
    {"role": "system", "content": "You are a friendly chatbot"},
    {"role": "user", "content": "What is the capital of England?"},
]

result = model.run(messages, model_params={"max_length": 100})

output = result.get("output")

generated_text = output[0]["generated_text"]


for message in generated_text:
    # Depending on the model, there may be additional props returned
    print(message)

    content = message["content"]
    role = message["role"]

    print({"content": content, "role": role})
