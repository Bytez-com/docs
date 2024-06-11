# API Documentation

## Intro
Welcome to the Bytez API docs! This API gives you access to various models for your machine learning needs. Please review the info on boot times, billing, and other advanced details.

## Getting your key
You need a key to use this API. Join the [Bytez Discord](https://discord.gg/Zrd5UbMEBA) to get your key. If you don't have Discord – or don't want to join Discord - send us an email at team@bytez.com and we'll follow up.

## Boot Times and Billing
### Cold Boot Times
Models have a cold boot time. This is the time it takes for a model's compute resources to be provisioned, as well as for the model to be downloaded and loaded into memory. You can expect the time to make a model ready for inference to take somehwere between 12 to 15 minutes. On average our smallest model takes 12 minutes to be ready for inference, and our largest, 15 minutes. We're optimizing this to bring cold boot times down to < 5 minutes.

### Billing 
At a minimum, you will be charged for the first 60 seconds of use. Any usage beyond 60 seconds is rounded up to the nearest minute of usage. We currently charge $0.0000166667 / GB sec for inference on GPUs.

Instance spin down is not instaneous and may take longer than 1 minute from the instance expiring to it actually shutting down. 

Shutdowns should occur within 2 minutes of the specified expiration period for a model instance. The default expiration period is 30 minutes. See [Load a model](#load-a-model) for more details on how to set your expiration period.

Shutting down a model via the [Shutdown a loaded model](#shutdown-a-loaded-model) endpoint is near instantaneous.

## Endpoints
- [List models available](#list-models-available)
- [Request a model](#request-a-model)
- [Load a model](#load-a-model) 
- [Check a loaded model's status](#check-a-loaded-models-status)
- [Run a loaded model](#run-a-model)
- [List all running models](#list-all-running-models)
- [Shutdown a loaded model](#shutdown-a-loaded-model)

## Parameters
- `model`: (required) the model name
- `key`: (required) your API key
- `concurrency`: (required) for `/load` endpoint 
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
{"model":"openai-community/gpt2","success":true,"modified":"2024-06-07T22:28:40.122Z"}
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
{"model":"openai-community/gpt2","success":true,"message":"Model is already queued","startTime":null,"modified":"2024-06-07T22:29:22.333Z"}
```

When the model is ready, you will get the following response:

### Response

Notice how "message" in the response now says "Model available"

```json
{"model":"chavinlo/alpaca-native","success":true,"message":"Model available","startTime":"2024-05-30T01:20:37.644Z","endTime":"2024-05-30T01:22:07.804Z","modified":"2024-05-30T01:22:07.804Z"}
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
{"model":"openai-community/gpt2","status":"started","concurrency":1}
```

Note, this endpoint can also take in the param `expirationPeriodSeconds` which will allow for your instance to expire within 2 minutes after expirationPeriodSeconds has been set.

e.g. to make an instance expire 5 minutes after the last request it receives, you would do this:

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


Any time a request is sent to run the model, this expiration period resets. Meaning the instance will continue to run as long as you are making requests to it within the specified experiation period.

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
{"model":"openai-community/gpt2","status":"RUNNING","concurrency":1,"inferences":0,"expirationPeriodSeconds":1800,"expirationPeriodMinutes":30,"expiresAt":"2024-05-28T00:12:18.738Z","created":"2024-05-27T23:35:35.863Z","modified":"2024-05-27T23:42:19.239Z"}
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


## Help us make this better
At Bytez, we want to build the best DX for AI builders. We value your feedback! If you have suggestions for improving our docs, please let us know on Discord or via email.
