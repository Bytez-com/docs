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
```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model_id = "openai-community/gpt2";

const model = client.model("openai-community/gpt2");

await model.load();

const output = await model.run("Once upon a time there was a", {
// huggingface params
  max_new_tokens: 20,
  min_new_tokens: 5
});

console.log(output);
```

Streaming usage (only text-generation models support streaming currently)
```js
const stream = await model.run("Jack and Jill", { stream: true });
const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
}
```

## Installation

```bash
npm install bytez.js
```

## Authentication and Getting Your Key

To use this API, you need an API key. Obtain your key by visiting the [Bytez Settings Page](https://bytez.com/settings)

![Bytez Settings Page](https://github.com/user-attachments/assets/884b92b1-021a-4aa4-a150-312ae89f80d0)

To then use it in code:

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");
```

## List Available Models

Lists the currently available models and provides basic information about each one, such as the RAM required to run an instance.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

// lists all models
const models = await client.list.models.all();

console.log(models);

// to list models by task
const modelsByTask = await client.list.models.byTask("object-detection");

console.log(modelsByTask);
```

## Initialize the Model API

Initialize a model, so you can check its status, load, run, or shut it down.

```js
const model = client.model("openai-community/gpt2");
```

## Load a Model

Convenience method for `model.start()`. Automatically waits for the instance to become ready.

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
  max_new_tokens: 20,
  min_new_tokens: 5,
});

console.log(output);
```

## Stream the Response

Note: This is only supported for `text-generation` models.

```js
const stream = await model.run("Jack and Jill", { stream: true });
const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
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

