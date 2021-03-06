var axios = require("axios");


// http://api.openweathermap.org/data/2.5/weather?q=London&APPID=6b548bc27eb953d1c156738e470bcb8b
const OPEN_WEATHER_MAP_URL = "https://api.openweathermap.org/data/2.5/weather?APPID=6b548bc27eb953d1c156738e470bcb8b&units=metric";

module.exports = {
    getTemp: function(location) {
        var encodedLocation = encodeURIComponent(location);
        var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

        var x = axios.get(requestUrl).then(function(res) {
            if(res.data.cod && res.data.message) {
                throw new Error(res.data.message);
            } else {
                return res.data.main.temp;
            }
        }, function(err) {
            // error case
            throw new Error(err.response.data.message);
            // throw new Error("Unable to fetch weather for that location");
        });

        // console.log(x);
        return x;
    }
}