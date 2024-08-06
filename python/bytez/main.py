import json, time, requests
from .interface import InferenceOptions, Task
from typing import Optional

class Client:
  """
  Client class for handling HTTP requests to the Bytez API.

  Attributes:
    auth (dict): Authorization headers containing API key.
  """
  def __init__(self, api_key):
    """
    Initialize the client with an API key.

    Args:
        api_key (str): Your Bytez API key.
    """
    self.headers = {"authorization": f"Key {api_key}", "content-type": "application/json" }

  def _request(self, path="", body=None, stream=False):
    try:
      url = "https://api.bytez.com/" + path
      headers = self.headers
      method = "POST" if body else "GET"
      data = json.dumps(body) if body else None

      response = requests.request(method, url, headers=headers, data=data, stream=stream)

      if stream:
        return response.iter_lines(decode_unicode=True)  # Handling streaming properly
      else:
        response.raise_for_status()
        return response.json()
    except requests.RequestException as error:
      if response.status_code != 200:
        return response.json()

      return {"error": str(error)}

class Bytez:
  """
  API Client for interfacing with the Bytez API.

  Methods:
      list_models(): Lists available models.
      list_instances(): List your serverless instances.
      process(model_id): Make a model serverless.
      model(model_id): Access a specific model.
  """
  def __init__(self, api_key):
    """
    Initialize the Bytez API client with an API key.

    Args:
        api_key (str): Your Bytez API key.
    """
    self._client = Client(api_key)

  def list_models(self, task: Optional[Task] = None):
    """
    List the currently available models, providing basic information about each one.

    Returns:
        List of available models with details.
    """
    return self._client._request(f"model/list{'?task=' + task if task else ''}")

  def list_instances(self):
    """
    List your serverless instances.

    Returns:
        List of serverless instances.
    """
    return self._client._request("model/instances")

  def process(self, model_id):
    """
    Make a HuggingFace model serverless and available on this API.

    Args:
        model_id (str): The HuggingFace model ID, e.g., `openai-community/gpt2`

    Returns:
        Job status for making the model serverless.
    """
    return self._client._request("model/job", {"model": model_id})

  def model(self, model_id):
    """
      Get a model object for operations like load, run, stop, and check status.

      Args:
          model_id (str): The HuggingFace model ID,  e.g., `openai-community/gpt2`

      Returns:
          Model instance.
    """
    return Model(self._client, model_id)

class Model:
  """
  Represents a model in the Bytez API, allowing operations like loading, running, stopping, and checking status.

  Attributes:
      model_id (str): The HuggingFace model ID, e.g. `openai-community/gpt2`
      options (dict): Serverless configuration options.
  """
  def __init__(self, client, model_id):
    """
    Initialize a model instance.

    Args:
        client (Client): The Client instance.
        model_id (str): The HuggingFace model ID.
    """
    self._client = client
    self.id = model_id
    self.options = { "concurrency": 1, "timeout": 300 }
    self._body = {"model": self.id}

  def load(self, options=None):
    """
    Load the model with the provided options, waiting until the model is fully deployed.

    Args:
        options (dict, optional): Options to configure the model loading.
    """ 
    self.start(options)
    status_last = ''
    status = ''
    
    while status != "FAILED" and status != "RUNNING":
      status = self.status().get("status")
      
      if status != "RUNNING":
        if status != status_last:
          status_last = status
          print(status)
          
        time.sleep(5)
    
    if status == "FAILED":
      print(f"Error: {self.status().get('error')}")

  def start(self, options=None):
    """
      Start the model with specified serverless configuration options.

      Args:
          options (dict, optional): Options to configure the model loading.

      Returns:
          Response from the model load request.
      """
    if options:
      self.options.update(options)
    
    return self._client._request("model/load", {**self._body, **modelOptionMapper(self.options)})

  def status(self):
    """
    Check the status of the model.

    Returns:
        Current status of the model.
    """
    return self._client._request("model/status", self._body)

  def stop(self):
    """
    Stop the model and shut down the serverless instance.

    Returns:
        Response from the model stop request.
    """
    return self._client._request("model/delete", self._body)

  def run(self, input, stream = False, model_params: InferenceOptions = {}):
    """
    Run the model with the provided input and optional inference parameters.

    Args:
        input (str): Input text for the model.
        inference_options (dict): Optional parameters for controlling model inference.

    Returns:
        Output from the model based on the provided input.
    """
    body = {**self._body, "params": model_params, "stream": stream}

    # Check if input is a dictionary
    if isinstance(input, dict):
        body.update(input)
    else:
        body["input"] = input

    return self._client._request("model/run", body=body, stream=stream)


def modelOptionMapper(options):
  mapped_options = {
    "concurrency": options.get("concurrency"),
    "expirationPeriodSeconds": options.get("timeout")
  }

  return {k: v for k, v in mapped_options.items() if v is not None}

