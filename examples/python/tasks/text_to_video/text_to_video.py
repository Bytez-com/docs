from bytez import Bytez
import base64
import os

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("ali-vilab/text-to-video-ms-1.7b")
model.load()

result = model.run("A cat playing with a rose")

output_mp4 = result.get("output_mp4")

# Decode the base64 string to bytes
video_bytes = base64.b64decode(output_mp4)

# Write the video to the local file system
output_path = os.path.join(WORKING_DIR, "output.mp4")
with open(output_path, "wb") as video_file:
    video_file.write(video_bytes)

print(f"Video successfully saved to {output_path}")
