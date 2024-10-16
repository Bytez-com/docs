# API Documentation

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
- [Feedback](#feedback)


Basic usage
```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const model_id = "openai-community/gpt2";

const model = client.model("openai-community/gpt2");

await model.load();

const output = await model.run("Once upon a time there was a", {
// huggingface params
  max_new_tokens: 1,
  min_new_tokens: 1
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

`npm i bytez.js`

## Authentication and Getting Your Key

To use this API, you need an API key. Obtain your key by visitng the settings page -> [Bytez Settings Page](https://bytez.com/settings).

![image](https://github.com/user-attachments/assets/884b92b1-021a-4aa4-a150-312ae89f80d0)

To then use it in code:
```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");
```

## List Available Models

Lists the currently available models, and provides basic information about each one, such as the RAM required to run an instance.

```js
import Bytez from "bytez.js";

const client = new Bytez("YOUR_API_KEY");

const models = await client.list.models();

console.log(models);
```

## Initialize the model api

Initialize a model, so you can check its status, load, run, or shut it down

```js
const model = client.model("openai-community/gpt2");
```

## Load a model

Convenience method for `model.start()`. Automatically waits for the instance to become ready before resolving.

Progress is printed as it executes.

```js
await model.load();
```

The options argument is *optional* and has two properties, concurrency, and timeout.
```js
await model.load({
  concurrency: 1,
  timeout: 300
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

Check on the status of the model, to see if its deploying, running, or stopped.

```js
const status = await model.status();

console.log(status);
```

## Run a Model

Run inference

```js
const output = await model.run("Once upon a time there was a");

console.log(output);
```

## Run a Model with HuggingFace params

Run inference with HuggingFace parameters

```js
const output = await model.run("Once upon a time there was a", {
  max_new_tokens: 1,
  min_new_tokens: 1
});

console.log(output);
```

## Stream the response

Note, this is only supported for text-generation

```js
const stream = await model.run("Jack and Jill", { stream: true });
const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
}
```

## Shutdown a Model

By default, models will shutdown based on their timeout (seconds) when loaded via `model.start()` or `model.load`

To shutdown and save costs early, run the following:

```js
await model.stop();
```

## List Your Running Instances

```js
const instances = await client.list.instances();

console.log(instances);
```

## Request a Huggingface model not yet on Bytez

To request a model that exists on Huggingface, but does not yet on bytez, you can do the following:

```js
const model_id = "openai-community/gpt2";

const job_status = await client.process(model_id);

console.log(job_status);
```

This sends a job to an automated queue. When the job completes, you'll receive an email indicating the model is ready for use with the models api.

## Request a model not on Huggingface or Bytez

Please reach out to us and we'll do what's necessary to make other models available!

Please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](help@bytez.com)

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email at [help@bytez.com](help@bytez.com)
