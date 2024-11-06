from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("BilelDJ/clip-hugging-face-finetuned")

model.load()

input_data = {
    "image": "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg",
    "candidate_labels": ["squid", "octopus", "human", "cat"],
}

result = model.run(input_data)

# Extract the output label objects
label_objects = result["output"]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    # depending on the model, there may be additional props returned
    print(label_object)

    # Extract and print score and label
    score = label_object["score"]
    label = label_object["label"]

    print({"score": score, "label": label})
