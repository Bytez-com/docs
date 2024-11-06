import os
import base64
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("sayeed99/segformer-b3-fashion")

model.load()

input_image_url = "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"

result = model.run(input_image_url)

mask_objects = result.get("output")

for index, mask_object in enumerate(mask_objects):
    # depending on the model, there may be additional props returned
    print(mask_object)

    label = mask_object.get("label")
    score = mask_object.get("score")
    mask_png: str = mask_object.get("mask_png")

    print({"label": label, "score": score})

    mask_png_buffer = base64.decodebytes(mask_png.encode("utf-8"))

    with open(f"{WORKING_DIR}/mask-{index}.png", "wb") as file:
        file.write(mask_png_buffer)
