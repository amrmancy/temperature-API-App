

const express = require("express");
const app = express();
const https = require("https"); // to get access to an external server
const bodyParser= require("body-parser"); //body-parser is used to get elements from the body
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res) {
res.sendFile(__dirname+"/index.html");
});


app.post("/",function(req,res){
const Query = req.body.CityName;
const APIKey = "255a09fde53eec5f6f4a0b522c289b52";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + Query + "&appid=" + APIKey + "&units=metric";
https.get(url, function(response) {
  console.log(response.statusCode); // 200 means Ok
  response.on("data", function(data) {
    const WeatherData = JSON.parse(data); // is to convert the comming text from hexadicimal into JSON (JavaScript Object ...)
    const temp = WeatherData.main.temp;
    const icon = "http://openweathermap.org/img/wn/" + WeatherData.weather[0].icon + "@2x.png"
    // because res.send("<h1>the temprature is "+temp+" degree celcius.</h1>");//we can only use it Once

    res.write("<p>the Weather is currently: " + WeatherData.weather[0].description + "</p>");
    res.write("<h1>the temperature in "+Query+" is " + temp + " degree celcius.</h1>");
    res.write("<img src=" + icon + ">");
    res.send();
  })
})
});









app.listen(3000, function() {
  console.log("server is running on port 3000.")
})
