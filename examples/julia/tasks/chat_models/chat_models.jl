using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("microsoft/Phi-3-mini-4k-instruct")

model.load()

messages = [
	Dict("role" => "system", "content" => "You are a friendly chatbot"),
	Dict("role" => "user", "content" => "What is the capital of England?"),
]

result = model.run(messages, Dict("max_length" => 100))

output = result["output"]

generated_text = output[1]["generated_text"]

for message in generated_text
	# depending on the model, there may be additional props returned
	println(message)

	content = message["content"]
	role = message["role"]

	println(Dict("content" => content, "role" => role))
end
