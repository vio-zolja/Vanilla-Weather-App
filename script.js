// time

let now = new Date();

let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();

let time = document.querySelector(".time")

if (hour < 10){
    time.innerHTML = `${day} 0${hour}:${minute}`
}
if(minute < 10){
    time.innerHTML = `${day} ${hour}:0${minute}`
}
else{
    time.innerHTML = `${day} ${hour}:${minute}`
}


// Current

let button = document.querySelector("#button")

function currentTemp (event){
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(current);

    function current(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let apiKey = "3fefe32c502f2c470839a5386891b04a";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

        function dataLog (response){
            console.log(response.data)

            let city = document.querySelector(".city")
            let temperature = document.querySelector(".temperature")
            let img = document.querySelector("header img")
            let descriptionHeader = document.querySelector("header .description")

            city.innerHTML = `${response.data.name}`
            temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`
            descriptionHeader.innerHTML = 
                `<ul>
                    <li>Feels like: ${Math.round(response.data.main.feels_like)} <span class="unit">°C</span></li>
                    <li>Wind speed: ${Math.round(response.data.wind.speed)} km/h</li>
                    <li>Humidity: ${response.data.main.humidity}%</li>
                </ul>`

            
            let units = document.querySelector(".units")
            units.innerHTML = ` Show in <span class="celsius">°C </span> | <span class="farenheit">°F</span> `

            //Units

            let fButton = document.querySelector(".farenheit");

                function convertToFarenheit(event){
                event.preventDefault();
                let farenheitTemperature = Math.round((response.data.main.temp*9/5)+32)
                
                temperature.innerHTML = `${farenheitTemperature} °F `

                let cButton = document.querySelector(".celsius");

                    function convertToCelsius(event){
                    event.preventDefault();
                    temperature.innerHTML = `${Math.round(response.data.main.temp)} °C `
                    }

                cButton.addEventListener("click", convertToCelsius)
                }

                fButton.addEventListener("click", convertToFarenheit)

            // Timestamp

            let formatDate = function updated (timestamp){
                let date = new Date (timestamp);
                let hours = date.getHours();
                let minutes = date.getMinutes();
                

                if (hours < 10){
                    return `${day} 0${hour}:${minute}`
                }
                if(minutes < 10){
                    return `${day} ${hour}:0${minute}`
                }
                else{
                    return `${day} ${hour}:${minute}`
                }
            }

            let headerP = document.querySelector("header p")
            headerP.innerHTML = `Weather Station in: ${response.data.sys.country}<br>
                Last updated at: ${formatDate(response.data.dt * 1000)}`

            
            img.setAttribute(
                "src",
                `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`) 


            // Forecast
            

            function forecastApi (){

                let key = "3fefe32c502f2c470839a5386891b04a"
                let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=metric`

                function forecast(response){
                    console.log(response.data)

                    let formatDate = function (timestamp){
                    let date = new Date (timestamp);
                    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    let day = days[date.getDay()];
                    return `${day}`}
            

                    let day1 = document.querySelector(".day-1")
                    let day2 = document.querySelector(".day-2")
                    let day3 = document.querySelector(".day-3")
                    let day4 = document.querySelector(".day-4")
                    let day5 = document.querySelector(".day-5")

                    day1.innerHTML =`<h6>${formatDate(response.data.list[1].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}" >
                                   
                                    <div class="temp">${Math.round(response.data.list[1].main.temp)} °C</div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[1].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[1].main.humidity} %</li>
                                        </ul>`

                    day2.innerHTML =`<h6>${formatDate(response.data.list[13].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[13].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[13].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[13].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[13].main.humidity} %</li>
                                        </ul>`

                    day3.innerHTML =`<h6>${formatDate(response.data.list[21].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[25].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[21].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[21].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[21].main.humidity} %</li>
                                        </ul>`
                                        
                    day4.innerHTML =`<h6>${formatDate(response.data.list[29].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[29].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[29].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[29].main.humidity} %</li>
                                        </ul>`

                    day5.innerHTML =`<h6>${formatDate(response.data.list[37].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[37].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[37].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[37].main.humidity} %</li>
                                        </ul>`                                                                                


            }
                axios.get(url).then(forecast)
            }

            forecastApi();
            

        }

        axios.get(apiUrl).then(dataLog)
    }
}

button.addEventListener("click", currentTemp)


// search

let form = document.querySelector("form");

