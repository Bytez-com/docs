using Bytez
using Printf

WORKING_DIR = dirname(@__FILE__)

client = Bytez.init("YOUR BYTEZ KEY HERE")

model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0")

model.load()

input_data = Dict(
	"image" => "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
	"question" => "What's the total cost?",
)

result = model.run(input_data)

output = result["output"]

#  depending on the model, there may be additional props returned
println(output)

output_object = output[1]

answer = output_object["answer"]
score = output_object["score"]
start = output_object["start"]
# end is a reserved keyword in julia
_end = output_object["end"]

println(Dict("answer" => answer, "score" => score, "start" => start, "end" => _end))
