import json, requests

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
                headers = ( { **self.headers, 'provider-key': provider_key } if provider_key is not None else self.headers ),
                # drop null values from being sent
                data = json.dumps({k: v for k, v in post_body.items() if v is not None}) if post_body else None,
                stream = stream
            )

            if stream:
                return response.iter_lines(decode_unicode=True)
            else:
                results = response.json()
                provider = results.get('provider')

                return [results.get('output'), results.get('error'), provider] if provider else [results.get('output'), results.get('error')]
        except Exception as error:
            return [None, str(error)]