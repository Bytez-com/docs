from typing import Optional, Dict, Union, Any
from .client import Client


class Model:
    """
    Represents a model in the Bytez API
    """

    def __init__(self, model_id: str, bytez, client: Client, provider_key: str = None):
        """
        Initialize a model instance.

        Args:
            model_id (str): The model ID, e.g., `openai-community/gpt2`.
            bytez (Bytez): The Bytez API client instance.
            client (Client): The internal request client.
            provider_key (str, optional): closed source model provider key
        """
        self._client = client
        self.provider_key: str = provider_key
        self.id: str = model_id  # The modelId, for example `openai-community/gpt2`
        self.details: Dict = {}  # Details about the model
        self._is_generating_media: bool = (
            False  # Whether the model generates media output
        )
        self._bytez = bytez
        self._ready = False

    def _initialize(self):
        """Fetch model details and set up internal state."""
        result = self._bytez.list.models({"modelId": self.id})
        media_generators = {
            "text-to-audio",
            "text-to-image",
            "text-to-video",
            "text-to-speech",
        }

        self.details = result.output[0] if result.output else {}
        self._is_generating_media = self.details.get("task") in media_generators
        self._ready = True

    def run(
        self,
        input: Any = None,
        params: Union[Dict, bool, None] = None,
        stream: bool = False
    ):
        """
        Execute the model with the given input.

        This method supports flexible argument passing. You can pass parameters usually,
        or pass a boolean as the second argument as a shorthand for streaming.

        Args:
            input (Any): The input data (text, URL, base64, etc).
            params (Dict | bool, optional): Model parameters (e.g. temp, top_p) OR a boolean flag for streaming.
            stream (bool, optional): Explicitly set the stream flag.

        Examples:
            >>> # 1. Standard run
            >>> model.run("Hello world")

            >>> # 2. With Parameters
            >>> model.run("Hello world", {"temperature": 0.5})

            >>> # 3. Shorthand Streaming (pass True as 2nd arg)
            >>> model.run("Hello world", True)

            >>> # 4. Explicit Streaming with Parameters
            >>> model.run("Hello world", {"temperature": 0.5}, stream=True)

        Returns:
            dict | iter: Model output (JSON response or an iterable stream).
        """
        if self._ready is False:
            self._initialize()

        request_params = None
        request_stream = stream

        # Check what the user passed into the second argument ('params')
        if isinstance(params, bool):
            # User passed `model.run(input, True)` -> Treat param as stream flag
            request_stream = params
            request_params = None
        elif isinstance(params, dict):
            # User passed `model.run(input, {...})` -> Standard usage
            request_params = params
            # We keep request_stream as whatever the 3rd arg is (default False)
        else:
            # User passed explicit None or something else; trust the named args
            request_params = params

        post_body = {
            "params": request_params,
            "stream": request_stream,
            "json": False if self._is_generating_media and request_stream else None,
        }

        post_body["input"] = input

        return self._client.request(self.id, "POST", post_body, self.provider_key)