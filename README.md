<div align="center">
 <img alt="bytez" height="250px" src="https://github.com/Bytez-com/docs/assets/9612780/610ae3a1-65b5-4f8a-8ed5-0bae9134ab5f">

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/Zrd5UbMEBA)](https://discord.com/invite/Z723PfCFWf) 
[![](https://img.shields.io/badge/Bytez-000000?style=for-the-badge&logo=x&=logoColor=white)](https://x.com/Bytez)
[![Discord](https://img.shields.io/discord/844731722700816395)](https://discord.com/invite/Z723PfCFWf) 
[![NPM Version](https://img.shields.io/npm/v/bytez.js)](https://www.npmjs.com/package/bytez.js)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1oZ4_yQoryL9a3CCLiY29JpEI1L5uwqO-?authuser=1#scrollTo=3LRTz2egUNh7&uniqifier=3)

</div>

# ✨ Bytez

Access 33,000+ AI models across 33 tasks, including text, image, audio generation, and chat. The Bytez API has a standard protocol for open-source and closed-source models – delivering GPU performance at CPU pricing. 

# Table of Contents
- [Quickstart](#quickstart)
  - [Get an API Key](#get-an-api-key)
  - [Model Playground](#bytez-model-playground)	
  - [API Playground](#api-playground)
- [Basic Usage](#basic-usage)
  - [Python](#-python)
  - [Javascript](#-javascript)
  - [Julia](#julia)
  - [REST API](#rest-api)
    - [Generate Text from Text-Only Input](#generate-text-from-text-only-input)
    - [Generate Images](#generate-images)
    - [Generate Audio from Text](#generate-audio-from-text)
    - [Interactive Chat](#interactive-chat)
    - [Useful Functions](#useful-functions)
  - [Docker](#docker)
    - [Image Source Code](#image-source-code)
- [Supported Tasks & Models](#model-library)
  - [Open Source Models](#open-source-models)
  - [Closed Source Providers](#closed-source-providers)
- [Resources](#resources)
- [Feedback](#feedback)

# Quickstart
Two steps to run inference in seconds:

1. Get your API Key by visiting the [Bytez Settings Page](https://bytez.com/settings)
    
2. Choose how you want to perform inference with Bytez:

  - Use the [Bytez Model Playground](https://bytez.com/models) on [bytez.com](https://bytez.com) (Great for exploring and trying models)

  - Install a client library:
    - [javascript](https://github.com/Bytez-com/docs/tree/main/javascript)
    - [python](https://github.com/Bytez-com/docs/tree/main/python)
    - [julia](https://github.com/Bytez-com/docs/tree/main/julia/Bytez)
    - Hit the [REST API](#rest-api) directly
    - Run inference locally via [Docker](#docker)
 
## Get an API Key
To use this API, you need an API key. Obtain your key by visiting the settings page [Bytez Settings Page](https://bytez.com/settings)

![Bytez Settings Page](https://github.com/user-attachments/assets/884b92b1-021a-4aa4-a150-312ae89f80d0)

To then use it in code (python example):

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")
```

All users are provided with 100 credits worth of free compute per month!

## Bytez Model Playground
You can play with models without having to write any code by visiting [Bytez](https://bytez.com/models)
![image](https://github.com/user-attachments/assets/6aa2335d-9f31-43ea-99d2-34891eac808e)

Models can also be explored:
![image](https://github.com/user-attachments/assets/623f1808-5d0f-4d74-9864-6106444f6311)

## API Playground
We've set up a [public sandbox in Postman to demo our API](https://www.postman.com/bytez-api/v2/overview). 

| Category                           | Description                                                                                              |
|------------------------------------|----------------------------------------------------------------------------------------------------------|
| **[Closed Source](https://www.postman.com/bytez-api/v2/collection/81i1xjy/closed-source)**         | Examples for using closed-source models from leading providers (Anthropic, OpenAI, Cohere and more!)                                          |
| **[Open Source](https://www.postman.com/bytez-api/v2/collection/kpuvtya/open-source)**      | Examples demonstrating how to use HTTP requests to interact with 23k+ open-source models on the platform.   |
| **[Open Source - Image as Input](https://www.postman.com/bytez-api/v2/collection/v7r0059/open-source-examples-image-as-input)**     | Examples using images as input across various tasks, including classification and segmentation.       |
| **[Open Source - Messages as Input](https://www.postman.com/bytez-api/v2/collection/3kumojr/open-source-examples-messages-as-input)**  | Examples using messages as input, ideal for chat-based applications and sentiment analysis.           |
| **[Open Source - Text as Input](https://www.postman.com/bytez-api/v2/collection/9ahlkt9/open-source-examples-text-as-input)**      | Examples for handling text input, such as summarization, translation, and general NLP tasks.          |
| **[Open Source - Multi-Input](https://www.postman.com/bytez-api/v2/collection/fm920bu/open-source-examples-multi-input)**        | Examples that handle multiple types of input simultaneously, such as text and images.                 |
| **[Useful Functions & Model Library](https://www.postman.com/bytez-api/v2/collection/71imd9f/useful-functions-model-library)**          | Explore utility functions to list models by task, clusters, and more for streamlined model selection. |


# Basic Usage

## <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" height=15 /> Python
Load and run a model after installing our python library (`pip install bytez`). 

Full documentation can be found [here](./python/README.md).

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1oZ4_yQoryL9a3CCLiY29JpEI1L5uwqO-?authuser=1#scrollTo=3LRTz2egUNh7&uniqifier=3)

Below is the basic usage for the python client library. See [Libraries](#libraries) for javascript and julia examples.

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 20, "min_new_tokens": 5, "temperature": 0.5}

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

model_params = {"max_new_tokens": 20, "min_new_tokens": 5, "temperature": 0.5}

stream = model.run(
    input_text,
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
```

See the [API Documentation](./python/README.md) for all examples.

## <img src="https://cdn-icons-png.flaticon.com/512/5968/5968322.png" height=15 /> Javascript
Load and run a model after installing our Typescript library (`npm i bytez.js`).

Full documentation can be found [here](./javascript/README.md).

### Load and run a model (javascript)
```js
import Bytez from "bytez.js";

client = new Bytez("YOUR_BYTEZ_KEY_HERE");

// Grab a model
model = client.model("openai-community/gpt2");

// Start a model
await model.load();

// Run a model
const output = await model.run("Once upon a time there was a", {
// huggingface params
  max_new_tokens: 20,
  min_new_tokens: 5
});

console.log(output);
```

See [API Documentation](./javascript/README.md) for all examples.

## Julia
Load and run a model after installing our Bytez library (`add Bytez`).

Full documentation can be found [here](./julia/Bytez/README.md).

<img src="https://cdn.jsdelivr.net/gh/fonsp/Pluto.jl@0.15.1/frontend/img/logo.svg" height=15 /> <b>[Interactive Notebook!](#)</b> <i>(Coming Soon)</i>

### Load and run a model (julia)
```julia
using Bytez

client = Bytez.init("YOUR_BYTEZ_KEY_HERE");

# Grab a model
model = client.model("openai-community/gpt2")

# Start a model
model.load()

# Run a model
options = Dict(
	"params" => Dict(
		"max_new_tokens" => 20,
		"min_new_tokens" => 5,
		"temperature" => 0.5,
	)
)

output = model.run(input_text, options)

println(output)

```

## <img src="https://www.svgrepo.com/show/305922/curl.svg" height=15 />REST API

### Generate Text from Text-Only Input
The simplest way to generate text using the Bytez API is to send a single text-only input:
```bash
curl --location 'https://api.bytez.com/models/v2/openai-community/gpt2' \
--header 'Authorization: Key BYTEZ_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "text": "Once upon a time, there was a magical forest."
}'

```
This zero-shot approach provides the model with a basic prompt. You can refine your output using one-shot or few-shot techniques.

### Generate Images
Generate images from text prompts. Below is an example using Stable Diffusion:

```bash
curl --location 'https://api.bytez.com/models/v2/stabilityai/stable-diffusion-xl-base-1.0' \
--header 'Authorization: Key BYTEZ_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "text": "A serene lake surrounded by mountains during sunset."
}'

```
For advanced use cases, provide additional parameters to adjust style, resolution, or other attributes.

### Generate Audio from Text
Convert text into audio:
```bash
curl --location 'https://api.bytez.com/models/v2/facebook/mms-tts-eng' \
--header 'Authorization: Key BYTEZ_API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "text": "Welcome to the future of AI-powered audio synthesis!"
}'
```
The API returns a downloadable audio file corresponding to your input text.

### Interactive Chat

You can build interactive chat experiences by sending structured inputs and receiving model responses:
```bash
curl --location 'localhost:8080/models/v2/Qwen/Qwen2-7B-Instruct' \
--header 'Authorization: Key BYTEZ_API_KEY' \
--data '{
    "messages": [
        {
            "role": "system",
            "content": "You'\''re a helpful assistant"
        },
        {
            "role": "user",
            "content": "Can you generate code?"
        }
    ]
}'
```
### Useful Functions

#### List All Models
```bash
curl --location 'https://api.bytez.com/models/v2/list/models' \
--header 'Authorization: Key BYTEZ_API_KEY'
```
#### List All Tasks
```bash
curl --location 'https://api.bytez.com/models/v2/list/tasks' \
--header 'Authorization: Key BYTEZ_API_KEY'
```
#### List All Models by Task
```bash
curl --location 'https://api.bytez.com/models/v2/list/models?task=chat' \
--header 'Authorization: Key BYTEZ_API_KEY'
```
#### List Clusters
```bash
curl --location 'https://api.bytez.com/models/v2/list/clusters' \
--header 'Authorization: Key BYTEZ_API_KEY'
```

See the [API Documentation](./api.md) for all endpoints.

# Docker 
All Bytez model images are available on [Docker Hub](https://hub.docker.com/u/bytez), models can be played with via our [Models](https://bytez.com/models) page 🤙

## Image Source Code
The source code that runs for a given model in the docker image can be found [here](https://github.com/Bytez-com/models)

# Model Library

## Open Source Models

We currently support 30K+ open source AI models across 30+ ML tasks. 

| Task   | Total Models    
|------------|-----|                               
| Available models| 39428
| Chat| 2402
| Text-generation| 6450
| Summarization| 847
| Unconditional-image-generation| 766
| Image-classification| 2957
| Text-classification| 3082
| Audio-classification| 1949
| Object-detection| 664
| Token-classification| 2070
| Text2text-generation|1764
| Text-to-image| 1539
| Sentence-similarity| 1731
| Feature-extraction| 1737
| Translation| 1258
| Automatic-speech-recognition| 3319
| Zero-shot-classification| 222
| Question-answering| 1967
| Video-classification| 926
| Fill-mask| 1760
| Depth-estimation| 69
| Image-segmentation| 425
| Image-to-text| 281
| Zero-shot-image-classification| 202
| Image-feature-extraction| 131
| Visual-question-answering| 117
| Mask-generation| 80
| Zero-shot-object-detection| 27
| Text-to-video| 11
| Text-to-speech| 644
| Image-text-to-text| 1
| Document-question-answering| 19
| Text-to-audio| 11

Here's a sample of some models that can be run - with their required RAM.

| Model Name                                               | Required RAM (GB)       
|----------------------------------------------------------|-------------------------|
| EleutherAI/gpt-neo-2.7B                                  | 2.23                                       
| bigscience/bloom-560m                                    | 3.78                    
| succinctly/text2image-prompt-generator                   | 1.04                    
| ai-forever/mGPT                                          | 9.59                    
| microsoft/phi-1                                          | 9.16                    
| facebook/opt-1.3b                                        | 8.06                                   
| tiiuae/falcon-40b-instruct                               | 182.21                  
| tiiuae/falcon-7b-instruct                                | 27.28                   
| codellama/CodeLlama-7b-Instruct-hf                       | 26.64                   
| deepseek-ai/deepseek-coder-6.7b-instruct                 | 26.50                   
| upstage/SOLAR-10.7B-Instruct-v1.0                        | 57.63                    
| NousResearch/Meta-Llama-3-8B-Instruct                    | 30.93                                                                     
| codellama/CodeLlama-70b-Instruct-hf                      | 372.52           

To see the full list, run:
```py
models = client.list_models()
print(models)
```

To see a task specific list, run:

```py
models = client.list_models(task="text-generation")
print(models)
```

## Closed Source Providers

We currently support the major CS providers. 

| Model Provider   | Status     
|-------------|-----|
| Open AI  | ✅                                       
| Google Gemini | ✅                   
| Cohere | ✅                    
| Mistral | ✅                    
| Anthropic | ✅ 

### Usage

To use models like OpenAI’s GPT-4, simply include your Provider-Key in your request. The Bytez API handles everything with a consistent schema:

```bash
curl --location 'https://api.bytez.com/models/v2/openai/gpt-4o-mini' \
--header 'Authorization: Key BYTEZ_KEY_' \
--header 'Provider-Key: PROVIDER_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "messages":[{"role":"user", "content":"Hello my name is Bob and I like to eat"}],
    "stream":false,
    "params":{ "max_tokens":100 }
}'
```

# Resources
- [About Us](./about.md)
- [Cold Boot Times and Billing](./cold-boot-billing.md)

# Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
