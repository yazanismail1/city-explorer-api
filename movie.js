const axios = require('axios');

//----- FUNCTIONS -----//

// Get Movie Data Function

async function getMovieDataFunction(req,res) {
    const cityName = req.query.cityName;
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_KEY}&language=en-US&query=${cityName}&page=1&include_adult=false`;
    
    axios.get(URL).then( result => {
        let sendData = result.data.results.map( item => {
            return new MovieData(item);
        })
        return res.status(200).send(sendData);
    }).catch(error => {
        return res.status(404).send(error)
    })
}


//----- CLASSES -----//

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

module.exports = getMovieDataFunction;
