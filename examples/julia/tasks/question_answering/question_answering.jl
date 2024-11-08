using Bytez

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("deepset/roberta-base-squad2")

model.load()

qa_input = Dict(
	"question" => "Where does Holly live?",
	"context" => "My name is Holly and I live in NYC",
)

result = model.run(qa_input)

output = result["output"]

#  depending on the model, there may be additional props returned
println(output)

answer = output["answer"]
score = output["score"]
start = output["start"]
_end = output["end"]

println(Dict("answer" => answer, "score" => score, "start" => start, "end" => _end))
