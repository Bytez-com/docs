from bytez import Bytez

client = Bytez("YOUR_BYTEZ_KEY_HERE")

model = client.model("Nexusflow/NexusRaven-V2-13B")

model.load()

input_text = "What's the weather like in Seattle right now?"

model_params = {
    "max_new_tokens": 500,
    "min_new_tokens": 50,
    "temperature": 0.001,
    "do_sample": False,
}

prompt_template = '''
Function:
def get_weather_data(coordinates):
    """
    Fetches weather data from the Open-Meteo API for the given latitude and longitude.

    Args:
    coordinates (tuple): The latitude and longitude of the location.

    Returns:
    float: The current temperature in the coordinates you've asked for
    """

Function:
def get_coordinates_from_city(city_name):
    """
    Fetches the latitude and longitude of a given city name using the Maps.co Geocoding API.

    Args:
    city_name (str): The name of the city.

    Returns:
    tuple: The latitude and longitude of the city.
    """

User Query: {query}<human_end>
'''

# Prepare the prompt with the user query
prompt = prompt_template.format(query=input_text)

stream = model.run(prompt, model_params=model_params, stream=True)
for chunk in stream:
    print(f"Output: {chunk}")
