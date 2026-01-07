import React from "react";

function ErrorComponent({hasError, children}) {

    return (
        <div className="weather-container">
                <h1>The Weather</h1>
                <p className="error-message">{hasError}</p>
                {children}
        </div>
    )
}

export default ErrorComponent;