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

        return weather;
    } catch (error) {
        console.log(error);
    }
}

function main() {
    const form = document.querySelector("form");
    const input = document.querySelector("input");

    // Grab the elements where we will store the user's requested data
    const city = document.getElementById("city");
    const temperature = document.getElementById("temperature");
    const condition = document.getElementById("condition");
    const image = document.getElementById("image");

    // Search city when form is submitted
    form.addEventListener("submit", (event) => {
        getWeather(input.value).then((result) => {
            city.textContent = result.location.name;
            temperature.textContent = `${result.current.temp_f}F`;
            condition.textContent = result.current.condition.text;
            image.src = result.current.condition.icon;
        });

        // Reset form
        form.reset();

        // Return false so that the page doesn't get reloaded
        return false;
    });
}

main();
