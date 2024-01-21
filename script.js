const searchInp = document.querySelector(".search-inp");
const searchTbn = document.querySelector(".search-btn");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const notFound = document.querySelector(".not-found");
const wBody = document.querySelector(".w-body");

async function checkWeather(city) {
    const apiKey = `fcbec4e4ff63477471d2a069176e2b36
    `;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const weatherData = await fetch(`${url}`).then(response => response.json());


    if (weatherData.cod === "404") {
        notFound.style.display = "flex";
        wBody.style.display = "none";
        return;
    }
    else {
        notFound.style.display = "none";
    }

    wBody.style.display = "block";

    temperature.innerHTML = `${Math.round(weatherData.main.temp - 273.15)}&#176C`;

    description.innerHTML = `${weatherData.weather[0].description}`;

    humidity.innerHTML = `${weatherData.main.humidity}%`;

    windSpeed.innerHTML = `${weatherData.wind.speed}Km/H`;

    switch (weatherData.weather[0].main) {
        case "Clouds":
            weatherImg.src = "/assets/cloud.png"
            break;
        case "Clear":
            weatherImg.src = "/assets/clear.png"
            break;
        case "Rain":
            weatherImg.src = "/assets/rain.png"
            break;
        case "Mist":
            weatherImg.src = "/assets/mist.png"
            break;
        case "Snow":
            weatherImg.src = "/assets/snow.png"
            break;
    }
}
searchTbn.addEventListener("click", () => {
    checkWeather(searchInp.value);
})