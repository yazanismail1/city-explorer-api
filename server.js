require('dotenv').config();
const express = require('express'); 
const server = express();
const cors = require('cors');
const PORT = process.env.PORT
server.use(cors());
const axios = require('axios');


//http:localhost:PORT/
server.get('/',(req,res)=>{
    res.send("Hi from the home route");
})

//http:localhost:PORT/weatherData?lon=lon&lat=lat
server.get('/weatherData', getWeatherDataFunction);

//http:localhost:PORT/movie?cityName=cityName
server.get('/movie', getMovieDataFunction);

// Wrong entry route
server.get('*',(req,res)=>{
    res.send("404");
})

// To active the server
server.listen(PORT, () => {
    console.log(`Hello, I am listening in ${PORT}`);
})


//----- CLASSES -----//

// Weather Class

class WeatherData {
    constructor(item){
        this.title = item.datetime;
        this.low_temp = item.low_temp;
        this.max_temp = item.max_temp;
        this.description = item.weather.description;
    }
}

// Movie Class

class MovieData {
    constructor(item){
        this.title = item.title;
        this.overview = item.overview;
        this.vote_average = item.vote_average;
        this.vote_count = item.vote_count;
        this.poster_path = "https://image.tmdb.org/t/p/w500/" + item.poster_path;
        this.popularity = item.popularity;
        this.release_date = item.release_date;
    }
}

//----- FUNCTIONS -----//

// Get Weather Data Function
async function getWeatherDataFunction(req,res) {
    const lon = req.query.lon;
    const lat = req.query.lat;
    const URL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lon=${lon}&lat=${lat}`;

    axios.get(URL).then( result => {
        let sendData = result.data.data.map( item => {
            return new WeatherData(item);
        })
        return res.status(200).send(sendData);
    }).catch(error => {
        return res.status(404).send(error)
    })
}

// Get Movie Data Function

async function getMovieDataFunction(req,res) {
    const cityName = req.query.cityName;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${cityName}&page=1&include_adult=true`;

    axios.get(URL).then( result => {
        let sendData = result.data.results.map( item => {
            return new MovieData(item);
        })
        return res.status(200).send(sendData);
    }).catch(error => {
        return res.status(404).send(error)
    })
}