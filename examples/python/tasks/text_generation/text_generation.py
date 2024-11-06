from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model_params = {"max_new_tokens": 500, "min_new_tokens": 50, "temperature": 0.5}

model = client.model("Qwen/Qwen2-7B-Instruct")
model.load()
stream = model.run(
    "Once upon a time there was a beautiful home where",
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