All examples are also located [here](https://github.com/Bytez-com/docs/tree/main/examples/javascript) under the `tasks` directory.

## Token Classification

Token classification involves identifying and categorizing tokens in a text. Common use cases include Named Entity Recognition (NER), Part-of-Speech tagging, and other NLP tasks.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("dslim/bert-base-NER");

await model.load();

const { output: wordObjects } = await model.run(
  "John Doe is a software engineer at Google."
);

for (const wordObject of wordObjects) {
  // depending on the model, there may be additional props returned
  console.log(wordObject);

  const { word, entity, score, index, start, end } = wordObject;

  console.log({ word, entity, score, index, start, end });
}
```

## Depth Estimation

Depth estimation involves predicting the distance of objects from the camera. Use cases include robotics, augmented reality, and autonomous vehicles.

```js
import Bytez from "bytez.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImage =
  "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg";

const model = client.model("vinvino02/glpn-nyu");

await model.load();

const { output } = await model.run(inputImage);

const { depth_png, formatted_predicted_depth_array } = output;

///// Decode and view the image /////
const imgBuffer = Buffer.from(depth_png, "base64");

const imagePath = `${__dirname}/testImage.png`;

writeFileSync(imagePath, imgBuffer);

// write the original image for comparison, you could also just ctrl+click the url

const originalImagePath = `${__dirname}/originalImage.jpg`;

const response = await fetch(inputImage);

const arrayBuffer = await response.arrayBuffer();

const buffer = Buffer.from(arrayBuffer);

writeFileSync(originalImagePath, buffer);

// compare the two images by opening theme where they were written
console.log("Wrote the original image to: ", originalImagePath);
console.log("Wrote the inference image to: ", imagePath);

///// 2d depth map, object representation of the pixel values for the depth map /////
const rows = formatted_predicted_depth_array;
for (let j = 0; j < rows.length; j++) {
  const row = formatted_predicted_depth_array[j];

  for (let i = 0; i < row.length; i++) {
    // insert code here if you need these values directly
    const pixel = row[i];
  }
}
```

## Image Classification

Image classification involves categorizing images into predefined classes. Use cases include object recognition, medical imaging, and security systems.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const imgUrl =
  "https://www.padoniavets.com/sites/default/files/field/image/cats-and-dogs.jpg";

const model = client.model("google/vit-base-patch16-224");

await model.load();

const { output: labelObjects } = await model.run(imgUrl);

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { label, score } = labelObject;

  console.log({ label, score });
}
```

## Sentence Similarity

Sentence similarity involves measuring how similar two sentences are. Use cases include duplicate question detection, paraphrase detection, and text clustering.

```js
import Bytez from "bytez.js";
import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("sentence-transformers/all-MiniLM-L6-v2");

await model.load();

const sentences = [
  "What is the weather like today?",
  "Is it sunny today?",
  "The e39 BMW M5 was one of the best production sport sedans ever produced."
];

const results = [];

for (const sentence of sentences) {
  const { output: embedding } = await model.run(sentence);

  console.log({ embedding });

  results.push({
    embedding,
    sentence
  });
}

// Extract the original sentence's embedding and the embeddings to compare
const [originalSentenceWithEmbedding] = results;
const sentencesToCompare = results.slice(1);

function cosineSimilarity(embedding1, embedding2) {
  const tensor1 = tf.tensor(embedding1);
  const tensor2 = tf.tensor(embedding2);

  const dotProduct = tf.sum(tf.mul(tensor1, tensor2));
  const magnitude1 = tf.sqrt(tf.sum(tf.square(tensor1)));
  const magnitude2 = tf.sqrt(tf.sum(tf.square(tensor2)));

  const similarity = dotProduct.div(magnitude1.mul(magnitude2));

  return similarity.dataSync()[0]; // Extract the similarity value
}

// Calculate and display cosine similarity for each comparison
for (const sentenceObject of sentencesToCompare) {
  const similarity = cosineSimilarity(
    originalSentenceWithEmbedding.embedding,
    sentenceObject.embedding
  );
  console.log(
    `Cosine similarity between "${originalSentenceWithEmbedding.sentence}" and "${sentenceObject.sentence}":`,
    similarity
  );
}
```

## Image to Text

Image to text involves generating textual descriptions of images. Use cases include image captioning, content generation, and accessibility features.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImage =
  "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg";

const model = client.model("Salesforce/blip-image-captioning-base");

await model.load();

const { output } = await model.run(inputImage);

// depending on the model, there may be additional props returned
console.log(output);

const [{ generated_text }] = output;

console.log(generated_text);
```

## Image Feature Extraction

Image feature extraction involves extracting features from images for tasks like object detection, image classification, and image retrieval.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImage =
  "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg";

const model = client.model("nomic-ai/nomic-embed-vision-v1");

await model.load();

const { output: embedding } = await model.run(inputImage);

console.log(embedding);
```

## Mask Generation

Mask generation involves generating masks for objects in images. Use cases include image segmentation, medical imaging, and computer vision tasks.

```js
import Bytez from "bytez.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFileSync, readFileSync } from "node:fs";
import { PNG } from "pngjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImageBase64 = await getBase64Image(
  "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/mask-generation/mask-generation-input.png"
);

const model = client.model("facebook/sam-vit-base");

await model.load();

const { output } = await model.run({ b64ImageBufferPng: inputImageBase64 });

console.log(output);

const { input_image_dimensions, masks, scores } = output;

console.log({ input_image_dimensions, masks, scores });

// to then visualize the masks:
const testMasksPath = `${__dirname}/testMasks.json`;

writeFileSync(testMasksPath, JSON.stringify(masks, null, 2));

const testMasks = JSON.parse(readFileSync(testMasksPath));

writeMasksToImage(inputImageBase64, testMasks);

function writeMasksToImage(inputImageBase64, masks) {
  // Decode the base64 image buffer
  const srcImgBuffer = Buffer.from(inputImageBase64, "base64");
  const srcPng = PNG.sync.read(srcImgBuffer);

  // Function to apply masks to the image
  function applyMasks(srcPng, masks) {
    const colors = [
      { r: 255, g: 0, b: 0, a: 50 }, // Red
      { r: 0, g: 255, b: 0, a: 50 }, // Green
      { r: 0, g: 0, b: 255, a: 50 }, // Blue
      { r: 255, g: 255, b: 0, a: 50 } // Yellow
      // Add more colors if needed
    ];

    masks.forEach((mask, maskIndex) => {
      const color = colors[maskIndex % colors.length]; // Cycle through colors if more masks than colors

      for (let i = 0; i < mask.length; i++) {
        const row = mask[i];
        for (let j = 0; j < row.length; j++) {
          if (row[j]) {
            // Assuming mask contains 1 for masked pixel and 0 for non-masked
            const idx = (i * srcPng.width + j) << 2;
            srcPng.data[idx] = color.r;
            srcPng.data[idx + 1] = color.g;
            srcPng.data[idx + 2] = color.b;
            srcPng.data[idx + 3] = color.a;
          }
        }
      }
    });

    return srcPng;
  }

  // Apply masks to the image
  const imgWithMasks = applyMasks(srcPng, masks);

  // Encode the image back to buffer
  const imgBuffer = PNG.sync.write(imgWithMasks);

  const imagePath = `${__dirname}/testImage.png`;

  writeFileSync(imagePath, imgBuffer);
}

async function getBase64Image(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer(); // Get the image as arrayBuffer
  const buffer = Buffer.from(arrayBuffer); // Convert it to a Buffer
  return buffer.toString("base64"); // Convert the buffer to base64
}
```

## Summarization

Summarization involves creating concise summaries of longer texts. Use cases include news summarization, document summarization, and generating abstracts.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = `
The Big Bang is a physical theory that describes how the universe expanded from an initial state of high density and temperature.[1] The notion of an expanding universe was first scientifically originated by physicist Alexander Friedmann in 1922 with the mathematical derivation of the Friedmann equations.[2][3][4][5]

Independent of Friedmann's work, the Big Bang was first proposed in 1931 by Roman Catholic priest and physicist Georges Lemaître when he suggested the universe emerged from a "primeval atom". Various cosmological models of the Big Bang explain the evolution of the observable universe from the earliest known periods through its subsequent large-scale form.[6][7][8] These models offer a comprehensive explanation for a broad range of observed phenomena, including the abundance of light elements, the cosmic microwave background (CMB) radiation, and large-scale structure. The uniformity of the universe, known as the flatness problem, is explained through cosmic inflation: a sudden and very rapid expansion of space during the earliest moments.

Crucially, these models are compatible with the Hubble–Lemaître law—the observation that the farther away a galaxy is, the faster it is moving away from Earth. Extrapolating this cosmic expansion backward in time using the known laws of physics, the models describe an increasingly concentrated cosmos preceded by a singularity in which space and time lose meaning (typically named "the Big Bang singularity").[9] Physics lacks a widely accepted theory of quantum gravity that can model the earliest conditions of the Big Bang. In 1964 the CMB was discovered, which convinced many cosmologists that the competing steady-state model of cosmic evolution was falsified, since the Big Bang models predict a uniform background radiation caused by high temperatures and densities in the distant past.[10] A wide range of empirical evidence strongly favors the Big Bang event, which is now essentially universally accepted.[11] Detailed measurements of the expansion rate of the universe place the Big Bang singularity at an estimated 13.787±0.020 billion years ago, which is considered the age of the universe.[12]

There remain aspects of the observed universe that are not yet adequately explained by the Big Bang models. After its initial expansion, the universe cooled sufficiently to allow the formation of subatomic particles, and later atoms. The unequal abundances of matter and antimatter that allowed this to occur is an unexplained effect known as baryon asymmetry. These primordial elements—mostly hydrogen, with some helium and lithium—later coalesced through gravity, forming early stars and galaxies. Astronomers observe the gravitational effects of an unknown dark matter surrounding galaxies. Most of the gravitational potential in the universe seems to be in this form, and the Big Bang models and various observations indicate that this excess gravitational potential is not created by baryonic matter, such as normal atoms. Measurements of the redshifts of supernovae indicate that the expansion of the universe is accelerating, an observation attributed to an unexplained phenomenon known as dark energy.[13]
`;

const model = client.model("ainize/bart-base-cnn");

await model.load();

const { output: [{ summary_text }] } = await model.run(inputText, {
  max_length: 40
});

console.log(summary_text);
```

## Text Classification

Text classification involves categorizing text into predefined classes. Use cases include sentiment analysis, spam detection, and topic classification.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = "We are furious with the results of the experiment!";

const model = client.model(
  "AdamCodd/distilbert-base-uncased-finetuned-sentiment-amazon"
);

await model.load();

const { output: labelObjects } = await model.run(inputText);

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { label, score } = labelObject;

  console.log({ label, score });
}
```

## Feature Extraction

Feature extraction involves extracting features from data for further processing. Use cases include data preprocessing, embedding generation, and similarity search.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = "Your text for feature extraction goes here...";

const model = client.model("Salesforce/SFR-Embedding-2_R");

await model.load();

const {
  output: [embedding]
} = await model.run(inputText);

console.log(embedding);
```

## Translation

Translation involves translating text from one language to another. Use cases include multilingual communication, content localization, and language learning.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = "Hello, how are you? Beautiful day today, isn't it?";

const model = client.model("Helsinki-NLP/opus-mt-en-zh");

await model.load();

const { output: [{ translation_text }]} = await model.run(inputText);

console.log(translation_text);
```

## Question Answering

Question answering involves answering questions based on a given context. Use cases include customer support, information retrieval, and educational tools.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("deepset/roberta-base-squad2");

await model.load();

const QA_input = {
  question: "Where does Holly live?",
  context: "My name is Holly and I live in NYC"
};

const { output } = await model.run(QA_input);

// depending on the model, there may be additional props returned
console.log(output);

const { answer, score, start, end } = output;

console.log({
  answer,
  score,
  start,
  end
});
```

## Text to Video

Text to video involves generating videos from textual descriptions. Use cases include content creation, entertainment, and education.

```js
import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("ali-vilab/text-to-video-ms-1.7b");

await model.load();

const { output_mp4 } = await model.run("A cat playing with a rose");

const buffer = Buffer.from(output_mp4, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.mp4`, buffer);
```

## Fill Mask

Fill mask involves predicting missing words in a sentence. Use cases include text completion, language modeling, and text generation.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("almanach/camembert-base");

await model.load();

const { output: sequenceObjects } = await model.run(
  "The capital of France is <mask>."
);

for (const sequenceObject of sequenceObjects) {
  // depending on the model, there may be additional props returned
  console.log(sequenceObject);

  const { sequence, score, token, token_str } = sequenceObject;

  console.log({ sequence, score, token, token_str });
}
```

## Audio Classification

Audio classification involves categorizing audio clips into predefined classes. Use cases include speech emotion recognition, sound detection, and music genre classification.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputAudioBase64 = await getBase64Audio(
  "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/audio-classification/audio.wav"
);

const model = client.model("aaraki/wav2vec2-base-finetuned-ks");

await model.load();

const { output: labelObjects } = await model.run({
  b64AudioBufferWav: inputAudioBase64
});

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}

async function getBase64Audio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Convert the ArrayBuffer to a Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Convert the binary data in the buffer to a base64 string
  return buffer.toString("base64");
}
```

## Image Segmentation

Image segmentation involves dividing an image into multiple segments. Use cases include medical imaging, object detection, and computer vision tasks.

```js
import Bytez from "bytez.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const imgUrl =
  "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9";

const model = client.model("sayeed99/segformer-b3-fashion");

await model.load();

const { output: maskObjects } = await model.run(imgUrl);

for (let i = 0; i < maskObjects.length; i++) {
  // depending on the model, there may be additional props returned
  const maskObject = maskObjects[i];
  console.log(maskObject);

  const { label, score, mask_png } = maskObject;
  console.log({ label, score });

  const maskBufferPng = Buffer.from(mask_png, "base64");

  writeFileSync(`${__dirname}/mask-${i}.png`, maskBufferPng);
}
```

## Visual Question Answering

Visual question answering involves answering questions based on an image. Use cases include interactive learning, accessibility features, and content analysis.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("Salesforce/blip-vqa-base");

await model.load();

const input = {
  image:
    "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9",
  question: "What kind of animal is this?"
};

const { output: outputs } = await model.run(input);

const [{ answer }] = outputs;

console.log(answer);
```

## Text to Speech

Text to speech involves converting text into spoken words. Use cases include virtual assistants, accessibility features, and content creation.

```js
import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("suno/bark-small");

await model.load();

const { output_wav } = await model.run("Hello, how are you today?");

const buffer = Buffer.from(output_wav, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.wav`, buffer);
```

## Video Classification

Video classification involves categorizing videos into predefined classes. Use cases include video content analysis, security surveillance, and media organization.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const videoUrl =
  "https://video-previews.elements.envatousercontent.com/6d07b79d-b17a-47b5-9d24-4fe984c7ca36/watermarked_preview/watermarked_preview.mp4";

const model = client.model("ahmedabdo/video-classifier");

await model.load();

const { output: outputs } = await model.run(videoUrl);

const [labelObjects] = outputs;

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}
```

## Object Detection

Object detection involves identifying and locating objects in an image or video. Use cases include security systems, autonomous driving, and retail analytics.

```js
import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync, rmSync } from "node:fs";
import { PNG } from "pngjs";
import sharp from "sharp";
import { createCanvas } from "canvas";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");
const imgUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg";

const model = client.model("facebook/detr-resnet-50");

await model.load();

const { output: boxObjects, error } = await model.run(imgUrl);

console.log(boxObjects);

for (const boxObject of boxObjects) {
  console.log(boxObject);
  const {
    score,
    label,
    box: { xmin, ymin, xmax, ymax }
  } = boxObject;

  console.log({ score, label, box: { xmin, ymin, xmax, ymax } });
}

const res = await fetch(imgUrl);

const arrayBuffer = await res.arrayBuffer();

const b64ImageBufferJpg = Buffer.from(arrayBuffer);

const imageBufferPng = await sharp(b64ImageBufferJpg).png().toBuffer();

debugImage(imageBufferPng, boxObjects);

function debugImage(srcImgBuffer, boxObjects) {
  // writeFileSync(`${__dirname}/testBoxes.json`, JSON.stringify(boxObjects, null, 2));

  const srcPng = PNG.sync.read(srcImgBuffer);
  const width = srcPng.width;
  const height = srcPng.height;

  // Create a canvas and get the context
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext("2d");

  // Draw the image onto the canvas
  const imgData = ctx.createImageData(width, height);

  imgData.data.set(srcPng.data);

  ctx.putImageData(imgData, 0, 0);

  const colors = [
    { r: 255, g: 0, b: 0, a: 0.5, colorString: "rgba(255, 0, 0, 0.5)" }, // Red
    { r: 0, g: 255, b: 0, a: 0.5, colorString: "rgba(0, 255, 0, 0.5)" }, // Green
    { r: 0, g: 0, b: 255, a: 0.5, colorString: "rgba(0, 0, 255, 0.5)" }, // Blue
    { r: 255, g: 255, b: 0, a: 0.5, colorString: "rgba(255, 255, 0, 0.5)" } // Yellow
    // Add more colors if needed
  ];

  boxObjects.forEach((boxObject, index) => {
    const { box, score, label } = boxObject;
    const color = colors[index % colors.length]; // Cycle through colors if more boxObjects than colors

    // Draw the bounding box
    ctx.strokeStyle = color.colorString;
    ctx.lineWidth = 2;
    ctx.strokeRect(
      box.xmin,
      box.ymin,
      box.xmax - box.xmin,
      box.ymax - box.ymin
    );

    // Draw the label and score
    ctx.font = "16px Arial";
    ctx.fillStyle = color.colorString;
    ctx.fillText(`${label} (${score.toFixed(2)})`, box.xmin, box.ymin - 5);
  });

  // Encode the image back to buffer
  const imgBuffer = canvas.toBuffer("image/png");

  const imagePath = `${__dirname}/testImage.png`;

  writeFileSync(imagePath, imgBuffer);
}
```

## Text to Text Generation

Text to text generation involves generating text from input text. Use cases include text completion, content generation, and dialogue systems.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const modelParams = { max_new_tokens: 20, temperature: 2 };

const model = client.model("google/flan-t5-base");

await model.load();

const { output: [{ generated_text }] } = await model.run(
  "Once upon a time there was a small little man who",
  modelParams
);

console.log(generated_text);
```

## Zero-Shot Image Classification

Zero-shot image classification involves classifying images into classes not seen during training. Use cases include novel object recognition, transfer learning, and few-shot learning.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("BilelDJ/clip-hugging-face-finetuned");

await model.load();

const input = {
  image:
    "https://as1.ftcdn.net/v2/jpg/03/03/55/82/1000_F_303558268_YNUQp9NNMTE0X4zrj314mbWcDHd1pZPD.jpg",
  candidate_labels: ["squid", "octopus", "human", "cat"]
};

const { output: labelObjects } = await model.run(input);

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}
```

## Zero-Shot Classification

Zero-shot classification involves classifying text into classes not seen during training. Use cases include intent detection, content moderation, and dynamic classification.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("facebook/bart-large-mnli");

await model.load();

const input = {
  text: "One day I will see the world",
  candidate_labels: ["travel", "cooking", "dancing"]
};

const { output } = await model.run(input);

// depending on the model, there may be additional props returned
console.log(output);

const { sequence, labels, scores } = output;

const labelObjects = labels.map((v, i) => ({
  sequence,
  label: v,
  score: scores[i]
}));

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  const { sequence, label, score } = labelObject;

  console.log({ sequence, label, score });
}
```