function search (event){
    event.preventDefault();

    let apiKey = "3fefe32c502f2c470839a5386891b04a"
    let city = input.value
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    function display (response){
        console.log(response.data)

        let city = document.querySelector(".city")
        let temperature = document.querySelector(".temperature")
        let img = document.querySelector("header img")
        let descriptionHeader = document.querySelector("header .description")

        city.innerHTML = `${input.value}`
        temperature.innerHTML = `${Math.round(response.data.main.temp)} °C`
        descriptionHeader.innerHTML = 
            `<ul>
                <li>Feels like: ${Math.round(response.data.main.feels_like)} <span class="unit">°C</span></li>
                <li>Wind speed: ${Math.round(response.data.wind.speed)} km/h</li>
                <li>Humidity: ${response.data.main.humidity}%</li>
            </ul>`

        let units = document.querySelector(".units")
        units.innerHTML = `Show in <span class="celsius"> °C </span>  | <span class="farenheit"> °F </span> `

                    //Units

                	let fButton = document.querySelector(".farenheit");

                    function convertToFarenheit(event){
                    event.preventDefault();
                    let farenheitTemperature = Math.round((response.data.main.temp*9/5)+32)
                    
                    temperature.innerHTML = `${farenheitTemperature} °F `

                    let cButton = document.querySelector(".celsius");

                        function convertToCelsius(event){
                        event.preventDefault();
                        temperature.innerHTML = `${Math.round(response.data.main.temp)} °C `
                        }

                    cButton.addEventListener("click", convertToCelsius)
                    }

                    fButton.addEventListener("click", convertToFarenheit)

                // Timestamp    

        let formatDate = function updated (timestamp){
        let date = new Date (timestamp);
        let hours = date.getHours();
        let minutes = date.getMinutes();
                

        if (hours < 10){
            return `${day} 0${hour}:${minute}`
        }
        if(minutes < 10){
            return `${day} ${hour}:0${minute}`
        }
        else{
            return `${day} ${hour}:${minute}`
        }
        }

        let headerP = document.querySelector("header p")
        headerP.innerHTML = `Weather Station in: ${response.data.sys.country}<br>
            Last updated at: ${formatDate(response.data.dt * 1000)}`
            
        img.setAttribute(
            "src",
            `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)


                        // Forecast
            

            function forecastApiSearch (){

                let key = "3fefe32c502f2c470839a5386891b04a"
                let cityName = input.value
                let url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${key}&units=metric`

                function forecast(response){
                    console.log(response.data)

                    let formatDate = function (timestamp){
                    let date = new Date (timestamp);
                    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                    let day = days[date.getDay()];
                    return `${day}`}
            

                    let day1 = document.querySelector(".day-1")
                    let day2 = document.querySelector(".day-2")
                    let day3 = document.querySelector(".day-3")
                    let day4 = document.querySelector(".day-4")
                    let day5 = document.querySelector(".day-5")

                    day1.innerHTML =`<h6>${formatDate(response.data.list[1].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}" >
                                   
                                    <div class="temp">${Math.round(response.data.list[1].main.temp)} °C</div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[1].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[1].main.humidity} %</li>
                                        </ul>`

                    day2.innerHTML =`<h6>${formatDate(response.data.list[13].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[13].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[13].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[13].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[13].main.humidity} %</li>
                                        </ul>`

                    day3.innerHTML =`<h6>${formatDate(response.data.list[21].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[25].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[21].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[21].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[21].main.humidity} %</li>
                                        </ul>`
                                        
                    day4.innerHTML =`<h6>${formatDate(response.data.list[29].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[29].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[29].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[29].main.humidity} %</li>
                                        </ul>`

                    day5.innerHTML =`<h6>${formatDate(response.data.list[37].dt * 1000)}</h6>
                                    <img src=" https://openweathermap.org/img/wn/${response.data.list[1].weather[0].icon}@2x.png" alt="${response.data.list[1].weather[0].main}">
                                    <div class="temp">${Math.round(response.data.list[37].main.temp)} °C  </div>
                                    
                                        <ul>
                                            <li>Wind speed: ${Math.round(response.data.list[37].wind.speed)} km/h </li>
                                            <li>Humidty: ${response.data.list[37].main.humidity} %</li>
                                        </ul>`                                                                                


            }
                axios.get(url).then(forecast)
            }

            forecastApiSearch();


         
    }
   

    axios.get(apiUrl).then(display)

}

form.addEventListener("submit", search)


// Forecast

