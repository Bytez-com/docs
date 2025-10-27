# API Documentation

- [API Documentation](#api-documentation)
  - [Basic Usage](#basic-usage)
  - [Installation](#installation)
  - [Authentication and Getting Your Key](#authentication-and-getting-your-key)
  - [List Available Models](#list-available-models)
  - [Initialize the Model API](#initialize-the-model-api)
  - [Run a Model](#run-a-model)
  - [Run a Model with HuggingFace Params](#run-a-model-with-huggingface-params)
  - [Stream the Response](#stream-the-response)
  - [Request a Huggingface Model Not Yet on Bytez](#request-a-huggingface-model-not-yet-on-bytez)
  - [Request a Model Not on Huggingface or Bytez](#request-a-model-not-on-huggingface-or-bytez)
- [Examples snippets](#examples-snippets)
  - [Feedback](#feedback)

## Basic Usage

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

input_text = "Once upon a time there was a beautiful home where"

model_params = {"max_new_tokens": 20, "max_new_tokens": 5, "temperature": 0.5}

result = model.run(input_text, model_params=model_params)

print(result.output)

# Access other properties of the result
error = result.error  # Will be None if no error
provider = result.provider  # if a closed source model, the raw output
```

Streaming usage (only text-generation models support streaming currently)

```py
from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Qwen/Qwen2-7B-Instruct")

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
result = client.list.models()

print(result.output)

# To list models by task
result = client.list.models({ "task": "object-detection"})

print(result.output)
```

## Initialize the Model API

Initialize a model, so you can check its status, load, run, or shut it down.

```py
model = client.model("openai-community/gpt2")
```

## Run a Model

Run inference.

```py
result = model.run("Once upon a time there was a")

print(result.output)
# Access error if needed
if result.error:
    print(f"Error occurred: {result.error}")
# Access provider information
print(f"Provider: {result.provider}")
```

## Run a Model with HuggingFace Params

Run inference with HuggingFace parameters.

```py
input_text = "Once upon a time there was a small little man who"

model_params = {"max_new_tokens": 20, "temperature": 2}

result = model.run(input_text, model_params=model_params)

print(result.output)
# Access error if needed
if result.error:
    print(f"Error occurred: {result.error}")
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

# Examples snippets

Open our [docs](https://docs.bytez.com/model-api/docs/welcome) for Python snippets.

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
