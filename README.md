<div align="center">
 <img alt="bytez" height="200px" src="https://github.com/Bytez-com/docs/assets/9612780/610ae3a1-65b5-4f8a-8ed5-0bae9134ab5f">
</div>

# Bytez

[![](https://dcbadge.limes.pink/api/server/https://discord.gg/Zrd5UbMEBA)](https://discord.com/invite/Z723PfCFWf) [![](https://img.shields.io/badge/Bytez-000000?style=for-the-badge&logo=x&=logoColor=white)](https://x.com/Bytez)

Run large AI models affordably with Bytez – achieve GPU performance at CPU pricing.

## API Key

You need a key to use our API. Join the [Bytez Discord](https://discord.gg/Zrd5UbMEBA) or send us an [email](mailto:team@bytez.com) to get your key. 

## Cold Boot Times & Billing
### Cold Boot Times
Models have a cold boot time. This is the time it takes for a model's compute resources to be provisioned, as well as for the model to be downloaded and loaded into memory. This takes between 1.5 to 5 minutes - even for the largest models (those with 70B+ params). We're continuously optimizing our pipeline to bring cold boot times down to near zero.

### Billing 
At a minimum, you'll be charged for the first 60 seconds of use. Usage beyond 60 seconds is rounded up to the nearest minute of usage. We charge $0.0000166667 / GB sec for inference on GPUs. Instance spin down is not instaneous and may take longer than 1 minute from the instance expiring to it actually shutting down. 

Shutdowns occur within 2 minutes of the specified expiration period for a model instance. The default expiration period is 30 minutes. See [Load a model](./api.md/#load-a-model) for more details on how to set your expiration period. Shutting down a model via the [Shutdown a loaded model](./api.md/#shutdown-a-loaded-model) endpoint is near instantaneous.

## Docker 

All Byetz models are available on our [Docker Hub](https://hub.docker.com/u/bytez). 

## Libraries
- [Python](./python/readme.md)
- [Javascript](./javascript/readme.md)

## Model Library

We currently support text generation and chat models. See our [model library](./models.md) for the full list.

Here are some models that can be run, with their required RAM.

| Model Name                                               | Required RAM (GB)       
|----------------------------------------------------------|-------------------------|
| EleutherAI/gpt-neo-2.7B                                  | 2.23                                       
| bigscience/bloom-560m                                    | 3.78                    
| succinctly/text2image-prompt-generator                   | 1.04                    
| ai-forever/mGPT                                          | 9.59                    
| microsoft/phi-1                                          | 9.16                    
| facebook/opt-1.3b                                        | 8.06                    
| openai-community/gpt2                                    | 0.50                                     
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
| codellama/CodeLlama-70b-Instruct-hf                      | 372.52                  
| togethercomputer/Llama-2-7B-32K-Instruct                 | 25.65                   
| beomi/Llama-3-Open-Ko-8B-Instruct-preview                | 30.81                   
| abhishekchohan/SOLAR-10.7B-Instruct-Forest-DPO-v1        | 15.38                   
| deepseek-ai/deepseek-math-7b-instruct                    | 28.08                   
| occiglot/occiglot-7b-eu5-instruct                        | 28.94                   
| MediaTek-Research/Breeze-7B-Instruct-v1_0                | 29.84                   

## REST API

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

See the [API Documentation](./api.md) for all enpoints.

## About Us
### Our background

Bytez started as community project out of NeurIPS. Thank you to Lee Campbell who believed in us during idea stage. Thank you to the volunteers at NeurIPS, CVPR, and the entire ML community. Your support and your contributions are the foundation of Bytez and the future of open science.

### Our mission

The mission of Bytez is to make open source AI easy to discover, understand, and use.

We've already transformed research papers into interactive media. Now, we are running verified benchmarks on models. This makes every model directly comparable for the first time ever.

We believe there is an opportunity to make open models as trusted and ready-to-use as closed models, to the benefit of all developers and researchers.

### Join our Community
[![](https://dcbadge.limes.pink/api/server/https://discord.gg/Zrd5UbMEBA)](https://discord.com/invite/Z723PfCFWf) [![](https://img.shields.io/badge/Bytez-000000?style=for-the-badge&logo=x&=logoColor=white)](https://x.com/Bytez)

We hang out in Discord, come chat with us. You can also follow us on Twitter for the latest models and research.

### Help us make this better
We want to build the best DX for AI builders. We value your feedback! If you have suggestions for improving our docs, please let us know on [Discord](https://discord.gg/Zrd5UbMEBA) or via team@bytez.com.
