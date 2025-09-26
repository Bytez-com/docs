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
