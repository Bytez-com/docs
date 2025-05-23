from bytez import Bytez
import base64
import os

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("suno/bark-small")

model.load()

input_text = "Hello, how are you today?"

result = model.run(input_text)

output_wav = result.get("output_wav")

# Decode the base64 string to bytes
audio_bytes = base64.b64decode(output_wav)

# Write the audio to the local file system
output_path = os.path.join(WORKING_DIR, "output.wav")
with open(output_path, "wb") as audio_file:
    audio_file.write(audio_bytes)

print(f"Audio successfully saved to {output_path}")
