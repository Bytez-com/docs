from bytez import Bytez
import base64
import os

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR BYTEZ KEY HERE")
model = client.model("dreamlike-art/dreamlike-photoreal-2.0")
model.load()

result = model.run("A beautiful landscape with mountains and a river")

output_png = result.get("output_png")

# Decode the base64 string to bytes
image_bytes = base64.b64decode(output_png)

# Write the image to the local file system
output_path = os.path.join(WORKING_DIR, "output.png")
with open(output_path, "wb") as image_file:
    image_file.write(image_bytes)

print(f"Image successfully saved to {output_path}")
