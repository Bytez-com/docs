# REST API

## Endpoints

- [List models available](#list-models-available)
- [Request a model](#request-a-model)
- [Load a model](#load-a-model)
- [Check a loaded model's status](#check-a-loaded-models-status)
- [Run a loaded model](#run-a-model)
- [List all running models](#list-all-running-models)
- [Shutdown a loaded model](#shutdown-a-loaded-model)

## Auth

- Your api key should be added to an Authorization header, e.g. Authorization: Key API_KEY

## Parameters

- `model`: (required) the model name
- `concurrency`: (default = 1) for `/load` endpoint
- `prompt`: the prompt to generate a response

# Commands

## List models available

### Request

```bash
curl --location 'https://api.bytez.com/model/list' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json'
```

### Response

```json
[{"name":"EleutherAI/gpt-neo-2.7B","requiredRAM":2.232933128273094,"benchmarked":true},{"name":"Gustavosta/MagicPrompt-Stable-Diffusion","requiredRAM":0.9401917929177755,"benchmarked":true},{"name":"Gustavosta/MagicPrompt-Stable-Diffusion.onnx.8-bit","requiredRAM":null,"benchmarked":false}, ....]
```

## Request a model

Note, this is an automated process. This will queue up our system to make the model available. Behind the scenes we need to compute things such as the amount of VRAM the model takes up when running.

```bash
curl --location 'https://api.bytez.com/model/job' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2"
}'
```

### Response

```json
{
  "model": "openai-community/gpt2",
  "success": true,
  "modified": "2024-06-07T22:28:40.122Z"
}
```

Note, you can check the status of the model by repeating the same call. (See the message prop in the response.)

```bash
curl --location 'https://api.bytez.com/model/job' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2"
}'
```

### Response

```json
{
  "model": "openai-community/gpt2",
  "success": true,
  "message": "Model is already queued",
  "startTime": null,
  "modified": "2024-06-07T22:29:22.333Z"
}
```

When the model is ready, you will get the following response:

### Response

Notice how "message" in the response now says "Model available"

```json
{
  "model": "chavinlo/alpaca-native",
  "success": true,
  "message": "Model available",
  "startTime": "2024-05-30T01:20:37.644Z",
  "endTime": "2024-05-30T01:22:07.804Z",
  "modified": "2024-05-30T01:22:07.804Z"
}
```

## Load a model

### Request

```bash
curl --location 'https://api.bytez.com/model/load' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2",
    "concurrency": 1
}'
```

### Response

```json
{ "model": "openai-community/gpt2", "status": "started", "concurrency": 1 }
```

Note, this endpoint also takes in a param, `expirationPeriodSeconds`, which allows for your instance to expire within 2 minutes after the expirationPeriodSeconds has been reached.

Any time a request is sent to run the model, this expiration period resets. Meaning the instance will continue to run as long as you are making requests to it within the specified expiriation period.

To make an instance expire 5 minutes after the last request it receives, you would do this:

### Request

```bash
curl --location 'https://api.bytez.com/model/load' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2",
    "concurrency": 1,
    "expirationPeriodSeconds": 300
}'
```

## Check a loaded model's status

### Request

```bash
curl --location 'https://api.bytez.com/model/status' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2"
}'
```

### Response

```json
{
  "model": "openai-community/gpt2",
  "status": "RUNNING",
  "concurrency": 1,
  "inferences": 0,
  "expirationPeriodSeconds": 1800,
  "expirationPeriodMinutes": 30,
  "expiresAt": "2024-05-28T00:12:18.738Z",
  "created": "2024-05-27T23:35:35.863Z",
  "modified": "2024-05-27T23:42:19.239Z"
}
```

## Run a model

### Request

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

### Response

```
Once upon a time there was a man upon the throne...But now it is him who must stand up! [...]
```

## List all running models

### Request

```bash
curl --location 'https://api.bytez.com/model/instances' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json'
```

## Shutdown a loaded model

### Request

```bash
curl --location 'https://api.bytez.com/model/delete' \
--header 'Authorization: Key API_KEY' \
--header 'Content-Type: application/json' \
--data '{
    "model": "openai-community/gpt2"
}'
```

## Help us make this better

At Bytez, we want to build the best DX for AI builders. We value your feedback! If you have suggestions for improving our docs, please let us know on [Discord](https://discord.gg/Zrd5UbMEBA) or via team@bytez.com.
