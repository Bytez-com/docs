# API Documentation

- [Installation](#installation)
- [Authentication and Getting Your Key](#authentication-and-getting-your-key)
- [List Available Models](#list-available-models)
- [Initialize the Model API](#initialize-the-model-api)
- [Load a Model](#load-a-model)
- [Check Model Status](#check-model-status)
- [Run a Model](#run-a-model)
- [Run a Model with HuggingFace Params](#run-a-model-with-huggingface-params)
- [Stream the Response](#stream-the-response)
- [Shutdown a Model](#shutdown-a-model)
- [List Your Running Instances](#list-your-running-instances)
- [Request a Huggingface Model Not Yet on Bytez](#request-a-huggingface-model-not-yet-on-bytez)
- [Request a Model Not on Huggingface or Bytez](#request-a-model-not-on-huggingface-or-bytez)
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

## Installation

```bash
npm install bytez.js
```

## Authentication and Getting Your Key

To use this API, you need an API key. Obtain your key by visiting the settings page -> [Bytez Settings Page](https://bytez.com/settings).

![Bytez Settings Page](https://github.com/user-attachments/assets/884b92b1-021a-4aa4-a150-312ae89f80d0)

To then use it in code:

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");
```

## List Available Models

Lists the currently available models and provides basic information about each one, such as the RAM required to run an instance.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const models = await client.list.models();

console.log(models);
```

## Initialize the Model API

Initialize a model, so you can check its status, load, run, or shut it down.

```js
const model = client.model("openai-community/gpt2");
```

## Load a Model

Convenience method for `model.start()`. Automatically waits for the instance to become ready before resolving.

Progress is printed as it executes.

```js
await model.load();
```

The options argument is *optional* and has two properties, concurrency, and timeout.

```js
await model.load({
  concurrency: 1,
  timeout: 300,
});
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

```js
const status = await model.status();

console.log(status);
```

## Run a Model

Run inference.

```js
const output = await model.run("Once upon a time there was a");

console.log(output);
```

## Run a Model with HuggingFace Params

Run inference with HuggingFace parameters.

```js
const output = await model.run("Once upon a time there was a", {
  max_new_tokens: 1,
  min_new_tokens: 1,
});

console.log(output);
```

## Stream the Response

Note: This is only supported for text-generation models.

```js
const stream = await model.run("Jack and Jill", { stream: true });
const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}
```

## Shutdown a Model

By default, models will shut down based on their timeout (seconds) when loaded via `model.start()` or `model.load`.

To shut down and save costs early, run the following:

```js
await model.stop();
```

## List Your Running Instances

```js
const instances = await client.list.instances();

console.log(instances);
```

## Request a Huggingface Model Not Yet on Bytez

To request a model that exists on Huggingface but not yet on Bytez, you can do the following:

```js
const model_id = "openai-community/gpt2";

const job_status = await client.process(model_id);

console.log(job_status);
```

This sends a job to an automated queue. When the job completes, you'll receive an email indicating the model is ready for use with the models API.

## Request a Model Not on Huggingface or Bytez

Please reach out to us and we'll do what's necessary to make other models available!

Please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)

# Examples

Below are examples of using various models with the Bytez API in JavaScript.

## Token Classification

Token classification involves identifying and categorizing tokens in a text. Common use cases include Named Entity Recognition (NER), Part-of-Speech tagging, and other NLP tasks.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("dslim/bert-base-NER");

await model.load();

const output = await model.run("John Doe is a software engineer at Google.");

console.log(output);
```

## Depth Estimation

Depth estimation involves predicting the distance of objects from the camera. Use cases include robotics, augmented reality, and autonomous vehicles.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputImage = "https://example.com/image.jpg";

const model = client.model("vinvino02/glpn-nyu");

await model.load();

const output = await model.run(inputImage);

console.log(output);
```

## Image Classification

Image classification involves categorizing images into predefined classes. Use cases include object recognition, medical imaging, and security systems.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const imgUrl = "https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg";

const model = client.model("google/vit-base-patch16-224");

await model.load();

const output = await model.run(imgUrl);

console.log(output);
```

## Sentence Similarity

Sentence similarity involves measuring how similar two sentences are. Use cases include duplicate question detection, paraphrase detection, and text clustering.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("sentence-transformers/all-MiniLM-L6-v2");

await model.load();

const output = await model.run("What is the weather like today?");

console.log(output);
```

## Image to Text

Image to text involves generating textual descriptions of images. Use cases include image captioning, content generation, and accessibility features.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputImage = "https://example.com/image.jpg";

const model = client.model("Salesforce/blip-image-captioning-base");

await model.load();

const output = await model.run(inputImage);

console.log(output);
```

## Image Feature Extraction

Image feature extraction involves extracting features from images for tasks like object detection, image classification, and image retrieval.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputImage = "https://example.com/image.jpg";

const model = client.model("nomic-ai/nomic-embed-vision-v1");

await model.load();

const output = await model.run(inputImage);

console.log(output);
```

## Mask Generation

Mask generation involves generating masks for objects in images. Use cases include image segmentation, medical imaging, and computer vision tasks.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputImageBase64 = await getBase64Image("https://example.com/image.png");

const model = client.model("facebook/sam-vit-base");

await model.load();

const output = await model.run({ b64ImageBufferPng: inputImageBase64 });

console.log(output);
```

Helper function to convert image URL to base64:

```js
async function getBase64Image(url) {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = function () {
      resolve(reader.result.split(",")[1]);
    };
    reader.readAsDataURL(blob);
  });
}
```

## Summarization

Summarization involves creating concise summaries of longer texts. Use cases include news summarization, document summarization, and generating abstracts.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputText = "Your long text goes here...";

const model = client.model("ainize/bart-base-cnn");

await model.load();

const output = await model.run(inputText, { max_length: 40 });

console.log(output);
```

## Text Classification

Text classification involves categorizing text into predefined classes. Use cases include sentiment analysis, spam detection, and topic classification.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputText = "Your text for classification goes here...";

const model = client.model("AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon");

await model.load();

const output = await model.run(inputText);

console.log(output);
```

## Feature Extraction

Feature extraction involves extracting features from data for further processing. Use cases include data preprocessing, embedding generation, and similarity search.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputText = "Your text for feature extraction goes here...";

const model = client.model("Salesforce/SFR-Embedding-2_R");

await model.load();

const output = await model.run(inputText);

console.log(output);
```

## Translation

Translation involves translating text from one language to another. Use cases include multilingual communication, content localization, and language learning.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputText = "Hello, how are you? Beautiful day today, isn't it?";

const model = client.model("Helsinki-NLP/opus-mt-en-zh");

await model.load();

const output = await model.run(inputText);

console.log(output);
```

## Question Answering

Question answering involves answering questions based on a given context. Use cases include customer support, information retrieval, and educational tools.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("deepset/roberta-base-squad2");

await model.load();

const QA_input = {
  question: 'Where does Holly live?',
  context: 'My name is Holly and I live in NYC',
};

const output = await model.run(QA_input);

console.log(output);
```

## Text to Video

Text to video involves generating videos from textual descriptions. Use cases include content creation, entertainment, and education.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("ali-vilab/text-to-video-ms-1.7b");

await model.load();

const output = await model.run("A cat playing with a rose");

console.log(output);
```

## Fill Mask

Fill mask involves predicting missing words in a sentence. Use cases include text completion, language modeling, and text generation.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("almanach/camembert-base");

await model.load();

const output = await model.run("The capital of France is <mask>.");

console.log(output);
```

## Audio Classification

Audio classification involves categorizing audio clips into predefined classes. Use cases include speech emotion recognition, sound detection, and music genre classification.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputAudioBase64 = await getBase64Audio("https://example.com/audio.wav");

const model = client.model("aaraki/wav2vec2-base-finetuned-ks");

await model.load();

const output = await model.run({ b64AudioBufferWav: inputAudioBase64 });

console.log(output);
```

Helper function to convert audio URL to base64:

```js
async function getBase64Audio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();
  return btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
}
```

## Image Segmentation

Image segmentation involves dividing an image into multiple segments. Use cases include medical imaging, object detection, and computer vision tasks.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const imgUrl = "https://example.com/image.jpg";

const model = client.model("sayeed99/segformer-b3-fashion");

await model.load();

const output = await model.run(imgUrl);

console.log(output);
```

## Visual Question Answering

Visual question answering involves answering questions based on an image. Use cases include interactive learning, accessibility features, and content analysis.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("Salesforce/blip-vqa-base");

await model.load();

const input = {
  image: "https://example.com/image.jpg",
  question: "What kind of animal is this?",
};

const output = await model.run(input);

console.log(output);
```

## Text to Speech

Text to speech involves converting text into spoken words. Use cases include virtual assistants, accessibility features, and content creation.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("suno/bark-small");

await model.load();

const output = await model.run("Hello, how are you today?");

console.log(output);
```

## Video Classification

Video classification involves categorizing videos into predefined classes. Use cases include video content analysis, security surveillance, and media organization.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const videoUrl = "https://example.com/video.mp4";

const model = client.model("ahmedabdo/video-classifier");

await model.load();

const output = await model.run(videoUrl);

console.log(output);
```

## Object Detection

Object detection involves identifying and locating objects in an image or video. Use cases include security systems, autonomous driving, and retail analytics.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const imgUrl = "https://example.com/image.jpg";

const model = client.model("facebook/detr-resnet-50");

await model.load();

const output = await model.run(imgUrl);

console.log(output);
```

## Text to Text Generation

Text to text generation involves generating text from input text. Use cases include text completion, content generation, and dialogue systems.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const modelParams = { max_new_tokens: 20, temperature: 2 };

const model = client.model("google/flan-t5-base");

await model.load();

const output = await model.run("Once upon a time there was a small little man who", modelParams);

console.log(output);
```

## Zero-Shot Image Classification

Zero-shot image classification involves classifying images into classes not seen during training. Use cases include novel object recognition, transfer learning, and few-shot learning.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("BilelDJ/clip-hugging-face-finetuned");

await model.load();

const input = {
  image: "https://example.com/image.jpg",
  candidate_labels: ["squid", "octopus", "human", "cat"],
};

const output = await model.run(input);

console.log(output);
```

## Zero-Shot Classification

Zero-shot classification involves classifying text into classes not seen during training. Use cases include intent detection, content moderation, and dynamic classification.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("facebook/bart-large-mnli");

await model.load();

const input = {
  text: "One day I will see the world",
  candidate_labels: ["travel", "cooking", "dancing"],
};

const output = await model.run(input);

console.log(output);
```

## Document Question Answering

Document question answering involves answering questions based on the content of documents. Use cases include document understanding, contract analysis, and information retrieval.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0");

await model.load();

const input = {
  image: "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
  question: "What's the total cost?",
};

const output = await model.run(input);

console.log(output.output[0].answer);
```

## Text Generation

Text generation involves generating coherent text from an initial prompt. Use cases include story generation, dialogue systems, and creative writing.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const modelParams = {
  max_new_tokens: 500,
  min_new_tokens: 50,
  temperature: 0.5,
};

const model = client.model("Qwen/Qwen2-7B-Instruct");

await model.load();

const stream = await model.run("Once upon a time there was a beautiful home where", modelParams, { stream: true });

const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}
```

## Unconditional Image Generation

Unconditional image generation involves generating images without any specific conditions or inputs. Use cases include art generation, creative design, and data augmentation.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("afshr/cam_finetune");

await model.load();

const output = await model.run("A rose");

console.log(output);

// Display the image (assuming in a browser environment)
const base64String = output.output_png;
const img = new Image();
img.src = 'data:image/png;base64,' + base64String;
document.body.appendChild(img);
```

## Automatic Speech Recognition

Automatic speech recognition involves converting spoken language into written text. Use cases include transcription services, voice assistants, and accessibility features.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputAudioBase64 = await getBase64Audio("https://example.com/input.flac");

const model = client.model("facebook/data2vec-audio-base-960h");

await model.load();

const output = await model.run({ b64AudioBufferWav: inputAudioBase64 });

console.log(output);
```

## Zero-Shot Object Detection

Zero-shot object detection involves detecting objects in images without prior training on those specific objects. Use cases include novel object detection, transfer learning, and few-shot learning.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputImageBase64 = await getBase64Image("https://example.com/image.png");

const model = client.model("BilelDJ/clip-hugging-face-finetuned");

await model.load();

const input = {
  b64ImageBufferPng: inputImageBase64,
  candidate_labels: ["squid", "octopus", "human", "cat"],
};

const output = await model.run(input);

console.log(output);
```

## Text to Image

Text to image involves generating images from textual descriptions. Use cases include content creation, advertising, and creative design.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model = client.model("dreamlike-art/dreamlike-photoreal-2.0");

await model.load();

const output = await model.run("A beautiful landscape with mountains and a river");

console.log(output);

// Display the image (assuming in a browser environment)
const base64String = output.output_png;
const img = new Image();
img.src = 'data:image/png;base64,' + base64String;
document.body.appendChild(img);
```

## Chat Models

Chat models are used to create interactive conversational agents. These models can engage in dialogue with users, respond to questions, and provide information or entertainment.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const messages = [
  {
    role: "system",
    content: "You are a friendly chatbot",
  },
  {
    role: "user",
    content: "What is the capital of England?",
  },
];

const model = client.model("microsoft/Phi-3-mini-4k-instruct");

await model.load();

const output = await model.run(messages, { max_length: 100 });

console.log(output.output[0].generated_text);
```

## Models with Function Calling

Some models support function calling, allowing them to interact with user-defined functions.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const inputText = "What's the weather like in Seattle right now?";

const modelParams = {
  max_new_tokens: 500,
  min_new_tokens: 50,
  temperature: 0.001,
  do_sample: false,
};

const promptTemplate = `
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
`;

const model = client.model("Nexusflow/NexusRaven-V2-13B");

await model.load();

const prompt = promptTemplate.replace("{query}", inputText);

const stream = await model.run(prompt, modelParams, { stream: true });

const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}
```

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
