import "./static/reset.css";
import "./static/style.css";

async function getWeather(location) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=b5da090f2c7b4483b88161050243101&q=${location}`
        );

        // Make sure status is successful
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const weather = await response.json();

        // Make sure we have data
        if (
            !weather.current ||
            !weather.location ||
            Object.keys(weather.current).length === 0 ||
            Object.keys(weather.location).length === 0
        ) {
            throw new Error("No weather found for this location.");
        }

        console.log(weather);
    } catch (error) {
        console.log(error);
    }
}

getWeather("california");
