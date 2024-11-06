import os
import requests
import base64
import json
from PIL import Image
from io import BytesIO
import numpy as np
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))


def get_base64_image(url):
    response = requests.get(url)
    response.raise_for_status()  # Ensure the request was successful
    image_bytes = response.content
    return base64.b64encode(image_bytes).decode("utf-8")


input_image_base64 = get_base64_image(
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png"
)

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("facebook/sam-vit-base")

model.load()

result = model.run({"b64ImageBufferPng": input_image_base64})

output = result.get("output")

input_image_dimensions = output["input_image_dimensions"]
masks = output["masks"]
scores = output["scores"]

print(
    {
        "input_image_dimensions": input_image_dimensions,
        "masks": masks,
        "scores": scores,
    }
)

# to then visualize the masks:
test_masks_path = f"{WORKING_DIR}/testMasks.json"
with open(test_masks_path, "w") as file:
    file.write(json.dumps(masks, indent=2))


# Load masks for visualization
with open(test_masks_path, "r") as file:
    test_masks = json.loads(file.read())


def write_masks_to_image(input_image_base64, masks):
    # Decode the base64 image buffer
    src_img_bytes = base64.b64decode(input_image_base64)
    src_img = Image.open(BytesIO(src_img_bytes)).convert("RGBA")
    src_img_np = np.array(src_img)

    # Colors for masks
    colors = [
        (255, 0, 0, 50),  # Red
        (0, 255, 0, 50),  # Green
        (0, 0, 255, 50),  # Blue
        (255, 255, 0, 50),  # Yellow
    ]

    # Apply masks to the image
    for mask_index, mask in enumerate(masks):
        color = colors[mask_index % len(colors)]
        for i in range(len(mask)):
            for j in range(len(mask[i])):
                if mask[i][j]:
                    src_img_np[i, j] = color

    # Create an image from the modified array
    img_with_masks = Image.fromarray(src_img_np, "RGBA")
    image_path = f"{WORKING_DIR}/testImage.png"
    img_with_masks.save(image_path)


write_masks_to_image(input_image_base64, test_masks)
