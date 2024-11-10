using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE")

model = client.model("deepset/roberta-base-squad2")

model.load()

qa_input = Dict(
	"question" => "Where does Holly live?",
	"context" => "My name is Holly and I live in NYC",
)

result = model.run(qa_input)

output = result["output"]

# Depending on the model, there may be additional props returned
println(output)

answer = output["answer"]
score = output["score"]
start = output["start"]
# End is a reserved keyword in julia
_end = output["end"]

println(Dict("answer" => answer, "score" => score, "start" => start, "end" => _end))
