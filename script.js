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


//