
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}));


app.get("/", function(req, res){
    res.sendFile(__dirname + "/Weather.html");
});


app.post("/", function(req, res){
    var cityName = req.body.city;
    var apiKey = "3d0083a962a6b1b082d6249938764ed6";
    

    https.get("https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=metric", function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const weatherDescription = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const weatherIcon = weatherData.weather[0].icon;

            res.send(`
                <h2>The weather in ${cityName} is currently ${weatherDescription}</h2>
                <p>The temporature is ${temp} degrees celcius</p>
                <img src=http://openweathermap.org/img/wn/${weatherIcon}@2x.png>
            `);
        });
    });

    
})


app.listen(3000, function(){
    console.log("server started at port 3000");
});


//  https://api.openweathermap.org/data/2.5/weather?q=London&appid=3d0083a962a6b1b082d6249938764ed6&units=metric
