let lat = null;
let lon = null;
let apiKey = '962fb92318ef083c21b54cb6711d4e28' ;
let cityName = document.getElementById('cityName');
let descrip = document.getElementById('descrip');
let currentTemper = document.getElementById('currentTemper');
let owmdata;
function onPositionReceived(position){
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
}

window.onload = function() {
    this.getWeather();
    setTimeout(function(){
        this.setInterfaceValues();
    },1000)
    
}
function onPositionNotReceived(positionError){
    console.log(positionError)
}
function getLocation(){
   if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onPositionReceived, onPositionNotReceived);
   }
}

function getWeather(){
    getLocation();
    setTimeout(function(){
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=bb40a37cfe32d49bd09d9622ada1561a`)
        .then(response => response.json())
        .then(data => this.owmdata = data)

    .catch(err => alert("Wrong something!"))
    }, 10);
    
    
}

function setInterfaceValues(){
    this.cityName.innerHTML = this.owmdata.name;
    this.descrip.innerHTML = this.owmdata.weather[0].description;
    this.currentTemper.innerHTML = Math.round(this.owmdata.main.temp - 273.15) + 'ºC';

}