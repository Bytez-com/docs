import os
import requests
from PIL import Image, ImageDraw, ImageFont
from bytez import Bytez
import io

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("facebook/detr-resnet-50")

model.load()

img_url = "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"

result = model.run(img_url)

box_objects = result.get("output")

print(box_objects)

for box_object in box_objects:
    # Depending on the model, there may be additional props returned
    print(box_object)

    score = box_object["score"]
    label = box_object["label"]
    box = box_object["box"]

    print({"score": score, "label": label, "box": box})

# Fetch image and convert to base64
response = requests.get(img_url)
image_bytes = response.content

# Convert to PNG
image = Image.open(io.BytesIO(image_bytes)).convert("RGBA")
image_buffer_png = io.BytesIO()
image.save(image_buffer_png, format="PNG")
image_buffer_png.seek(0)


# Visualization function
def debug_image(src_img_buffer, box_objects):
    src_img = Image.open(src_img_buffer).convert("RGBA")
    draw = ImageDraw.Draw(src_img)
    colors = [
        (255, 0, 0, 128),  # Red
        (0, 255, 0, 128),  # Green
        (0, 0, 255, 128),  # Blue
        (255, 255, 0, 128),  # Yellow
    ]

    font = ImageFont.load_default()

    for index, box_object in enumerate(box_objects):
        box = box_object["box"]
        score = box_object["score"]
        label = box_object["label"]
        color = colors[index % len(colors)]

        # Draw the bounding box
        draw.rectangle(
            [(box["xmin"], box["ymin"]), (box["xmax"], box["ymax"])],
            outline=color,
            width=2,
        )

        # Prepare the label and score text
        text = f"{label} ({score:.2f})"

        # Get text size using textbbox method
        text_width, text_height = draw.textbbox((0, 0), text, font=font)[2:]

        # Draw a background rectangle for the text
        draw.rectangle(
            [
                (box["xmin"], box["ymin"] - text_height - 2),
                (box["xmin"] + text_width, box["ymin"]),
            ],
            fill=color,
        )
        draw.text(
            (box["xmin"], box["ymin"] - text_height - 2),
            text,
            fill=(255, 255, 255, 255),
            font=font,
        )

    # Save the image with boxes
    output_path = f"{WORKING_DIR}/testImage.png"
    src_img.save(output_path)


debug_image(image_buffer_png, box_objects)
