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
  - [Request a Model Not on Huggingface or Bytez](#request-a-model-not-on-huggingface-or-bytez)
- [Examples snippets](#examples-snippets)
  - [Feedback](#feedback)

## Basic Usage

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_BYTEZ_KEY_HERE");

const model = client.model("openai-community/gpt2");

const { output } = await model.run("Once upon a time there was a", {
  // huggingface params
  max_new_tokens: 20,
  min_new_tokens: 5
});

console.log({ output });
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
const { output: models } = await client.list.models();

console.log(models);

// to list models by task
const { output: objectDetectionModels } = await client.list.models({
  task: "object-detection"
});

console.log(objectDetectionModels);
```

## Initialize the Model API

Initialize a model, so you can check its status, load, run, or shut it down.

```js
const model = client.model("openai-community/gpt2");
```

## Run a Model

Run inference.

```js
const { output } = await model.run("Once upon a time there was a");

console.log(output);
```

## Run a Model with HuggingFace Params

Run inference with HuggingFace parameters.

```js
const { output } = await model.run("Once upon a time there was a", {
  max_new_tokens: 20,
  min_new_tokens: 5
});

console.log({ output });
```

## Stream the Response

Note: This is only supported for `text-generation` models.

```js
// assuming browser side
const stream = await model.run("Jack and Jill", { stream: true });
const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
}
```

This sends a job to an automated queue. When the job completes, you'll receive an email indicating the model is ready for use with the models API.

## Request a Model Not on Huggingface or Bytez

Please reach out to us and we'll do what's necessary to make other models available!

Please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)

# Examples snippets

Open our [docs](https://docs.bytez.com/model-api/docs/welcome) for JavaScript snippets.

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](mailto:help@bytez.com)
