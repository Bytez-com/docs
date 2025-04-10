from typing import Optional, Dict
from .client import Client

class Model:
    """
    Represents a model in the Bytez API, allowing operations like loading, running, updating, and deleting.
    """

    def __init__(self, model_id: str, bytez, client: Client, params: Optional[Dict] = None):
        """
        Initialize a model instance.

        Args:
            model_id (str): The model ID, e.g., `openai-community/gpt2`.
            bytez (Bytez): The Bytez API client instance.
            client (Client): The internal request client.
            params (dict, optional): Default inference parameters.
        """
        self._client = client
        self.id: str = model_id  # The modelId, for example `openai-community/gpt2`
        self.params: Optional[Dict] = params  # Default model params
        self.details: Dict = {}  # Details about the model
        self._is_generating_media: bool = False  # Whether the model generates media output
        self._bytez = bytez
        self._ready = False

    def _initialize(self):
        """Fetch model details and set up internal state."""
        output, _ = self._bytez.list.models({ "modelId": self.id })
        media_generators = {
            "text-to-audio", "text-to-image", "text-to-video", "text-to-speech"
        }

        self.details = output[0] if output else {}
        self._is_generating_media = self.details.get("task") in media_generators
        self._ready = True

    def create(self, options: Optional[Dict] = None):
        """
        For open-source models, `create` an auto-scaling cluster to run this model.

        Args:
            options (dict, optional): Cluster configuration.

        Returns:
            dict: API response.
        """

        return self._client.request(self.id, "PUT", options)

    def read(self):
        """
        For open-source models, `read` your cluster.

        Returns:
            dict: API response with cluster details.
        """
        return self._client.request(self.id, "GET")

    def update(self, options: Optional[Dict] = None):
        """
        For open-source models, `update` your cluster.

        Args:
            options (dict, optional): Updated cluster configuration.

        Returns:
            dict: API response.
        """
        return self._client.request(self.id, "PATCH", options)

    def delete(self):
        """
        For open-source models, `delete` your cluster.

        Returns:
            dict: API response.
        """
        return self._client.request(self.id, "DELETE")

    def run(self, input=None, params: Optional[Dict] = None, stream: bool = False):
        """
        `Run` the model by passing an `input`, and optionally passing `params` and/or a `stream` flag.

        Execute this function in one of four ways:
        1. `run(input)` → Returns JSON `{ error, output }`
        2. `run(input, params={...})` → Returns JSON `{ error, output }`
        3. `run(input, stream=True)` → Streams output if applicable
        4. `run(input, params={...}, stream=True)` → Uses params and streams if applicable

        Args:
            input (any, optional): Input data (e.g., text, URL, base64).
            params (dict, optional): Model parameters.
            stream (bool, optional): Whether to stream the output.

        Returns:
            dict | iter: Model output (stream or JSON response).
        """
        if self._ready is False:
            self._initialize()

        post_body = {
            "params": params if params is not None else self.params,
            "stream": stream,
            "json": False if self._is_generating_media and stream else None
        }

        # Assign input based on model task
        task = self.details.get("task")

        if task in {
            "sentence-similarity", "fill-mask", "text-to-speech",
            "text-to-audio", "text-to-image", "translation",
            "summarization", "text-to-video", "feature-extraction",
            "text-classification", "token-classification",
            "text2text-generation", "text-generation"
        }:
            post_body["text"] = input
        elif task == "chat":
            post_body["messages"] = input
        elif task in {
            "video-classification", "automatic-speech-recognition",
            "audio-classification", "mask-generation", "image-to-text",
            "object-detection", "depth-estimation", "image-segmentation",
            "image-classification", "image-feature-extraction"
        }:
            if isinstance(input, str):
                if input.startswith("http"):
                    post_body["url"] = input
                elif input.startswith("data"):
                    post_body["base64"] = input
        elif task in {"zero-shot-classification"}:
            post_body["candidate_labels"] = input.get("candidate_labels")
            post_body["text"] = input.get("text")
        elif task == "unconditional-image-generation":
            pass  # No input required
        else:
            post_body["input"] = input

        return self._client.request(self.id, "POST", post_body)