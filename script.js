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
            temperature.innerHTML = `${Math.round(response.data.main.temp)}`
            descriptionHeader.innerHTML = 
                `<ul>
                    <li>Feels like: ${Math.round(response.data.main.feels_like)} <span class="unit">°C</span></li>
                    <li>Wind speed: ${Math.round(response.data.wind.speed)} km/h</li>
                    <li>Humidity: ${response.data.main.humidity}%</li>
                </ul>`

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
            headerP.innerHTML = `Weather Station in: ${response.data.name}<br>
                Last updated at: ${formatDate(response.data.dt * 1000)}`

            
            img.setAttribute(
                "src",
                `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
            ) 
        }

        axios.get(apiUrl).then(dataLog)
    }
}

button.addEventListener("click", currentTemp)