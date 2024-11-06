import base64
import requests
from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")


def get_base64_image(url):
    response = requests.get(url)
    response.raise_for_status()
    image_bytes = response.content
    return base64.b64encode(image_bytes).decode("utf-8")


input_image_base64 = get_base64_image(
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
)

# Load and run the model
model = client.model("BilelDJ/clip-hugging-face-finetuned")
model.load()

input_data = {
    "b64ImageBufferPng": input_image_base64,
    "candidate_labels": ["squid", "octopus", "human", "cat"],
}

result = model.run(input_data)

# Extract the output label objects
label_objects = result["output"]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    # Print each label object (for debugging or review)
    print(label_object)

    # Extract and print score and label
    score = label_object["score"]
    label = label_object["label"]

    print({"score": score, "label": label})
