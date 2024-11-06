import os
import base64
import requests
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

# Replace with your actual Bytez API key
client = Bytez("YOUR BYTEZ KEY HERE")

input_image = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

# Load the model
model = client.model("vinvino02/glpn-nyu")
model.load()

# Run the model with the input image
result = model.run(input_image)

output = result.get("output")

depth_png = output["depth_png"]
formatted_predicted_depth_array = output["formatted_predicted_depth_array"]

##### Decode and view the image #####
img_buffer = base64.b64decode(depth_png)


image_path = f"{WORKING_DIR}/testImage.png"
with open(image_path, "wb") as f:
    f.write(img_buffer)

# write the original image for comparison, you could also just ctrl+click the url
original_image_path = f"{WORKING_DIR}/originalImage.jpg"
response = requests.get(input_image)

with open(original_image_path, "wb") as f:
    f.write(response.content)

print("Wrote the original image to:", original_image_path)
print("Wrote the inference image to:", image_path)

##### 2d depth map, object representation of the pixel values for the depth map #####
rows = formatted_predicted_depth_array
for j, row in enumerate(rows):
    for i, pixel in enumerate(row):
        # insert code here if you need these values directly
        pass
