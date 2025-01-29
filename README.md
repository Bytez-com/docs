<div align="center">
 <img alt="bytez" height="250px" src="https://github.com/Bytez-com/docs/assets/9612780/610ae3a1-65b5-4f8a-8ed5-0bae9134ab5f">

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/Zrd5UbMEBA)](https://discord.com/invite/Z723PfCFWf) 
[![](https://img.shields.io/badge/Bytez-000000?style=for-the-badge&logo=x&=logoColor=white)](https://x.com/Bytez)
[![Discord](https://img.shields.io/discord/844731722700816395)](https://discord.com/invite/Z723PfCFWf) 
[![NPM Version](https://img.shields.io/npm/v/bytez.js)](https://www.npmjs.com/package/bytez.js)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1oZ4_yQoryL9a3CCLiY29JpEI1L5uwqO-?authuser=1#scrollTo=3LRTz2egUNh7&uniqifier=3)

</div>

# Bytez Model API

✨ Access 40k+ open-source and proprietary AI models through a standard API. Achieve GPU-backed performance at CPU pricing ✨

## Table of Contents

1. [Introduction](#introduction)
2. [Quickstart](#quickstart)
3. [API Documentation](#api-documentation)
   - [Get a Bytez API Key](#get-a-bytez-api-key)
   - [List Models & Tasks](#list-models--tasks)
   - [Play with Trending Models on Bytez](#play-with-trending-models-on-bytez)
4. [Libraries](#libraries)
5. [Docker](#docker)
6. [Capabilities](#capabilities)
   - [Chat (Text Generation)](#chat)
   - [Chat + Vision](#chat--vision)
   - [Chat + Video](#chat--video)
   - [Chat + Audio](#chat--audio)
   - [Image Generation](#image-generation)
   - [Embeddings](#embeddings)
   - [Function Calling](#function-calling)
   - [Streaming](#streaming)
   - [All Model Tasks](#all-model-tasks)
7. [Proprietary Models](#proprietary-models)
8. [Pricing](#pricing)
9. [API Playground](#api-playground)
10. [Status](#status)
11. [Resources](#resources)
12. [Feedback](#feedback)

---

## Introduction

Bytez Model API streamlines integration with 40k+ open-source and proprietary AI models across 33 ML tasks. By standardizing inputs for `text`, `images`, `audio`, and more, it eliminates the complexity of inconsistent formats, enabling developers to effortlessly interact with models for tasks like `chat`, `text generation`, `image generation`, `video generation`, and beyond.

---

## Quickstart
Get your API Key by signing up on [Bytez](http://bytez.com), then navigating to Settings in your account.

Validate by running an inference:

#### REST
```bash
curl --location 'https://api.bytez.com/models/v2/openai-community/gpt2' \
--header 'Authorization: Key BYTEZ_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "text": "Dreams are messages from the "
}'
```

## API Documentation

### Get a Bytez API Key

1. Log into [Bytez](http://bytez.com).
2. Navigate to the `Settings` page.
3. Locate your API key under the **API Keys** section and copy it.

Use this key in the `Authorization` header for all API requests:

```http
Authorization: Key your-key-here
```

### Send Your First API Request
You can use a `curl` command to verify your setup:

```bash
curl --location 'https://api.bytez.com/models/v2/NousResearch/Hermes-3-Llama-3.1-8B' \
--header 'Authorization: Key BYTEZ_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [
        {
            "role": "system",
            "content": "You'\''re a helpful assistant"
        },
        {
            "role": "user",
            "content": "Dreams are messages from the "
        }
    ]
}'
```

Something not right or need another API Key? DM our team in [Discord](https://discord.com/invite/Z723PfCFWf) and we'll resolve.

### Accessing Closed Source Models
You can interact with proprietary [chat](chat/text#proprietary-models) models by `OpenAI`, `Anthropic`, `Cohere`, `Google`, and `Mistral`

To use these models, you'll need two keys:

1. Your `Bytez API Key`: Obtained as described above.
2. `Provider Key`: The key specific to the provider you want to access (e.g., OpenAI API key).

Example Headers
```http
Authorization: Key your-bytez-api-key
Provider-key: your-provider-key
```

### Notes
1. `No Additional Charges`: Bytez does not charge for accessing proprietary models; however, the respective provider's billing applies.
2. `Seamless Integration`: You can interact with closed-source models using the same standardized input structure as open-source models.


### List Models & Tasks
#### Python
```python
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

## List all models
models = client.list_models()
println(models)

## List models by task
models_by_task = client.list_models("object-detection")
println(models_by_task)
```
#### Javascript
```javascript
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");
// List all models
const models = await client.list.models.all();
console.log(models);
// List models by task
const modelsByTask = await client.list.models.byTask("object-detection");

console.log(modelsByTask);
```
#### Julia
```julia
using Bytez
client = Bytez("YOUR_BYTEZ_KEY_HERE")
model_list = client.list_models()

println(model_list)
```
#### REST
```bash
curl --location 'https://api.bytez.com/models/v2/list/models' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE'

curl --location 'https://api.bytez.com/models/v2/list/models?task=chat' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE'
```
### Play with Trending Models on Bytez
We have an [API playground](https://docs.bytez.com/model-api/playground/overview) to demo over 40k models across 33 tasks. Or, feel free to play with models on the [Bytez platform](https://bytez.com/).

## Libraries
Using `Python 3.9+`, `JavaScript`, or `Julia`, install the appropriate package:

### Python
```python 
pip install bytez
```

### Javascript
```javascript 
npm install bytez.js
```
### Julia
```julia julia
// Run the command julia
// Press ]
// Run the command below
add Bytez
```

### Run Inference

#### Python
```python
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")
model = client.model("Qwen/Qwen2-7B-Instruct")
model.load()

input_text = "Dreams are messages from the "
model_params = {"max_new_tokens": 20, "max_new_tokens": 5, "temperature": 0.5}

result = model.run(input_text, model_params=model_params)
output = result["output"]
generated_text = output[0]["generated_text"]
print(generated_text)
```

#### JavaScript
```javascript
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");
const model_id = "openai-community/gpt2";
const model = client.model("openai-community/gpt2");

await model.load();

const output = await model.run("Dreams are messages from the ", {
  max_new_tokens: 20,
  min_new_tokens: 5
});

console.log(output);
```
#### Julia
```julia
using Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Dreams are messages from the "

options = Dict(
	"params" => Dict(
		"max_new_tokens" => 20,
		"min_new_tokens" => 5,
		"temperature" => 0.5,
	)
)

result = model.run(input_text, options)
output = result["output"]
generated_text = output[1]["generated_text"]
println(generated_text)
```
## Docker
All Bytez model images are available on [Docker Hub](https://hub.docker.com/u/bytez), models can be played with via our [Models](https://bytez.com/models) page 🤙

### Image Source Code
The source code that runs for a given model in the docker image can be found [here](https://github.com/Bytez-com/models)

## Capabilities 
### Chat
Generate text with chat models using structured inputs.

#### Javascript
```javascript javascript

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
  console.log(message);
  const { content, role } = message;
  console.log({ content, role });
}
```
Full documentation [here](https://docs.bytez.com/model-api/docs/chat/text)


### Chat + Vision
Use chat models with images as input to generate text-based responses.

#### Javascript
```javascript javascript
const Bytez = require("bytez.js");
const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("meta-llama/Llama-3.2-11B-Vision-Instruct");
await model.load();

const textInput = [
  {
    role: "system",
    content: [{ type: "text", text: "You are a helpful assistant." }]
  },
  {
    role: "user",
    content: [
      { type: "text", text: "What is this image?" },
      { type: "image", url: "https://hips.hearstapps.com/hmg-prod/images/how-to-keep-ducks-call-ducks-1615457181.jpg?crop=0.670xw:1.00xh;0.157xw,0&resize=980:*" }
    ]
  }
];

const { output } = await model.run(textInput);
console.log(output);
```

Full documentation [here](https://docs.bytez.com/model-api/docs/chat/vision)

### Chat + Video
Use chat models with video input to generate insightful responses.

#### Javascript
```javascript javascript
const Bytez = require("bytez.js");
const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("llava-hf/LLaVA-NeXT-Video-7B-hf");
await model.load();

const textInput = [
  {
    role: "system",
    content: [{ type: "text", text: "You are a helpful assistant." }]
  },
  {
    role: "user",
    content: [
      { type: "text", text: "Why is this video funny?" },
      { type: "video", url: "https://example.com/path-to-video.mp4" }
    ]
  }
];

const { output } = await model.run(textInput);
console.log(output);

```

Full documentation [here](https://docs.bytez.com/model-api/docs/chat/video)

### Chat + Audio
Process and analyze audio inputs with chat models.

#### Javascript
```javascript javascript
const Bytez = require("bytez.js");
const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("Qwen/Qwen2-Audio-7B-Instruct");
await model.load();

const textInput = [
  {
    role: "system",
    content: [{ type: "text", text: "You are a helpful assistant." }]
  },
  {
    role: "user",
    content: [
      { type: "text", text: "What sound is this?" },
      { type: "audio", url: "https://example.com/path-to-audio.mp3" }
    ]
  }
];

const { output } = await model.run(textInput);
console.log(output);
```
Full documentation [here](https://docs.bytez.com/model-api/docs/chat/audio)

### Image Generation
Generate images using Bytez API with `base64` or `URL` inputs.

#### Javascript
```javascript javascript
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

### Embeddings
Generate `text` and `vector` embeddings

```javascript javascript
import Bytez from "bytez.js";

const client = new Bytez("API_KEY");

// 1) Select the model
const model = client.model("nomic-ai/nomic-embed-text-v1.5");

// 2) Load the model
await model.load();

// 3) Run the model
const output = await model.run("Once upon a time");

console.log(output);

```
Full documentation [here](https://docs.bytez.com/model-api/docs/embeddings)

### Function Calling
Execute `code` or `actions` based on model-generated outputs

```javascript javascript
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
Full documentation [here](https://docs.bytez.com/model-api/docs/function-calling)

## Streaming

<Tip>Streaming allows you to receive model outputs incrementally as soon as they are available, which is ideal for tasks like real-time responses or large outputs.</Tip>

### How Streaming Works

To enable streaming, pass `true` as the third argument to the `model.run()` function. The model will return a stream that you can read incrementally.

```javascript javascript
const stream = await model.run(textInput, params, true);
```

### Node.js 

```javascript javascript
const { Readable } = require('stream');

const stream = await model.run(textInput, params, true);

try {
  const readableStream = Readable.fromWeb(stream); // Convert Web Stream to Node.js Readable Stream
  for await (const chunk of readableStream) {
    console.log(chunk.toString()); // Handle each chunk of data
  }
} catch (error) {
  console.error(error); // Handle errors
}
```
### Browser 
```javascript javascript
const stream = await model.run(textInput, params, true);

try {
  const reader = stream.getReader(); // Get a reader for the Web Stream

  while (true) {
    const { done, value } = await reader.read(); // Read the stream chunk-by-chunk
    if (done) break; // Exit when the stream ends
    console.log(new TextDecoder().decode(value)); // Convert Uint8Array to string
  }
} catch (error) {
  console.error(error); // Handle errors
}
```

## All Model Tasks
Our API provides access to a wide range of pretrained models across 33 machine learning tasks, each tailored to specific applications like `summarization`, `document question-answering`, `audio classification`, and more. 

Explore the full list of tasks [here](http://docs.bytez.com/model-api/docs/all-tasks/audio-classification).

## Proprietary Models
Our v2 endpoint supports interacting with proprietary models from `Anthropic`, `Google`, `Cohere`, `OpenAI`, and `Mistral`.

### OpenAI
```bash
curl --location 'https://api.bytez.com/models/v2/openai/gpt-4o-mini' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE' \
--header 'Provider-Key: PROVIDER_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [{"role": "user", "content": "Hello my name is Bob and I like to eat"}],
    "stream": false,
    "params": { "max_tokens": 100 }
}'
```
### Google Gemini
```bash
curl --location 'https://api.bytez.com/models/v2/google/gemini-1.5-flash' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE' \
--header 'Provider-Key: PROVIDER_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [{"role": "user", "content": "Hello my name is Bob and I like to eat"}],
    "stream": false,
    "params": { "temperature": 1 }
}'
```
### Cohere
```bash
curl --location 'https://api.bytez.com/models/v2/cohere/command-r' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE' \
--header 'Provider-Key: PROVIDER_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [{"role": "user", "content": "Cats and rabbits who reside in fancy little houses"}],
    "stream": false,
    "params": { "max_tokens": 50 }
}'
```
### Mistral
```bash 
curl --location 'https://api.bytez.com/models/v2/mistral/mistral-small-latest' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE' \
--header 'Provider-Key: PROVIDER_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [{"role": "user", "content": "Cats and rabbits who reside in fancy little houses"}],
    "stream": false,
    "params": { "max_tokens": 50 }
}'
```
### Anthropic
```bash 
curl --location 'https://api.bytez.com/models/v2/anthropic/claude-3-haiku-20240307' \
--header 'Authorization: Key YOUR_BYTEZ_KEY_HERE' \
--header 'Provider-Key: PROVIDER_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [{"role": "user", "content": "Cats and rabbits who reside in fancy little houses"}],
    "stream": false,
    "params": { "max_tokens": 50 }
}'
```
## Pricing
Inference pricing for models is designed to be straightforward and predictable. Instead of relying on complex token-based pricing (which doesn't make sense for non-text-generation models), we calculate costs based on `Inference Meter Price` and `Time to First Inference`.</Info>

### Formula

```plaintext
Pricing = Meter Price × Inference Time
```

### Key Features

### **Instance-Based Pricing**
- Models run on **instances** optimized for **RAM usage**.
- Instances are categorized by size (e.g., `Micro`, `Small`, `Super`).
- **LLMs (Large Language Models)** have their own specific pricing meters.

### **Transparent API Response Metadata**
Each API response includes:
- **`Inference Meter`**
- **`Inference Meter Price`**
- **`Inference Time`**
- **`Inference Cost`**

### Prices

### Language Models

| Instance Size | GPU RAM (GB) | Inference Meter Price ($/sec) |
|------------------|------------------|-------------------------------|
| Micro         | 16               | 0.0000872083                  |
| XS            | 24               | 0.0001475035                  | 
| SM            | 64               | 0.0006478333                  | 
| MD            | 96               | 0.0008433876                  | 
| LG            | 128              | 0.0012956667                  | 
| XL            | 192              | 0.0024468774                  | 
| XXL           | 320              | 0.0047912685                  | 
| Super         | 640              | 0.0059890856                  |


### All other models

| Instance Size | GPU RAM (GB) | Inference Meter Price ($/sec) | 
|------------------|------------------|-------------------------------|
| Micro            | 16               | 0.00053440                    |
| XS               | 24               | 0.00066800                    | 
| SM               | 64               | 0.00427520                    | 
| MD               | 96               | 0.00480960                    | 
| LG               | 128              | 0.00855040                    | 
| XL               | 192              | 0.01603200                    |
| XXL              | 320              | 0.02458240                    | 
| Super            | 640              | 0.02992640                    | 


## API Playground
Explore our API endpoints in the documentation [here](https://docs.bytez.com/model-api/playground/overview).

## Status
Check out the status of our [API](https://status.bytez.com)

## Resources
Get to know our story, our mission, and our roadmap [here](https://docs.bytez.com/company/about).

## Feedback
We’re committed to building the best developer experience for AI builders. Have feedback? Let us know on [Discord](https://discord.com/invite/Z723PfCFWf) or open an issue on [GitHub](https://github.com/Bytez-com/docs/issues).
