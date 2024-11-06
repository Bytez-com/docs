import base64
import requests
from bytez import Bytez


def get_base64_audio(url):
    response = requests.get(url)
    return base64.b64encode(response.content).decode("utf-8")


input_audio_base64 = get_base64_audio(
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav"
)

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("facebook/data2vec-audio-base-960h")

model.load()

result = model.run({"b64AudioBufferWav": input_audio_base64})

output = result["output"]

# depending on the model, there may be additional props returned
print(output)

text = output["text"]

print("Inference is: ", text)
