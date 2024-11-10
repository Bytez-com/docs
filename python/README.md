# API Documentation

- [Basic Usage](#basic-usage)
- [Installation](#installation)
- [Authentication and Getting Your Key](#authentication-and-getting-your-key)
- [List Available Models](#list-available-models)
- [Initialize the Model Api](#initialize-the-model-api)
- [Load a Model](#load-a-model)
- [Check Model Status](#check-model-status)
- [Run a Model](#run-a-model)
- [Run a Model with HuggingFace Params](#run-a-model-with-huggingface-params)
- [Stream the Response](#stream-the-response)
- [Shutdown a Model](#shutdown-a-model)
- [List Your Running Instances](#list-your-running-instances)
- [Request a Huggingface model not yet on Bytez](#request-a-huggingface-model-not-yet-on-bytez)
- [Request a model not on Huggingface or Bytez](#request-a-model-not-on-huggingface-or-bytez)
- [Examples](#examples)
  - [Token Classification](#token-classification)
  - [Depth Estimation](#depth-estimation)
  - [Image Classification](#image-classification)
  - [Sentence Similarity](#sentence-similarity)
  - [Image to Text](#image-to-text)
  - [Image Feature Extraction](#image-feature-extraction)
  - [Mask Generation](#mask-generation)
  - [Summarization](#summarization)
  - [Text Classification](#text-classification)
  - [Feature Extraction](#feature-extraction)
  - [Translation](#translation)
  - [Question Answering](#question-answering)
  - [Text to Video](#text-to-video)
  - [Fill Mask](#fill-mask)
  - [Audio Classification](#audio-classification)
  - [Image Segmentation](#image-segmentation)
  - [Visual Question Answering](#visual-question-answering)
  - [Text to Speech](#text-to-speech)
  - [Video Classification](#video-classification)
  - [Object Detection](#object-detection)
  - [Text to Text Generation](#text-to-text-generation)
  - [Zero-Shot Image Classification](#zero-shot-image-classification)
  - [Zero-Shot Classification](#zero-shot-classification)
  - [Document Question Answering](#document-question-answering)
  - [Text Generation](#text-generation)
  - [Unconditional Image Generation](#unconditional-image-generation)
  - [Automatic Speech Recognition](#automatic-speech-recognition)
  - [Zero-Shot Object Detection](#zero-shot-object-detection)
  - [Text to Image](#text-to-image)
  - [Chat Models](#chat-models)
  - [Models with Function Calling](#models-with-function-calling)
- [Feedback](#feedback)

## Basic Usage

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 20, "max_new_tokens": 5, "temperature": 0.5}

result = model.run(input_text, model_params=model_params)

output = result["output"]

generated_text = output[0]["generated_text"]

print(generated_text)
```

Streaming usage (only text-generation models support streaming currently)

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 20, "max_new_tokens": 5, "temperature": 0.5}

stream = model.run(
    input_text,
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
```

## Installation

```bash
pip install bytez
```

## Authentication and Getting Your Key

To use this API, you need an API key. Obtain your key by visiting the [Bytez Settings Page](https://bytez.com/settings)

![Bytez Settings Page](https://github.com/user-attachments/assets/884b92b1-021a-4aa4-a150-312ae89f80d0)

To then use it in code:

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")
```

## List Available Models

Lists the currently available models and provides basic information about each one, such as the RAM required to run an instance.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

# To list all models
models = client.list_models()

println(models)

# To list models by task
models_by_task = client.list_models("object-detection")

println(models_by_task)
```

## Initialize the Model API

Initialize a model, so you can check its status, load, run, or shut it down.

```py
model = client.model("openai-community/gpt2")
```

## Load a Model

Convenience method for `model.start()`. Automatically waits for the instance to become ready.

Progress is printed as it executes.

```py
model.load()
```

The options argument is _optional_ and has two properties, concurrency, and timeout.

```py
model.load({
  "concurrency": 1,
  "timeout": 300,
})
```

```
/** concurrency
 * Number of serverless instances.
 *
 * For example, if you set to `3`, then you can do 3 parallel inferences.
 *
 * If you set to `1`, then you can do 1 inference at a time.
 *
 * Default: `1`
 */
/** timeout
 * Seconds to wait before serverless instance auto-shuts down.
 *
 * By default, if an instance doesn't receive a request after `300` seconds, then it shuts down.
 *
 * Receiving a request resets this timer.
 *
 * Default: `300`
 */
```

## Check Model Status

Check on the status of the model, to see if it's deploying, running, or stopped.

```py
status = model.status()

print(status)
```

## Run a Model

Run inference.

```py
output = model.run("Once upon a time there was a")

print(output)
```

## Run a Model with HuggingFace Params

Run inference with HuggingFace parameters.

```py
input_text = "Once upon a time there was a small little man who"

model_params = {"max_new_tokens": 20, "temperature": 2}

result = model.run(input_text, model_params=model_params)

print(result)
```

## Stream the Response

Note: This is only supported for `text-generation` models.

```py
input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 20, "max_new_tokens": 5, "temperature": 0.5}

stream = model.run(
    input_text,
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
```

## Shutdown a Model

By default, models will shut down based on their timeout (seconds) when loaded via `model.start()` or `model.load`.

To shut down and save costs early, run the following:

```py
model.stop()
```

## List Your Running Instances

```py
instances = client.list_instances()

print(instances)
```

## Request a Huggingface Model Not Yet on Bytez

To request a model that exists on Huggingface but not yet on Bytez, you can do the following:

```py
model_id = "openai-community/gpt2"

job_status = client.process(model_id)

print(job_status)
```

This sends a job to an automated queue. When the job completes, you'll receive an email indicating the model is ready for use with the models API.

## Request a Model Not on Huggingface or Bytez

Please reach out to us and we'll do what's necessary to make other models available!

Please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)

# Examples

Below are examples of using various models with the Bytez API in Python.

All examples are also located [here](https://github.com/Bytez-com/docs/tree/main/examples/python) under the `tasks` directory.

## Token Classification

Token classification involves identifying and categorizing tokens in a text. Common use cases include Named Entity Recognition (NER), Part-of-Speech tagging, and other NLP tasks.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("dslim/bert-base-NER")

model.load()

input_text = "John Doe is a software engineer at Google."

result = model.run(input_text)

word_objects = result["output"]

for word_object in word_objects:
    # Depending on the model, there may be additional props returned
    print(word_object)

    word = word_object.get("word")
    entity = word_object.get("entity")
    score = word_object.get("score")
    index = word_object.get("index")
    start = word_object.get("start")
    end = word_object.get("end")

    print(
        {
            "word": word,
            "entity": entity,
            "score": score,
            "index": index,
            "start": start,
            "end": end,
        }
    )
```

## Depth Estimation

Depth estimation involves predicting the distance of objects from the camera. Use cases include robotics, augmented reality, and autonomous vehicles.

```py
import os
import requests
import base64
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

# Replace with your actual Bytez API key
client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("vinvino02/glpn-nyu")

model.load()

input_image_url = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

# Run the model with the input image
result = model.run(input_image_url)

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
response = requests.get(input_image_url)

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
```

## Image Classification

Image classification involves categorizing images into predefined classes. Use cases include object recognition, medical imaging, and security systems.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("google/vit-base-patch16-224")

model.load()

input_image_url = (
    "https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg"
)

result = model.run(input_image_url)

labelObjects = result.get("output")

for labelObject in labelObjects:
    # Depending on the model, there may be additional props returned
    print(labelObject)

    label = labelObject["label"]
    score = labelObject["score"]

    print({"label": label, "score": score})
```

## Sentence Similarity

Sentence similarity involves measuring how similar two sentences are. Use cases include duplicate question detection, paraphrase detection, and text clustering.

```py
from bytez import Bytez
import numpy as np

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("sentence-transformers/all-MiniLM-L6-v2")

model.load()

sentences = [
    "What is the weather like today?",
    "Is it sunny today?",
    "The e39 BMW M5 was one of the best production sport sedans ever produced.",
]

results = []

# Get embeddings for each sentence
for sentence in sentences:
    result = model.run(sentence)
    embedding = result.get("output")

    print({"embedding": embedding})

    results.append({"embedding": embedding, "sentence": sentence})

# Extract the original sentence's embedding and the embeddings to compare
original_sentence_with_embedding = results[0]
sentences_to_compare = results[1:]


def cosine_similarity(embedding1, embedding2):
    embedding1 = np.array(embedding1)
    embedding2 = np.array(embedding2)

    dot_product = np.dot(embedding1, embedding2)
    magnitude1 = np.linalg.norm(embedding1)
    magnitude2 = np.linalg.norm(embedding2)

    similarity = dot_product / (magnitude1 * magnitude2)

    return similarity


# Calculate and display cosine similarity for each comparison
for sentence_object in sentences_to_compare:
    similarity = cosine_similarity(
        original_sentence_with_embedding["embedding"], sentence_object["embedding"]
    )
    print(
        f'Cosine similarity between "{original_sentence_with_embedding["sentence"]}" and "{sentence_object["sentence"]}": {similarity}'
    )
```

## Image to Text

Image to text involves generating textual descriptions of images. Use cases include image captioning, content generation, and accessibility features.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

input_image_url = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

model = client.model("Salesforce/blip-image-captioning-base")

model.load()

result = model.run(input_image_url)

# Depending on the model, there may be additional props returned
output = result.get("output")

print(output)

generated_text = output[0]["generated_text"]

print(generated_text)
```

## Image Feature Extraction

Image feature extraction involves extracting features from images for tasks like object detection, image classification, and image retrieval.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("nomic-ai/nomic-embed-vision-v1")

model.load()

input_image_url = "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg"

result = model.run(input_image_url)

output = result.get("output")

# Depending on the model, there may be additional props returned
print(output)

embedding = output[0]

print(embedding)
```

## Mask Generation

Mask generation involves generating masks for objects in images. Use cases include image segmentation, medical imaging, and computer vision tasks.

```py
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

client = Bytez("YOUR_BYTEZ_KEY_HERE")

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
```

## Summarization

Summarization involves creating concise summaries of longer texts. Use cases include news summarization, document summarization, and generating abstracts.

```py
from bytez import Bytez


client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("ainize/bart-base-cnn")

model.load()

input_text = """
The Big Bang is a physical theory that describes how the universe expanded from an initial state of high density and temperature.[1] The notion of an expanding universe was first scientifically originated by physicist Alexander Friedmann in 1922 with the mathematical derivation of the Friedmann equations.[2][3][4][5]

Independent of Friedmann's work, the Big Bang was first proposed in 1931 by Roman Catholic priest and physicist Georges Lemaître when he suggested the universe emerged from a "primeval atom". Various cosmological models of the Big Bang explain the evolution of the observable universe from the earliest known periods through its subsequent large-scale form.[6][7][8] These models offer a comprehensive explanation for a broad range of observed phenomena, including the abundance of light elements, the cosmic microwave background (CMB) radiation, and large-scale structure. The uniformity of the universe, known as the flatness problem, is explained through cosmic inflation: a sudden and very rapid expansion of space during the earliest moments.

Crucially, these models are compatible with the Hubble–Lemaître law—the observation that the farther away a galaxy is, the faster it is moving away from Earth. Extrapolating this cosmic expansion backward in time using the known laws of physics, the models describe an increasingly concentrated cosmos preceded by a singularity in which space and time lose meaning (typically named "the Big Bang singularity").[9] Physics lacks a widely accepted theory of quantum gravity that can model the earliest conditions of the Big Bang. In 1964 the CMB was discovered, which convinced many cosmologists that the competing steady-state model of cosmic evolution was falsified, since the Big Bang models predict a uniform background radiation caused by high temperatures and densities in the distant past.[10] A wide range of empirical evidence strongly favors the Big Bang event, which is now essentially universally accepted.[11] Detailed measurements of the expansion rate of the universe place the Big Bang singularity at an estimated 13.787±0.020 billion years ago, which is considered the age of the universe.[12]

There remain aspects of the observed universe that are not yet adequately explained by the Big Bang models. After its initial expansion, the universe cooled sufficiently to allow the formation of subatomic particles, and later atoms. The unequal abundances of matter and antimatter that allowed this to occur is an unexplained effect known as baryon asymmetry. These primordial elements—mostly hydrogen, with some helium and lithium—later coalesced through gravity, forming early stars and galaxies. Astronomers observe the gravitational effects of an unknown dark matter surrounding galaxies. Most of the gravitational potential in the universe seems to be in this form, and the Big Bang models and various observations indicate that this excess gravitational potential is not created by baryonic matter, such as normal atoms. Measurements of the redshifts of supernovae indicate that the expansion of the universe is accelerating, an observation attributed to an unexplained phenomenon known as dark energy.[13]
"""

result = model.run(input_text, model_params={"max_length": 40})

# Extract the summary text
output = result["output"]

summary_text = output[0]["summary_text"]

print(summary_text)
```

## Text Classification

Text classification involves categorizing text into predefined classes. Use cases include sentiment analysis, spam detection, and topic classification.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon")

model.load()

input_text = "We are furious with the results of the experiment!"

result = model.run(input_text)

# Extract the output labels
label_objects = result["output"]

for label_object in label_objects:
    # Depending on the model, there may be additional props returned
    print(label_object)

    # Extract and print label and score
    label = label_object.get("label")
    score = label_object.get("score")

    print({"label": label, "score": score})
```

## Feature Extraction

Feature extraction involves extracting features from data for further processing. Use cases include data preprocessing, embedding generation, and similarity search.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Salesforce/SFR-Embedding-2_R")

model.load()

input_text = "Your text for feature extraction goes here..."

result = model.run(input)

output = result.get("output")

# Depending on the model, there may be additional props returned
print(output)

embedding = output[0]

print(embedding)
```

## Translation

Translation involves translating text from one language to another. Use cases include multilingual communication, content localization, and language learning.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Helsinki-NLP/opus-mt-en-zh")

model.load()

input_text = "Hello, how are you? Beautiful day today, isn't it?"

result = model.run(input_text)

# Extract the translation text
output = result["output"]

translation_text = output[0]["translation_text"]

print(translation_text)
```

## Question Answering

Question answering involves answering questions based on a given context. Use cases include customer support, information retrieval, and educational tools.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("deepset/roberta-base-squad2")

model.load()

qa_input = {
    "question": "Where does Holly live?",
    "context": "My name is Holly and I live in NYC",
}

result = model.run(qa_input)

output = result.get("output")

# Depending on the model, there may be additional props returned
print(output)

answer = output.get("answer")
score = output.get("score")
start = output.get("start")
end = output.get("end")

print({"answer": answer, "score": score, "start": start, "end": end})
```

## Text to Video

Text to video involves generating videos from textual descriptions. Use cases include content creation, entertainment, and education.

```py
import os
import base64
from bytez import Bytez


WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("ali-vilab/text-to-video-ms-1.7b")

model.load()

input_text = "A cat playing with a rose"

result = model.run(input_text)

output_mp4 = result.get("output_mp4")

# Decode the base64 string to bytes
video_bytes = base64.b64decode(output_mp4)

# Write the video to the local file system
output_path = os.path.join(WORKING_DIR, "output.mp4")
with open(output_path, "wb") as video_file:
    video_file.write(video_bytes)

print(f"Video successfully saved to {output_path}")
```

## Fill Mask

Fill mask involves predicting missing words in a sentence. Use cases include text completion, language modeling, and text generation.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("almanach/camembert-base")

model.load()

input_text = "The capital of France is <mask>."

result = model.run(input_text)

sequence_objects = result.get("output")


for sequence_object in sequence_objects:
    # Depending on the model, there may be additional props returned
    print(sequence_object)

    sequence = sequence_object["sequence"]
    score = sequence_object["score"]
    token = sequence_object["token"]
    token_str = sequence_object["token_str"]

    print(
        {"sequence": sequence, "score": score, "token": token, "token_str": token_str}
    )
```

## Audio Classification

Audio classification involves categorizing audio clips into predefined classes. Use cases include speech emotion recognition, sound detection, and music genre classification.

```py
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

model = client.model("aaraki/wav2vec2-base-finetuned-ks")

model.load()

result = model.run({"b64AudioBufferWav": input_audio_base64})

label_objects = result["output"]

for label_object in label_objects:
    # Depending on the model, there may be additional props returned
    print(label_object)

    score = label_object["score"]
    label = label_object["label"]

    print({"score": score, "label": label})
```

## Image Segmentation

Image segmentation involves dividing an image into multiple segments. Use cases include medical imaging, object detection, and computer vision tasks.

```py
import os
import base64
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("sayeed99/segformer-b3-fashion")

model.load()

input_image_url = "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"

result = model.run(input_image_url)

mask_objects = result.get("output")

for index, mask_object in enumerate(mask_objects):
    # Depending on the model, there may be additional props returned
    print(mask_object)

    label = mask_object.get("label")
    score = mask_object.get("score")
    mask_png: str = mask_object.get("mask_png")

    print({"label": label, "score": score})

    mask_png_buffer = base64.decodebytes(mask_png.encode("utf-8"))

    with open(f"{WORKING_DIR}/mask-{index}.png", "wb") as file:
        file.write(mask_png_buffer)
```

## Visual Question Answering

Visual question answering involves answering questions based on an image. Use cases include interactive learning, accessibility features, and content analysis.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Salesforce/blip-vqa-base")

model.load()

input_data = {
    "image": "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9",
    "question": "What kind of animal is this?",
}

result = model.run(input_data)

outputs = result["output"]

answer = outputs[0]["answer"]

print(answer)
```

## Text to Speech

Text to speech involves converting text into spoken words. Use cases include virtual assistants, accessibility features, and content creation.

```py
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
```

## Video Classification

Video classification involves categorizing videos into predefined classes. Use cases include video content analysis, security surveillance, and media organization.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("ahmedabdo/video-classifier")

model.load()

input_video_url = "https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4"

result = model.run(input_video_url)

outputs = result["output"]

label_objects = outputs[0]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    # Print each label object (for debugging or review)
    print(label_object)

    # Extract and print score and label
    score = label_object.get("score")
    label = label_object.get("label")

    print({"score": score, "label": label})
```

## Object Detection

Object detection involves identifying and locating objects in an image or video. Use cases include security systems, autonomous driving, and retail analytics.

```py
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
```

## Text to Text Generation

Text to text generation involves generating text from input text. Use cases include text completion, content generation, and dialogue systems.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("google/flan-t5-base")

model.load()

input_text = "Once upon a time there was a small little man who"

model_params = {"max_new_tokens": 20, "temperature": 2}

result = model.run(input_text, model_params=model_params)

output = result["output"]

generated_text = output[0]["generated_text"]

print(generated_text)
```

## Zero-Shot Image Classification

Zero-shot image classification involves classifying images into classes not seen during training. Use cases include novel object recognition, transfer learning, and few-shot learning.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("BilelDJ/clip-hugging-face-finetuned")

model.load()

input_data = {
    "image": "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg",
    "candidate_labels": ["squid", "octopus", "human", "cat"],
}

result = model.run(input_data)

# Extract the output label objects
label_objects = result["output"]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    # Depending on the model, there may be additional props returned
    print(label_object)

    # Extract and print score and label
    score = label_object["score"]
    label = label_object["label"]

    print({"score": score, "label": label})
```

## Zero-Shot Classification

Zero-shot classification involves classifying text into classes not seen during training. Use cases include intent detection, content moderation, and dynamic classification.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("facebook/bart-large-mnli")

model.load()

input_data = {
    "text": "One day I will see the world",
    "candidate_labels": ["travel", "cooking", "dancing"],
}

result = model.run(input_data)

output = result["output"]
sequence = output["sequence"]
labels = output["labels"]
scores = output["scores"]

# Create label objects with sequence, label, and score
label_objects = [
    {"sequence": sequence, "label": v, "score": scores[i]} for i, v in enumerate(labels)
]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    sequence = label_object["sequence"]
    label = label_object["label"]
    score = label_object["score"]

    print({"sequence": sequence, "label": label, "score": score})
```

## Document Question Answering

Document question answering involves answering questions based on the content of documents. Use cases include document understanding, contract analysis, and information retrieval.

```py
import os
from bytez import Bytez

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0")

model.load()

input_data = {
    "image": "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
    "question": "What's the total cost?",
}

result = model.run(input_data)

output = result.get("output")

# Depending on the model, there may be additional props returned
print(output)

output_object: dict = output[0]

answer = output_object.get("answer")
score = output_object.get("score")
start = output_object.get("start")
end = output_object.get("end")

print({"answer": answer, "score": score, "start": start, "end": end})
```

## Text Generation

Text generation involves generating coherent text from an initial prompt. Use cases include story generation, dialogue systems, and creative writing.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 20, "max_new_tokens": 5, "temperature": 0.5}

stream = model.run(
    input_text,
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
```

## Unconditional Image Generation

Unconditional image generation involves generating images without any specific conditions or inputs. Use cases include art generation, creative design, and data augmentation.

```py
import os
import base64
from bytez import Bytez


WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("afshr/cam_finetune")

model.load()

input_text = "A rose"

result = model.run(input_text)

output_png = result.get("output_png")

# Decode the base64 string to bytes
image_bytes = base64.b64decode(output_png)

# Write the image to the local file system
output_path = f"{WORKING_DIR}/output.png"
with open(output_path, "wb") as image_file:
    image_file.write(image_bytes)

print(f"Image successfully saved to {output_path}")
```

## Automatic Speech Recognition

Automatic speech recognition involves converting spoken language into written text. Use cases include transcription services, voice assistants, and accessibility features.

```py
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
```

## Zero-Shot Object Detection

Zero-shot object detection involves detecting objects in images without prior training on those specific objects. Use cases include novel object detection, transfer learning, and few-shot learning.

```py
import requests
import base64
from bytez import Bytez


def get_base64_image(url):
    response = requests.get(url)
    response.raise_for_status()
    image_bytes = response.content
    return base64.b64encode(image_bytes).decode("utf-8")


input_image_base64 = get_base64_image(
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
)

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("BilelDJ/clip-hugging-face-finetuned")

model.load()

input_data = {
    "b64ImageBufferPng": input_image_base64,
    "candidate_labels": ["squid", "octopus", "human", "cat"],
}

result = model.run(input_data)

label_objects = result["output"]

# Sort label objects by score in descending order
label_objects.sort(key=lambda x: x["score"], reverse=True)

for label_object in label_objects:
    # Print each label object (for debugging or review)
    print(label_object)

    # Extract and print score and label
    score = label_object["score"]
    label = label_object["label"]

    print({"score": score, "label": label})
```

## Text to Image

Text to image involves generating images from textual descriptions. Use cases include content creation, advertising, and creative design.

```py
from bytez import Bytez
import base64
import os

WORKING_DIR = os.path.dirname(os.path.realpath(__file__))

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("dreamlike-art/dreamlike-photoreal-2.0")

model.load()

input_text = "A beautiful landscape with mountains and a river"

result = model.run(input_text)

output_png = result.get("output_png")

# Decode the base64 string to bytes
image_bytes = base64.b64decode(output_png)

# Write the image to the local file system
output_path = os.path.join(WORKING_DIR, "output.png")
with open(output_path, "wb") as image_file:
    image_file.write(image_bytes)

print(f"Image successfully saved to {output_path}")
```

## Chat Models

Chat models are used to create interactive conversational agents. These models can engage in dialogue with users, respond to questions, and provide information or entertainment.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("microsoft/Phi-3-mini-4k-instruct")

model.load()

messages = [
    {"role": "system", "content": "You are a friendly chatbot"},
    {"role": "user", "content": "What is the capital of England?"},
]

result = model.run(messages, model_params={"max_length": 100})

output = result.get("output")

generated_text = output[0]["generated_text"]


for message in generated_text:
    # Depending on the model, there may be additional props returned
    print(message)

    content = message["content"]
    role = message["role"]

    print({"content": content, "role": role})
```

## Models with Function Calling

Some models support function calling, allowing them to interact with user-defined functions.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Nexusflow/NexusRaven-V2-13B")

model.load()

input_text = "What's the weather like in Seattle right now?"

model_params = {
    "max_new_tokens": 20,
    "max_new_tokens": 5,
    "temperature": 0.001,
    "do_sample": False,
}

prompt_template = '''
Function:
def get_weather_data(coordinates):
    """
    Fetches weather data from the Open-Meteo API for the given latitude and longitude.

    Args:
    coordinates (tuple): The latitude and longitude of the location.

    Returns:
    float: The current temperature in the coordinates you've asked for
    """

Function:
def get_coordinates_from_city(city_name):
    """
    Fetches the latitude and longitude of a given city name using the Maps.co Geocoding API.

    Args:
    city_name (str): The name of the city.

    Returns:
    tuple: The latitude and longitude of the city.
    """

User Query: {query}<human_end>
'''

# Prepare the prompt with the user query
prompt = prompt_template.format(query=input_text)

stream = model.run(prompt, model_params=model_params, stream=True)
for chunk in stream:
    print(f"Output: {chunk}")
```

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
