import Bytez from "bytez.js";

const client = new Bytez("YOUR BYTEZ KEY HERE");

const inputText = "What's the weather like in Seattle right now?";

const modelParams = {
  max_new_tokens: 500,
  min_new_tokens: 50,
  temperature: 0.001,
  do_sample: false
};

const promptTemplate = `
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
`;

const model = client.model("Nexusflow/NexusRaven-V2-13B");

await model.load();

const prompt = promptTemplate.replace("{query}", inputText);

const stream = await model.run(prompt, { stream: true, params: modelParams });

const reader = stream.getReader();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(new TextDecoder().decode(value));
}
