import React from "react";

function WeatherCard({data, children}) {
    return (
        <div className="weather-container" >
            <h1>The Weather</h1>
            {children}
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

export default WeatherCard;