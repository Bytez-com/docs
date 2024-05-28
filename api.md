# API

## Getting your key
You need a key to use this API. Join the [Bytez Discord](https://discord.gg/Zrd5UbMEBA) and a key will be provisioned to you. If you don't have Discord – or don't want to join Discord - send us an email at team@bytez.com and we'll follow up.

## Endpoints
- [List all models vailable on Bytez](#list-all-models-available-on-Bytez)
- [Check a model status](#check-a-model-status)
- [Load a mode](#load-a-model) 
- [Run a model](#run-a-model)
- [List all running models](#list-all-running-models)
- [Delete a model prematurely](#delete-a-model-prematurely)

## Parameters
- `model`: (required) the model name
- `key`: (required) your API key
- `concurrency`: (required) for `/load` endpoint 
- `prompt`: the prompt to generate a response


# Commands

## List all models available on Bytez

### Request
```
curl --location 'https://api.bytez.com/model/list' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`
}'
```
### Response
```
[{"name":"EleutherAI/gpt-neo-2.7B","requiredRAM":2.232933128273094,"benchmarked":true},{"name":"Gustavosta/MagicPrompt-Stable-Diffusion","requiredRAM":0.9401917929177755,"benchmarked":true},{"name":"Gustavosta/MagicPrompt-Stable-Diffusion.onnx.8-bit","requiredRAM":null,"benchmarked":false}, .... 
```
## Load a model

### Request
```
curl --location 'https://api.bytez.com/model/load' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`,
    "modelId": "openai-community/gpt2",
    "concurrency": 1
}'
```

### Response
```
{"modelId":"openai-community/gpt2","status":"started","concurrency":1}
```

## Check a model status

### Request
```
curl --location 'https://api.bytez.com/model/status' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`,
    "modelId": "openai-community/gpt2"
}'
```

### Response
```
{"modelId":"openai-community/gpt2","status":"RUNNING","concurrency":1,"inferences":0,"expirationPeriodSeconds":1800,"expirationPeriodMinutes":30,"expiresAt":"2024-05-28T00:12:18.738Z","created":"2024-05-27T23:35:35.863Z","modified":"2024-05-27T23:42:19.239Z"}
```

## Run a model

### Request
```
curl --location 'https://api.bytez.com/model/run' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`,
    "app": false,
    "modelId": "openai-community/gpt2",
    "text": "Once upon a time there was a",
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
```
curl --location 'https://api.bytez.com/model/instances' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`
}'
```


## Delete a model

### Request
```
curl --location 'https://api.bytez.com/model/delete' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`
    "modelId": "openai-community/gpt2"
}'
```


# Available models on Bytez

Here's a list of models available on Bytez with their required RAM and benchmark status:

| Model Name                                               | Required RAM (GB)       | Benchmarked |
|----------------------------------------------------------|-------------------------|-------------|
| EleutherAI/gpt-neo-2.7B                                  | 2.23                    | Yes         |
| Gustavosta/MagicPrompt-Stable-Diffusion                  | 0.94                    | Yes         |
| Gustavosta/MagicPrompt-Stable-Diffusion.onnx.8-bit       | N/A                     | No          |
| Gustavosta/MagicPrompt-Stable-Diffusion.onnx.32-bit      | N/A                     | No          |
| bigscience/bloom-560m                                    | 3.78                    | Yes         |
| succinctly/text2image-prompt-generator                   | 1.04                    | Yes         |
| succinctly/text2image-prompt-generator.onnx.8-bit        | N/A                     | No          |
| succinctly/text2image-prompt-generator.onnx.32-bit       | N/A                     | No          |
| ai-forever/mGPT                                          | 9.59                    | Yes         |
| ai-forever/mGPT.onnx.8-bit                               | N/A                     | No          |
| microsoft/phi-1                                          | 9.16                    | Yes         |
| microsoft/phi-1.onnx.8-bit                               | N/A                     | No          |
| facebook/opt-1.3b                                        | 8.06                    | Yes         |
| facebook/opt-1.3b.onnx.8-bit                             | N/A                     | No          |
| princeton-nlp/Sheared-LLaMA-1.3B                         | N/A                     | No          |
| princeton-nlp/Sheared-LLaMA-1.3B.onnx.8-bit              | N/A                     | No          |
| EleutherAI/pythia-1b                                     | N/A                     | No          |
| EleutherAI/pythia-1b.onnx.8-bit                          | N/A                     | No          |
| EleutherAI/gpt-neo-1.3B                                  | N/A                     | No          |
| openai-community/gpt2-medium                             | N/A                     | No          |
| openai-community/gpt2                                    | 0.50                    | Yes         |
| openai-community/gpt2.onnx.8-bit                         | N/A                     | No          |
| openai-community/gpt2.onnx.32-bit                        | N/A                     | No          |
| roneneldan/TinyStories-8M                                | 0.37                    | Yes         |
| openai-community/gpt2                                    | N/A                     | No          |
| bigscience/bloom-1b7                                     | 7.82                    | Yes         |
| databricks/dolly-v2-3b                                   | 11.09                   | Yes         |
| tiiuae/falcon-40b-instruct                               | 182.21                  | Yes         |
| tiiuae/falcon-7b-instruct                                | 27.28                   | Yes         |
| codellama/CodeLlama-7b-Instruct-hf                       | 26.64                   | Yes         |
| deepseek-ai/deepseek-coder-6.7b-instruct                 | 26.50                   | Yes         |
| upstage/SOLAR-10.7B-Instruct-v1.0                        | 57.63                   | Yes         |
| elyza/ELYZA-japanese-Llama-2-7b-instruct                 | 38.24                   | Yes         |
| NousResearch/Meta-Llama-3-8B-Instruct                    | 30.93                   | Yes         |
| VAGOsolutions/SauerkrautLM-Mixtral-8x7B-Instruct         | 211.17                  | Yes         |
| codellama/CodeLlama-34b-Instruct-hf                      | 186.52                  | Yes         |
| deepseek-ai/deepseek-coder-7b-instruct-v1.5              | 27.05                   | Yes         |
| Equall/Saul-Instruct-v1                                  | 2.44                    | Yes         |
| Equall/Saul-7B-Instruct-v1                               | 10.20                   | Yes         |
| microsoft/Phi-3-mini-128k-instruct                       | 14.66                   | Yes         |
| microsoft/Phi-3-mini-4k-instruct                         | 14.65                   | Yes         |
| victor/CodeLlama-34b-Instruct-hf                         | 127.37                  | Yes         |
| gradientai/Llama-3-8B-Instruct-262k                      | 30.80                   | Yes         |
| gradientai/Llama-3-8B-Instruct-Gradient-1048k            | 30.59                   | Yes         |
| yanolja/EEVE-Korean-Instruct-10.8B-v1.0                  | 54.30                   | Yes         |
| codellama/CodeLlama-13b-Instruct-hf                      | 50.38                   | Yes         |
| deepseek-ai/deepseek-coder-1.3b-instruct                 | 6.16                    | Yes         |
| deepseek-ai/deepseek-coder-33b-instruct                  | 158.74                  | Yes         |
| filipealmeida/Mistral-7B-Instruct-v0.1-sharded           | 27.42                   | Yes         |
| unsloth/llama-3-8b-Instruct                              | 30.77                   | Yes         |
| speakleash/Bielik-7B-Instruct-v0.1                       | 27.52                   | Yes         |
| Deci/DeciLM-7B-instruct                                  | 26.90                   | Yes         |
| tokyotech-llm/Swallow-70b-instruct-hf                    | 242.23                  | Yes         |
| tokyotech-llm/Swallow-7b-NVE-instruct-hf                 | 26.89                   | Yes         |
| vilsonrodrigues/falcon-7b-instruct-sharded               | 0.44                    | Yes         |
| codellama/CodeLlama-70b-Instruct-hf                      | 372.52                  | Yes         |
| togethercomputer/Llama-2-7B-32K-Instruct                 | 25.65                   | Yes         |
| beomi/Llama-3-Open-Ko-8B-Instruct-preview                | 30.81                   | Yes         |
| abhishekchohan/SOLAR-10.7B-Instruct-Forest-DPO-v1        | 15.38                   | Yes         |
| deepseek-ai/deepseek-math-7b-instruct                    | 28.08                   | Yes         |
| occiglot/occiglot-7b-eu5-instruct                        | 28.94                   | Yes         |
| MediaTek-Research/Breeze-7B-Instruct-v1_0                | 29.84                   | Yes         |


## Requesting a model that isn't available
If you don't see a model you want to use, ping us on Discord or via email. We'll do our best to process your request within 24 hours.