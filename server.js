require('dotenv').config();
const express = require('express'); 
const cors = require('cors');
const server = express();

const weatherData = require('./data/weather.json')


server.use(cors());

const PORT = process.env.PORT

const Forcast = require("./forcast");

//http:localhost:PORT/
server.get('/',(req,res)=>{
    res.send("Hi from the home route");
})

//http:localhost:PORT/weather?name=cityName&lon=lon&lat=lat
server.get('/weather',(req,res)=>{
    const result = weatherData.find( (item) => {
        if(item.lat === req.query.lat && item.lon === req.query.lon){
            if(req.query.name.toLowerCase() === "amman"){
                return res.send(Forcast.amman);
            } else if (req.query.name.toLowerCase() === "paris"){
                return res.send(Forcast.paris);
            } else if (req.query.name.toLowerCase() === "seattle"){
                return res.send(Forcast.seattle);
            } 
        } 
    })
    res.send(result);
});

server.get('*',(req,res)=>{
    res.send("404");
})

server.listen(PORT, () => {
    console.log(`Hello, I am listening in ${PORT}`);
})