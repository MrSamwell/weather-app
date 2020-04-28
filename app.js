
new Vue({
    el: '#app',
    data: {
        lat : null,
        lon : null,
        owmdata: '-'
    },
    methods: {
        onPositionReceived: function(position){
            this.lat = position.coords.latitude;
            this.lon = position.coords.longitude; 
            this.getWeather();
        },
        onPositionNotReceived: function(positionError){
            alert(positionError);
        },
        getLocation: function(){
            if(navigator.geolocation){
                 navigator.geolocation.getCurrentPosition(this.onPositionReceived, this.onPositionNotReceived);
            }
         },
         getWeather: function(){
            
                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=bb40a37cfe32d49bd09d9622ada1561a`)
                .then(response => response.json())
                .then(data => {this.owmdata = data;
               })
            .catch(err => alert("Wrong something!!!"))
            
        }
       
    },
    mounted: function(){
        this.getLocation();
    }

})