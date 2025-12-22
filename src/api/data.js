const API_key = "c38ce559cd962d9d5e5a2a3872317c08";





//This is a function that fetches weather data based on Longitude and Latitude 
async function fetchWeatherData(lon, lat) {
    
    //This uses the longitude and latitude parameters to gather data from a server
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}`)
    
    //If the data doesn't work, then it will throw an error
    if(!response.ok) {
        throw new Error("Failed to fetch weather data")
    }

    //If the data does work, then we will store it in the variable named "data".
    const data = await response.json();

    //We return the data. The result of calling this function will result in returning the data requested. Wihtout this, we are just requesting the data from the server and then not using it
    return data;

}







//This is a function that fetches longitude and latitude of a location and then calls the other function with the returned longitde and latitude
export async function fetchLocationData(location) {

    //This uses the parameter of "location" to return the longitude and latitude of the provided location
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${API_key}`)

    //If the data doesn't work, then it will throw an error
    if(!response.ok) {
        throw new Error("Failed to fetch location data")
    }

    //If the data does work, we are storing it in the variable named "data"
    const data = await response.json();
    
    //We then call the other function with the data returned in this function and store the data returned in the other function in a variable called "weather data"
    const weatherData = await fetchWeatherData(data[0].lon, data[0].lat);

    //I log the data to the console. This allows me to see the structure of the returned data so I can display it
    console.log(weatherData);
    console.log("I love you Sam")
    
    //This returns the returned data stored in the variable "weatherData"
    return weatherData;
}


