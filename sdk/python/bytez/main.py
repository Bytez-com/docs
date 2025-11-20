from typing import Optional, Dict
from .client import Client
from .model import Model


class Bytez:
    """
    API Client for interfacing with the Bytez API.
    """

    def __init__(self, api_key: str, dev: bool = False):
        """
        Initialize the Bytez API client with an API key.

        Args:
            api_key (str): Your Bytez API key.
            dev (bool): Whether to use the development environment.
        """
        self._client = Client(api_key, dev)
        self.list = self._List(self)  # Initialize the list object

    class _List:
        """A helper class to expose list functions under `bytez.list`."""

        def __init__(self, parent):
            self._parent = parent  # Store reference to the main Bytez instance

        def models(self, options: Optional[Dict[str, str]] = None):
            """Lists available models and provides basic information about each."""
            return self._parent._list_models(options)

        def tasks(self):
            """List available tasks."""
            return self._parent._list_tasks()

    def _list_models(self, options: Optional[Dict[str, str]] = None):
        """Hidden function to list models."""
        query_params = []

        if options:
            if "task" in options:
                query_params.append(f"task={options['task']}")
            if "modelId" in options:
                query_params.append(f"modelId={options['modelId']}")

        query_string = f"?{'&'.join(query_params)}" if query_params else ""

        return self._client.request(f"list/models{query_string}")

    def _list_tasks(self):
        """Hidden function to list tasks."""
        return self._client.request("list/tasks")

    def model(self, model_id: str, provider_key: str = None):
        """
        Get a model instance.

        Args:
            model_id (str): The model ID, e.g., `openai-community/gpt2`.
            provider_key (str, optional): Closed-source model provider's API key (e.g. OpenAI key)

        Returns:
            Model instance.
        """
        return Model(model_id, self, self._client, provider_key)
