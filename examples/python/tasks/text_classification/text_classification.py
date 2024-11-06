from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

input_text = "We are furious with the results of the experiment!"

# Load and run the model
model = client.model("AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon")
model.load()

result = model.run(input_text)

# Extract the output labels
label_objects = result["output"]

for label_object in label_objects:
    # depending on the model, there may be additional props returned
    print(label_object)

    # Extract and print label and score
    label = label_object.get("label")
    score = label_object.get("score")

    print({"label": label, "score": score})
