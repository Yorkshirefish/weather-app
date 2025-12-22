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


    return (
        <div>
            <h1>Test</h1>
            <button>Press me</button>
        </div>
    )
}

export default WeatherComponent;