import React, { useState, useEffect } from "react";
import { fetchLocationData } from "../api/data";
import "../css/weather-component.css";

function WeatherComponent() {

    //Controlled States
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null)
    const [location, setLocation] = useState("Ulverston");
    const [newLocation, setNewLocation] = useState("");

    //Function for calling weather API
    async function callWeatherData() {
        setIsLoading(true);
        setHasError(null)

        setTimeout(async () => {
            try {
                const weatherData = await fetchLocationData(location);
                setData(weatherData);
            } catch(e) {
                setHasError("Something went wrong, please try again");
            } finally {
                setIsLoading(false);
            }    
        }, 1000)
    }

    //This calls the API Function
    useEffect(() => {
        callWeatherData();
    }, [location])

    if(isLoading) {
        return (
            <div className="weather-container">
                <h1>The Weather</h1>
                <p className="loading-message">Loading...</p>
            </div>
        )
    }

    if(hasError) {
        return (
            <div className="weather-container">
                <h1>The Weather</h1>
                <p className="error-message">{hasError}</p>
                <form onSubmit={handleSearchSubmit}>
                    <input required type="text" placeholder="Search for location..." value={newLocation} onChange={handleLocationChange}/>
                    <button type="submit">Search</button>
                </form>
            </div>
        );
    }

    if(!data) {
        return <p>There is no data</p>;
    }


    //Function for setting handling input value
    function handleLocationChange({target}) {
        setNewLocation(target.value);
    }

    //Function for handling submission of the form
    function handleSearchSubmit(e) {
        e.preventDefault();

        if(newLocation.length > 0) {
            setLocation(newLocation);
        }

        setNewLocation("");

    }


    return (
        <div className="weather-container" >
            <h1>The Weather</h1>
            <form onSubmit={handleSearchSubmit}>
                <input required type="text" placeholder="Search for location..." value={newLocation} onChange={handleLocationChange}/>
                <button type="submit">Search</button>
            </form>
            <h2>This is the weather for <span>{data.name}</span></h2>
            <div className="weather-details">
                <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
                <h3>{data.weather[0].main}</h3>
                <p className="temp">Temperature: {Math.round(data.main.temp)}℃</p>
                <p className="feels-like">Feels like: {Math.round(data.main.feels_like)}℃</p>
                <div>
                    <p className="low">Low: {Math.round(data.main.temp_min)}℃</p>
                    <p className="high">High: {Math.round(data.main.temp_max)}℃</p>
                </div>

            </div>
        </div>
    )
}

export default WeatherComponent;