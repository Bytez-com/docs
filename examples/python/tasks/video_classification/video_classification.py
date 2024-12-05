from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("ahmedabdo/video-classifier")

model.load()

input_video_url = "https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4"

result = model.run(input_video_url)

outputs = result["output"]

label_objects = outputs[0]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    # Print each label object (for debugging or review)
    print(label_object)

    # Extract and print score and label
    score = label_object.get("score")
    label = label_object.get("label")

    print({"score": score, "label": label})