## Document Question Answering

Document question answering involves answering questions based on the content of documents. Use cases include document understanding, contract analysis, and information retrieval.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("cloudqi/CQI_Visual_Question_Awnser_PT_v0");

await model.load();

const input = {
  image: "https://templates.invoicehome.com/invoice-template-us-neat-750px.png",
  question: "How many hours of labor?"
};

const { output } = await model.run(input);

// depending on the model, there may be additional props returned
console.log(output);

const [{ answer, score, start, end }] = output;

console.log({ answer, score, start, end });
```

## Text Generation

Text generation involves generating coherent text from an initial prompt. Use cases include story generation, dialogue systems, and creative writing.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const modelParams = {
  max_new_tokens: 2000,
  min_new_tokens: 50,
  temperature: 0.5
};

const model = client.model("Qwen/Qwen2-7B-Instruct");

await model.load();

const stream = await model.run(
  "Once upon a time there was a beautiful home where",
  { stream: true, ...modelParams }
);

const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
}
```

## Unconditional Image Generation

Unconditional image generation involves generating images without any specific conditions or inputs. Use cases include art generation, creative design, and data augmentation.

```js
import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("afshr/cam_finetune");

await model.load();

const { output_png } = await model.run("A rose");

const buffer = Buffer.from(output_png, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.png`, buffer);
```

## Automatic Speech Recognition

Automatic speech recognition involves converting spoken language into written text. Use cases include transcription services, voice assistants, and accessibility features.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputAudioBase64 = await getBase64Audio(
  "https://huggingface.co/datasets/huggingfacejs/tasks/resolve/main/automatic-speech-recognition/input.flac"
);

const model = client.model("facebook/data2vec-audio-base-960h");

await model.load();

const { output } = await model.run({ b64AudioBufferWav: inputAudioBase64 });

// depending on the model, there may be additional props returned
console.log(output);

const { text } = output;

console.log("Inference is: ", text);

await model.stop();

async function getBase64Audio(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer();

  // Convert the ArrayBuffer to a Buffer
  const buffer = Buffer.from(arrayBuffer);

  // Convert the binary data in the buffer to a base64 string
  return buffer.toString("base64");
}
```

