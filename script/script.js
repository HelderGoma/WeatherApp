const apiKey = "2f099a606477573b2f5e2d598baebecf"
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric"

const searchBox = document.querySelector(".search input")
const searchBtn = document.querySelector(".search button")
const weatherIcon = document.querySelector(".weather-icon")




async function checkWeather(city) {
    const response = await fetch(apiUrl + "&q=" + city + `&appid=${apiKey}`)

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block"
        document.querySelector(".weather").style.display = "none"

    } else {
        var data = await response.json()
        // console.log(data)

        document.querySelector(".city").innerHTML = data.name
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C"
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%"
        document.querySelector(".wind").innerHTML = data.wind.speed + "km/h"



        document.querySelector(".weather").style.display = "block"
        document.querySelector(".error").style.display = "none"


        const { sunrise, sunset } = data.sys;
        const { timezone } = data;

        const nowUtc = Math.floor(Date.now() / 1000);

        const localNow = nowUtc + timezone;
        const localSunrise = sunrise + timezone;
        const localSunset = sunset + timezone;

        const isNight = localNow < localSunrise || localNow > localSunset;

        const weatherMain = data.weather[0].main.toLowerCase();
        const timeSuffix = isNight ? "-night" : "";

        changeIconSmoothly(`./images/${weatherMain}${timeSuffix}.png`);

        const card = document.getElementById('card');
        if (card) {
            card.classList.toggle('night', isNight);
            card.classList.toggle('day', !isNight);
        }


        document.body.classList.toggle('night-bg', isNight);
        document.body.classList.toggle('day-bg', !isNight);
    }



}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value)
})



function changeIconSmoothly(newSrc) {
    weatherIcon.classList.add("fade");

    setTimeout(() => {
        weatherIcon.src = newSrc;
        weatherIcon.classList.remove("fade");
    }, 300);
}