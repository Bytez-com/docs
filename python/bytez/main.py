import json, time, requests
from .interface import InferenceOptions, Task
from typing import Optional

ONE_MINUTE_SECONDS = 60
MODEL_LOAD_TIMEOUT_MINUTES = 15
MODEL_LOAD_TIMEOUT_MINUTES_AS_SECONDS = ONE_MINUTE_SECONDS * MODEL_LOAD_TIMEOUT_MINUTES


class HttpException(Exception):
    def __init__(self, message: str, status_code: int):
        super().__init__(message)
        self.status_code = status_code


class Client:
    """
    Client class for handling HTTP requests to the Bytez API.

    Attributes:
      auth (dict): Authorization headers containing API key.
    """

    def __init__(self, api_key, dev=False):
        """
        Initialize the client with an API key.

        Args:
            api_key (str): Your Bytez API key.
        """
        self.headers = {
            "authorization": f"Key {api_key}",
            "content-type": "application/json",
        }
        self.host = "http://localhost:8080" if dev else "https://api.bytez.com"

    def _request(self, path="", body=None, stream=False):
        try:
            url = f"{self.host}/{path}"
            headers = self.headers
            method = "POST" if body else "GET"
            data = json.dumps(body) if body else None

            response = requests.request(
                method, url, headers=headers, data=data, stream=stream
            )

            if stream:
                return response.iter_lines(decode_unicode=True)

            if response.ok:
                return response.json()
            else:
                error_str = f"Request to: {url} failed: {response.json().get('error')}, status code: {response.status_code}"
                exception = HttpException(error_str, response.status_code)
                raise exception

        except Exception as error:
            return {"error": error}


class Bytez:
    """
    API Client for interfacing with the Bytez API.

    Methods:
        list_models(): Lists available models.
        list_instances(): List your serverless instances.
        process(model_id): Make a model serverless.
        model(model_id): Access a specific model.
    """

    def __init__(self, api_key, dev=False):
        """
        Initialize the Bytez API client with an API key.

        Args:
            api_key (str): Your Bytez API key.
        """
        self._client = Client(api_key, dev)

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

    def __init__(self, client: Client, model_id):
        """
        Initialize a model instance.

        Args:
            client (Client): The Client instance.
            model_id (str): The HuggingFace model ID.
        """
        self._client = client
        self.id = model_id
        self.options = {"concurrency": 1, "timeout": 300}
        self._body = {"model": self.id}

    def load(self, options=None):
        """
        Load the model with the provided options, waiting until the model is fully deployed.

        Args:
            options (dict, optional): Options to configure the model loading.
        """
        error: HttpException = self.start(options).get("error")

        if error:
            # Model is already loaded
            if error.status_code == 209:
                return

            # We allow 429's to proceed, that means that a loading operation is already in progress
            if error.status_code != 429 or "credits" in str(error):
                raise error

        time_to_timeout = time.time() + MODEL_LOAD_TIMEOUT_MINUTES_AS_SECONDS

        status = "UNSET"
        while time.time() < time_to_timeout:
            response = self.status()

            new_status = response.get("status")
            error = response.get("error")

            if status != new_status:
                status = new_status
                print(status)

            if status == "RUNNING":
                return

            if status == "FAILED":
                raise Exception(error)

            time.sleep(5)

        raise Exception(
            f"Model loading timed out after: {MODEL_LOAD_TIMEOUT_MINUTES} minutes"
        )

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

        return self._client._request(
            "model/load", {**self._body, **modelOptionMapper(self.options)}
        )

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

    def run(self, input, stream=False, model_params: InferenceOptions = {}):
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
        "expirationPeriodSeconds": options.get("timeout"),
    }

    return {k: v for k, v in mapped_options.items() if v is not None}
