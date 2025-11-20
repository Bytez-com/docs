import json, requests
from collections import namedtuple

Response = namedtuple('Response', ['output', 'error', 'provider'], defaults=[None, None, None])

class Client:
    """
    Client class for handling HTTP requests to the Bytez API.

    Attributes:
      auth (dict): Authorization headers containing API key.
    """

    def __init__( self, api_key, dev = False ):
        """
        Initialize the client with an API key.

        Args:
            api_key (str): Your Bytez API key.
        """
        self.headers = {
            "lang": "python",
            "authorization": f"Key {api_key}",
            "content-type": "application/json",
        }
        self.host = f"http{'://' if dev else 's://'}{'localhost:8080' if dev else 'api.bytez.com'}/models/v2/"
    def request(self, path = "", method = "GET", post_body = None, provider_key = None):
        """
        Send an HTTP request.

        Args:
            path (str): API endpoint path.
            method (str): HTTP method (default: "GET").
            body (dict, optional): Request body (default: None).

        Returns:
            dict | iter: JSON response or stream iterator.
        """
        try:
            stream = bool(post_body and post_body.get("stream"))
            response = requests.request(
                method,
                self.host + path,
                headers = ( { **self.headers, "provider-key": provider_key } if provider_key is not None else self.headers ),
                # drop null values from being sent
                data = json.dumps({k: v for k, v in post_body.items() if v is not None}) if post_body else None,
                stream = stream
            )

            if stream:
                response.encoding = "utf-8"

                return (line for line in response.iter_lines(decode_unicode=True) if line)
            else:
                results = response.json()

                return Response(output=results.get('output'), error=results.get('error'), provider=results.get('provider'))
        except Exception as error:
            return Response(error=str(error))
