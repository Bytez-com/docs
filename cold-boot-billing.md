# Cold Boot Times & Billing
## Cold Boot Times
Models have a cold boot time. This is the time it takes for a model's compute resources to be provisioned, as well as for the model to be downloaded and loaded into memory. This takes between 1.5 to 5 minutes - even for the largest models (those with 70B+ params). 

We're continuously optimizing our pipeline to bring cold boot times down to near zero.

## Billing 
At a minimum, you'll be charged for the first 60 seconds of use. Usage beyond 60 seconds is rounded up to the nearest minute of usage. We charge $0.0000166667 / GB sec for inference on GPUs. Instance spin down is not instaneous and may take longer than 1 minute from the instance expiring to it actually shutting down. 

Shutdowns occur within 2 minutes of the specified expiration period for a model instance. The default expiration period is 30 minutes. See [Load a model](./api.md/#load-a-model) for more details on how to set your expiration period. 

Shutting down a model via the [Shutdown a loaded model](./api.md/#shutdown-a-loaded-model) endpoint is near instantaneous.
