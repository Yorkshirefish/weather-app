import React, { useState, useEffect } from "react";
import { fetchLocationData } from "../api/data";
import LoadingComponent from "./loading-template";
import ErrorComponent from "./error-template";
import WeatherLayout from "./weather-layout";
import WeatherCard from "./weather-card";
import "../css/weather-component.css";
import SearchBar from "./search-bar";

function WeatherComponent() {

    //Controlled States
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState(null)
    const [location, setLocation] = useState("Ulverston");
    const [newLocation, setNewLocation] = useState("");

    //Function for calling weather API

    //This calls the API Function
    useEffect(() => {

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
        }, 1000);

    }, [location]);


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
        <WeatherLayout>
            {isLoading && <LoadingComponent/>}
            {hasError && <ErrorComponent hasError={hasError}><SearchBar handleSearchSubmit={handleSearchSubmit} newLocation={newLocation} handleLocationChange={handleLocationChange}/></ErrorComponent>}
            {data && <WeatherCard data={data}><SearchBar handleSearchSubmit={handleSearchSubmit} newLocation={newLocation} handleLocationChange={handleLocationChange}/></WeatherCard>}
            {!data && <p>There is no data</p>}
        </WeatherLayout>
    )
}

export default WeatherComponent;