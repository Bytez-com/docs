import requests
import base64
from bytez import Bytez


def get_base64_audio(url):
    response = requests.get(url)
    return base64.b64encode(response.content).decode("utf-8")


input_audio_base64 = get_base64_audio(
    "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav"
)

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("aaraki/wav2vec2-base-finetuned-ks")

model.load()

result = model.run({"b64AudioBufferWav": input_audio_base64})

label_objects = result["output"]

for label_object in label_objects:
    # depending on the model, there may be additional props returned
    print(label_object)

    score = label_object["score"]
    label = label_object["label"]

    print({"score": score, "label": label})
