from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 500, "min_new_tokens": 50, "temperature": 0.5}

stream = model.run(
    input_text,
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
