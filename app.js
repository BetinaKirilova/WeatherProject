// Set up
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");
const https = require("https");


const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


  let temp = "ddd";
  let query = "sgjs";
  let feelsLike = "DDsa";
  let description = "jasgas";
  let icon ="sndjav";

//Get methods
app.get("/", function (req, res) {
    res.render("home", { });
  });

app.get("/result", function (req, res) {
    res.render("result", { descrition: description, query:query, temp:temp, feelsLike:feelsLike, icon:icon});

 });

//Post methods
app.post("/result", function(req,res){

    var city = req.body.city;
    const query = city;
    const key = "16147801b9b295bbb14d06dd3e0d5dd8";
    const units = "metric";
  
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${key}&units=${units}`;
    //GET method for the request
    https.get(url, function (response) {
      console.log(response.statusCode);
      //Event handler for the weather data
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
         temp = weatherData.main.temp;
         feelsLike = weatherData.main.feels_like;
         description = weatherData.weather[0].description;
         icon = weatherData.weather[0].icon;
  
         res.render("result", { descrition: description, query:query, temp:temp, feelsLike:feelsLike, icon:icon});
         res.send();
      });
    });
  
    console.log(city);
    console.log("post is workin");
    
});

//Spin server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is on http://localhost:${port}`)
  })