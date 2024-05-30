# API

## Getting your key
You need a key to use this API. Join the [Bytez Discord](https://discord.gg/Zrd5UbMEBA) and a key will be provisioned to you. If you don't have Discord – or don't want to join Discord - send us an email at team@bytez.com and we'll follow up.

## Endpoints
- [List all models available on Bytez](#list-all-models-available-on-bytez)
- [Check a model's status](#check-a-models-status)
- [Load a model](#load-a-model) 
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
    "model": "openai-community/gpt2",
    "concurrency": 1
}'
```

### Response
```
{"model":"openai-community/gpt2","status":"started","concurrency":1}
```

## Check a model's status

### Request
```
curl --location 'https://api.bytez.com/model/status' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`,
    "model": "openai-community/gpt2"
}'
```

### Response
```
{"model":"openai-community/gpt2","status":"RUNNING","concurrency":1,"inferences":0,"expirationPeriodSeconds":1800,"expirationPeriodMinutes":30,"expiresAt":"2024-05-28T00:12:18.738Z","created":"2024-05-27T23:35:35.863Z","modified":"2024-05-27T23:42:19.239Z"}
```

## Run a model

### Request
```
curl --location 'https://api.bytez.com/model/run' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`,
    "app": false,
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
```
curl --location 'https://api.bytez.com/model/instances' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`
}'
```


## Delete a model prematurely

### Request
```
curl --location 'https://api.bytez.com/model/delete' \
--header 'Content-Type: application/json' \
--data '{
    "key": `API_KEY`
    "model": "openai-community/gpt2"
}'
```


# Available models on Bytez

Here's a list of models available on Bytez with their required RAM.

| Model Name                                               | Required RAM (GB)       
|----------------------------------------------------------|-------------------------|
| EleutherAI/gpt-neo-2.7B                                  | 2.23                    
| Gustavosta/MagicPrompt-Stable-Diffusion                  | 0.94                    
| bigscience/bloom-560m                                    | 3.78                    
| succinctly/text2image-prompt-generator                   | 1.04                    
| ai-forever/mGPT                                          | 9.59                    
| microsoft/phi-1                                          | 9.16                    
| facebook/opt-1.3b                                        | 8.06                    
| openai-community/gpt2                                    | 0.50                    
| roneneldan/TinyStories-8M                                | 0.37                    
| bigscience/bloom-1b7                                     | 7.82                    
| databricks/dolly-v2-3b                                   | 11.09                   
| tiiuae/falcon-40b-instruct                               | 182.21                  
| tiiuae/falcon-7b-instruct                                | 27.28                   
| codellama/CodeLlama-7b-Instruct-hf                       | 26.64                   
| deepseek-ai/deepseek-coder-6.7b-instruct                 | 26.50                   
| upstage/SOLAR-10.7B-Instruct-v1.0                        | 57.63                   
| elyza/ELYZA-japanese-Llama-2-7b-instruct                 | 38.24                   
| NousResearch/Meta-Llama-3-8B-Instruct                    | 30.93                   
| VAGOsolutions/SauerkrautLM-Mixtral-8x7B-Instruct         | 211.17                  
| codellama/CodeLlama-34b-Instruct-hf                      | 186.52                  
| deepseek-ai/deepseek-coder-7b-instruct-v1.5              | 27.05                   
| Equall/Saul-Instruct-v1                                  | 2.44                    
| Equall/Saul-7B-Instruct-v1                               | 10.20                   
| microsoft/Phi-3-mini-128k-instruct                       | 14.66                   
| microsoft/Phi-3-mini-4k-instruct                         | 14.65                   
| victor/CodeLlama-34b-Instruct-hf                         | 127.37                  
| gradientai/Llama-3-8B-Instruct-262k                      | 30.80                   
| gradientai/Llama-3-8B-Instruct-Gradient-1048k            | 30.59                   
| yanolja/EEVE-Korean-Instruct-10.8B-v1.0                  | 54.30                   
| codellama/CodeLlama-13b-Instruct-hf                      | 50.38                   
| deepseek-ai/deepseek-coder-1.3b-instruct                 | 6.16                    
| deepseek-ai/deepseek-coder-33b-instruct                  | 158.74                  
| filipealmeida/Mistral-7B-Instruct-v0.1-sharded           | 27.42                   
| unsloth/llama-3-8b-Instruct                              | 30.77                   
| speakleash/Bielik-7B-Instruct-v0.1                       | 27.52                   
| Deci/DeciLM-7B-instruct                                  | 26.90                   
| tokyotech-llm/Swallow-70b-instruct-hf                    | 242.23                  
| tokyotech-llm/Swallow-7b-NVE-instruct-hf                 | 26.89                   
| vilsonrodrigues/falcon-7b-instruct-sharded               | 0.44                    
| codellama/CodeLlama-70b-Instruct-hf                      | 372.52                  
| togethercomputer/Llama-2-7B-32K-Instruct                 | 25.65                   
| beomi/Llama-3-Open-Ko-8B-Instruct-preview                | 30.81                   
| abhishekchohan/SOLAR-10.7B-Instruct-Forest-DPO-v1        | 15.38                   
| deepseek-ai/deepseek-math-7b-instruct                    | 28.08                   
| occiglot/occiglot-7b-eu5-instruct                        | 28.94                   
| MediaTek-Research/Breeze-7B-Instruct-v1_0                | 29.84                   


## Requesting a model that isn't available
If you don't see a model you want to use, ping us on Discord or via email. We'll do our best to process your request within 24 hours.