## Zero-Shot Object Detection

Zero-shot object detection involves detecting objects in images without prior training on those specific objects. Use cases include novel object detection, transfer learning, and few-shot learning.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputImageBase64 = await getBase64Image(
  "https://ocean.si.edu/sites/default/files/styles/3_2_largest/public/2023-11/Screen_Shot_2018-04-16_at_1_42_56_PM.png.webp?itok=Icvi-ek9"
);

const model = client.model("BilelDJ/clip-hugging-face-finetuned");

await model.load();

const input = {
  b64ImageBufferPng: inputImageBase64,
  candidate_labels: ["squid", "octopus", "human", "cat"]
};

const { output: labelObjects } = await model.run(input);

// sort desc
labelObjects.sort((a, b) => (a.score < b.score ? 1 : -1));

for (const labelObject of labelObjects) {
  // depending on the model, there may be additional props returned
  console.log(labelObject);

  const { score, label } = labelObject;

  console.log({ score, label });
}

async function getBase64Image(url) {
  const response = await fetch(url);
  const arrayBuffer = await response.arrayBuffer(); // Get the image as arrayBuffer
  const buffer = Buffer.from(arrayBuffer); // Convert it to a Buffer
  return buffer.toString("base64"); // Convert the buffer to base64
}
```

## Text to Image

Text to image involves generating images from textual descriptions. Use cases include content creation, advertising, and creative design.

```js
import Bytez from "bytez.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { writeFileSync } from "node:fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("dreamlike-art/dreamlike-photoreal-2.0");

await model.load();

const { output_png } = await model.run(
  "A beautiful landscape with mountains and a river"
);

const buffer = Buffer.from(output_png, "base64");

// Write the image to the local file system
writeFileSync(`${__dirname}/output.png`, buffer);
```

## Chat Models

Chat models are used to create interactive conversational agents. These models can engage in dialogue with users, respond to questions, and provide information or entertainment.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

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

const { output } = await model.run(messages, { max_length: 100 });

const [{ generated_text }] = output;

for (const message of generated_text) {
  // depending on the model, there may be additional props returned
  console.log(message);

  const { content, role } = message;

  console.log({ content, role });
}
```

## Models with Function Calling

Some models support function calling, allowing them to interact with user-defined functions.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const inputText = "What's the weather like in Seattle right now?";

const modelParams = {
  max_new_tokens: 2000,
  min_new_tokens: 50,
  temperature: 0.001,
  do_sample: false
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

const stream = await model.run(prompt, { stream: true, params: modelParams });

const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
}
```

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
