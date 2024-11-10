using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

options = Dict(
	"params" => Dict(
		"max_new_tokens" => 500,
		"min_new_tokens" => 50,
		"temperature" => 0.5,
	),
	"stream" => true,
)

stream = model.run(input_text, options)

while isopen(stream)
	item = take!(stream)
	println(item)
end
