from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("deepset/roberta-base-squad2")

model.load()

qa_input = {
    "question": "Where does Holly live?",
    "context": "My name is Holly and I live in NYC",
}

result = model.run(qa_input)

output = result.get("output")

# Depending on the model, there may be additional props returned
print(output)

answer = output.get("answer")
score = output.get("score")
start = output.get("start")
end = output.get("end")

print({"answer": answer, "score": score, "start": start, "end": end})
