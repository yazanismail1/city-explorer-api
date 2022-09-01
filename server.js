require('dotenv').config();
const express = require('express'); 
const server = express();
const PORT = process.env.PORT
const getWeatherDataFunction = require('./weather')
const getMovieDataFunction = require('./movie')
const cors = require('cors');
server.use(cors());



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
