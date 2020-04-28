
new Vue({
    el: '#app',
    data: {
        lat : null,
        lon : null,
        owmdata: '-',
        owmonecall: '-'
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
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${this.lat}&lon=${this.lon}&appid=bb40a37cfe32d49bd09d9622ada1561a`)
                .then(response => response.json())
                .then(data => {this.owmonecall = data;
                    })
                .catch(err => alert("Wrong something!!!"))

                fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${this.lat}&lon=${this.lon}&appid=bb40a37cfe32d49bd09d9622ada1561a`)
                .then(response => response.json())
                .then(data => {this.owmdata = data;
               })
            .catch(err => alert("Wrong something!!!"))
            
        },
        timeConverter: function (UNIX_timestamp){
            var weekday=new Array(7);
            weekday[1]="Monday";
            weekday[2]="Tuesday";
            weekday[3]="Wednesday";
            weekday[4]="Thursday";
            weekday[5]="Friday";
            weekday[6]="Saturday";
            weekday[0]="Sunday";
            var a = new Date(UNIX_timestamp * 1000);
            var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var day = a.getDay();
            var time = date + ' ' + month;
            return weekday[day];
          },
          kelvinToCelsius(kelvin){
              return Math.round(kelvin - 273.15);
          }
       
    },
    mounted: function(){
        this.getLocation();
    }

})