from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

# Load and run the model
model = client.model("deepset/roberta-base-squad2")
model.load()

qa_input = {
    "question": "Where does Holly live?",
    "context": "My name is Holly and I live in NYC",
}

result = model.run(qa_input)
output = result.get("output")

# depending on the model, there may be additional props returned
print(output)

answer = output.get("answer")
score = output.get("score")
start = output.get("start")
end = output.get("end")

print({"answer": answer, "score": score, "start": start, "end": end})
