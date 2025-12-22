const base_url = "http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}";

const api = "c38ce559cd962d9d5e5a2a3872317c08";

export async function fetchWeatherData(location) {
    const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${api}`)

    if(response.ok) {
        throw new Error("Failed to fetch weather data")
    }

    const data = await response.json();
    return data;
}