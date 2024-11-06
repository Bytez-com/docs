from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")


model = client.model("facebook/bart-large-mnli")
model.load()

input_data = {
    "text": "One day I will see the world",
    "candidate_labels": ["travel", "cooking", "dancing"],
}

result = model.run(input_data)

output = result["output"]
sequence = output["sequence"]
labels = output["labels"]
scores = output["scores"]

# Create label objects with sequence, label, and score
label_objects = [
    {"sequence": sequence, "label": v, "score": scores[i]} for i, v in enumerate(labels)
]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    sequence = label_object["sequence"]
    label = label_object["label"]
    score = label_object["score"]

    print({"sequence": sequence, "label": label, "score": score})
