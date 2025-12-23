import React, { useState, useEffect } from "react";
import { fetchLocationData } from "../api/data";

function WeatherComponent() {

    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null)
    const [location, setLocation] = useState("London");

    async function callWeatherData() {
        setIsLoading(true);
        setHasError(null)

        try {
            const weatherData = await fetchLocationData(location);
            setData(weatherData);
        } catch(e) {
            setHasError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        callWeatherData();
    }, [location])

    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(hasError) {
        return <p>{hasError}</p>;
    }

    if(!data) {
        return <p>There is no data</p>;
    }


    return (
        <div>
            <h1>The Weather</h1>
            <h2>This is the weather for {data.name}</h2>
            <div>
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                <p>{data.weather[0].main}</p>
                <p>Temperature: {Math.round(data.main.temp)}℃</p>
                <p>Feels like: {Math.round(data.main.feels_like)}</p>
                <p>Low: {Math.round(data.main.temp_min)}℃</p>
                <p>High: {Math.round(data.main.temp_max)}℃</p>

            </div>
        </div>
    )
}

export default WeatherComponent;