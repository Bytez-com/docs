using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("google/flan-t5-base")

model.load()

input_text = "Once upon a time there was a small little man who"

model_params = Dict("max_new_tokens" => 20, "temperature" => 2)

result = model.run(input_text, model_params)

output = result["output"]

generated_text = output[1]["generated_text"]

println(generated_text)
