import os
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0")

model.load()

input_data = {
    "image": "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
    "question": "What's the total cost?",
}

result = model.run(input_data)

output = result.get("output")

# depending on the model, there may be additional props returned
print(output)

output_object: dict = output[0]

answer = output_object.get("answer")
score = output_object.get("score")
start = output_object.get("start")
end = output_object.get("end")

print({"answer": answer, "score": score, "start": start, "end": end})
