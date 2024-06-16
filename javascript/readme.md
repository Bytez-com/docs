# API Documentation

## Introduction

Welcome to the Bytez API documentation! This API provides access to various machine learning models for serverless operation. Below, you will find examples demonstrating how to interact with the API using our js client library.

## JavaScript Client Library Usage Examples

## Authentication

### Getting Your Key

To use this API, you need an API key. Obtain your key by joining the [Bytez Discord](https://discord.gg/Zrd5UbMEBA). If you prefer not to use Discord, email us at team@bytez.com.

Always include your API key when initializing the client:

```js
import Bytez from "bytez.js";

client = new Bytez("YOUR_API_KEY");
```

### List Available Models

Lists the currently available models, and provides basic information about each one, such as RAM required

```js
models = await client.list.models();

console.log(models);
```

### List Serverless Instances

List your serverless instances

```js
instances = await client.list.instances();

console.log(instances);
```

### Make a Model Serverless

Make a HuggingFace model serverless + available on this API! Running this command queues a job. You'll receive an email when the model is ready.

@param modelId The HuggingFace modelId, for example `openai-community/gpt2`

```js
model_id = "openai-community/gpt2";

job_status = await client.process(model_id);

console.log(job_status);
```

### Get a Model

Get a model, so you can check its status, load, run, or shut it down.

@param modelId The HuggingFace modelId, for example `openai-community/gpt2`

```js
model = client.model("openai-community/gpt2");
```

### Start the model

Convenience method for running model.start(), and then awaiting model to be ready.

@param options Serverless configuration, defaults: { concurrency: 1, timeout: 300 }

```js
await model.load();

console.log(results);

/** Concurrency
 * Number of serverless instances.
 *
 * For example, if you set to `3`, then you can do 3 parallel inferences.
 *
 * If you set to `1`, then you can do 1 inference at a time.
 *
 * Default: `1`
 */
/** Timeout
 * Seconds to wait before serverless instance auto-shuts down.
 *
 * By default, if an instance doesn't receive a request after `300` seconds, then it shuts down.
 *
 * Receiving a request resets this timer.
 *
 * Default: `300`
 */
```

### Check Model Status

Check on the status of the model, to see if its deploying, running, or stopped

```js
status = await model.status();

console.log(status);
```

### Run a Model

Run inference

```js
output = await model.run("Once upon a time there was a");

console.log(output);
```

### Run a Model with HuggingFace params

Run inference with HuggingFace parameters.

```js
output = await model.run("Once upon a time there was a", {
  max_new_tokens: 1,
  min_new_tokens: 1
});

console.log(output);
```

### Stream the response

Streaming text

```js
const stream = await model.run("Jack and Jill", { stream: true });
const textStream = stream.pipeThrough(new TextDecoderStream());

for await (const chunk of textStream) {
  console.log(chunk);
}
```

### Shutdown a Model

Serverless models auto-shutdown, though you can early stop with this method

```js
await model.stop();
```

## Feedback

We value your feedback to improve our documentation and services. If you have any suggestions, please join our [Discord](https://discord.gg/Zrd5UbMEBA) or contact us via email.
