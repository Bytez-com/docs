import requests
import base64
from bytez import Bytez


def get_base64_audio(url):
    response = requests.get(url)
    return base64.b64encode(response.content).decode("utf-8")


input_audio_base64 = get_base64_audio(
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav"
)

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("facebook/data2vec-audio-base-960h")

model.load()

result = model.run({"b64AudioBufferWav": input_audio_base64})

output = result["output"]

# Depending on the model, there may be additional props returned
print(output)

text = output["text"]

print("Inference is: ", text)
