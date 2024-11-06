<div align="center">
 <img alt="bytez" height="250px" src="https://github.com/Bytez-com/docs/assets/9612780/610ae3a1-65b5-4f8a-8ed5-0bae9134ab5f">

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/Zrd5UbMEBA)](https://discord.com/invite/Z723PfCFWf) 
[![](https://img.shields.io/badge/Bytez-000000?style=for-the-badge&logo=x&=logoColor=white)](https://x.com/Bytez)
[![Discord](https://img.shields.io/discord/844731722700816395)](https://discord.com/invite/Z723PfCFWf) 
[![NPM Version](https://img.shields.io/npm/v/bytez.js)](https://www.npmjs.com/package/bytez.js)
[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1oZ4_yQoryL9a3CCLiY29JpEI1L5uwqO-?authuser=1#scrollTo=3LRTz2egUNh7&uniqifier=3)

</div>

# ✨ Bytez

Evaluate and run large AI models easily and affordably with Bytez, treating models as functions – achieve GPU performance at CPU pricing.

# Table of Contents
- [Basic Usage](#basic-usage)
- [Libraries](#libraries)
    - [Python](./python/readme.md)
    - [Javascript](./javascript/readme.md)
    - [Julia](./julia/Bytez/readme.md)
- [Quickstart](#quickstart)
  - [Get an API Key](#get-an-api-key)
  - [Bytez Model Playground](#bytez-model-playground)
  - [Library Examples](#library-examples)
    - [Python](#-python)
    - [Javascript](#-javascript)
    - [Julia](#-julia)
  - [REST API](#-rest-api)
    - [Load a model](#load-a-model)
    - [Run a model](#run-a-model)
    - [Request a model](#request-a-model)
  - [Docker](#docker)
    - [Image Source Code](#image-source-code)
- [Model Library](#model-library)
- [Resources](#resources)
- [Feedback](#feedback)

# Basic Usage
Below is the basic usage for the python client library. See [Libraries](#libraries) for javascript and julia examples.

```py
from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 500, "min_new_tokens": 50, "temperature": 0.5}

result = model.run(input_text, model_params=model_params)

output = result["output"]

generated_text = output[0]["generated_text"]

print(generated_text)
```

Streaming usage (only text-generation models support streaming currently)

```py
from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

model.load()

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 500, "min_new_tokens": 50, "temperature": 0.5}

stream = model.run(
    input_text,
    stream=True,
    model_params=model_params,
)

for chunk in stream:
    print(f"Output: {chunk}")
```

# Libraries
Each link below has a quickstart and detailed examples for all supported ML tasks for a given client
- [Python](./python/readme.md)
- [Javascript](./javascript/readme.md)
- [Julia](./julia/Bytez/readme.md)

# Quickstart
Two steps to run inference in minutes:
- Get your API Key
  - Obtain your key by visiting the settings page -> [Bytez Settings Page](https://bytez.com/settings).
  - All users are provided with $1 worth of free compute per month!
- Choose your path:
  - Use the [Bytez Model Playground](https://bytez.com/models) on [bytez.com](httpss://bytez.com) (To get started with exploration)
  - Install a client library:
    - [javascript](https://github.com/Bytez-com/docs/tree/main/javascript)
    - [python](https://github.com/Bytez-com/docs/tree/main/python)
    - [julia](https://github.com/Bytez-com/docs/tree/main/julia/Bytez)
   - Directly hit the REST API
   - Run inference locally via Docker
 
## Get an API Key
To use this API, you need an API key. Obtain your key by visiting the settings page -> [Bytez Settings Page](https://bytez.com/settings).

![Bytez Settings Page](https://github.com/user-attachments/assets/884b92b1-021a-4aa4-a150-312ae89f80d0)

To then use it in code (python example):

```py
from bytez import Bytez

client = Bytez("YOUR BYTEZ KEY HERE")
```

## Bytez Model Playground
You can play with models without having to write any code by visiting [Bytez](https://bytez.com/models)
![image](https://github.com/user-attachments/assets/6aa2335d-9f31-43ea-99d2-34891eac808e)

Models can also be explored:
![image](https://github.com/user-attachments/assets/623f1808-5d0f-4d74-9864-6106444f6311)

## Library Examples

### <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Python-logo-notext.svg/1869px-Python-logo-notext.svg.png" height=15 /> Python
Load and run a model after installing our python library (`pip install bytez`).

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/drive/1oZ4_yQoryL9a3CCLiY29JpEI1L5uwqO-?authuser=1#scrollTo=3LRTz2egUNh7&uniqifier=3)

#### Load and run a model (python)
```py
import os
from bytez import Bytez

client = Bytez("YOUR_API_KEY")

# Initalize a model
model = client.model('openai-community/gpt2')

# Start a model
model.load()

# Run a model
output = model.run("Once upon a time there was a", model_params={"max_new_tokens":1,"min_new_tokens":1})
print(output)
```

See the [API Documentation](./python/readme.md) for all examples.

### <img src="https://cdn-icons-png.flaticon.com/512/5968/5968322.png" height=15 /> Javascript
Load and run a model after installing our Typescript library (`npm i bytez.js`).
#### Load and run a model (javascript)
```js
import Bytez from "bytez.js";

client = new Bytez("YOUR_API_KEY");

// Grab a model
model = client.model("openai-community/gpt2");

// Start a model
await model.load();

console.log(results);

// Run a model
output = await model.run("Once upon a time there was a");

console.log(output);
```

See [API Documentation](./javascript/readme.md) for all examples.

### <img src="https://upload.wikimedia.org/wikipedia/commons/1/1f/Julia_Programming_Language_Logo.svg" height=15 />Julia
Load and run a model after installing our Bytez library (`add Bytez`).

<img src="https://cdn.jsdelivr.net/gh/fonsp/Pluto.jl@0.15.1/frontend/img/logo.svg" height=15 /> <b>[Interactive Notebook!](#)</b> <i>(Coming Soon)</i>

#### Load and run a model (julia)
```julia
using Bytez
client = Bytez.init("YOUR_API_KEY");

# Grab a model
# args => modelId, concurrency = 1, timeout = 300 secs
model = client.model("openai-community/gpt2")

# Start a model
model.load()

# Run a model
output = model.run("Roses are")
println(output)

```

## <img src="https://www.svgrepo.com/show/305922/curl.svg" height=15 /> REST API

Bytez has a REST API for loading, running, and requesting new models.

### Load a model
```bash
curl --location 'https://api.bytez.com/model/load' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2",
    "concurrency": 1
}'
```

### Run a model
```bash
curl --location 'https://api.bytez.com/model/run' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2",
    "prompt": "Once upon a time there was a",
    "params": {
        "min_length": 30,
        "max_length": 256
    },
    "stream": true
}'
```

### Request a model 
```bash
curl --location 'https://api.bytez.com/model/job' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2"
}'
```

See the [API Documentation](./api.md) for all endpoints.

# Docker 
All Bytez model images are available on [Docker Hub](https://hub.docker.com/u/bytez), models can be played with via our [Models](https://bytez.com/models) page 🤙

## Image Source Code
The source code that runs for a given model in the docker image can be found [here](https://github.com/Bytez-com/models)

# Model Library

We currently support 20K+ open source AI models across 30+ ML tasks. 

| Task   | Total Models    
|------------|-----|                               
| Total Available  | 14559
| Text-generation | 5765
| Summarization | 380
| Unconditional-image-generation | 416
| Text2text-generation | 393
| Audio-classification | 390
| Image-classification | 533
| Zero-shot-classification | 213
| Token-classification | 546
| Video-classification | 419
| Text-classification | 474
| Fill-mask | 358
| Text-to-image | 467
| Depth-estimation | 53
| Object-detection | 405
| Sentence-similarity | 457
| Image-segmentation | 322
| Image-to-text | 249
| Zero-shot-image-classification | 174
| Translation | 592
| Automatic-speech-recognition | 455
| Question-answering | 563
| Image-feature-extraction | 114
| Visual-question-answering | 105
| Feature-extraction | 399
| Mask-generation | 77
| Zero-shot-object-detection | 27
| Text-to-video | 11
| Text-to-speech | 173
| Document-question-answering | 18
| Text-to-audio | 11

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
| elyza/ELYZA-japanese-Llama-2-7b-instruct                 | 38.24                   
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

# Resources
- [About Us](./about.md)
- [Cold Boot Times and Billing](./cold-boot-billing.md)

# Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
