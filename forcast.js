class Forcast {
  constructor() {
    const weatherData = require("./data/weather.json");
    this.cityName = weatherData.map((cityName) => cityName.city_name);
    this.date = weatherData.map((item) =>
      item.data.map((index) => index.valid_date)
    );
    this.description = weatherData.map((item) =>
      item.data.map((index) => index.weather.description)
    );
    this.low = weatherData.map((item) =>
      item.data.map((index) => index.low_temp));
    this.high = weatherData.map((item) =>
      item.data.map((index) => index.max_temp));
  }

  Amman() {
    let date = this.date[2]
    let description = this.description[2]
    let low = this.low[2]
    let high = this.high[2]
    const reponseData = [
      {
        description: `Low of ${low[0]}, high of ${high[0]} with ${description[0]}`,
        date: date[0],
      },
      {
        description: `Low of ${low[1]}, high of ${high[1]} with ${description[1]}`,
        date: date[1],
      },
      {
        description: `Low of ${low[2]}, high of ${high[2]} with ${description[2]}`,
        date: date[2],
      },
    ];
    return reponseData;
  }

  Seattle() {
    let date = this.date[0]
    let description = this.description[0]
    let low = this.low[0]
    let high = this.high[0]
    const reponseData = [
      {
        description: `Low of ${low[0]}, high of ${high[0]} with ${description[0]}`,
        date: date[0],
      },
      {
        description: `Low of ${low[1]}, high of ${high[1]} with ${description[1]}`,
        date: date[1],
      },
      {
        description: `Low of ${low[2]}, high of ${high[2]} with ${description[2]}`,
        date: date[2],
      },
    ];
    return reponseData;
  }

  Paris() {
    let date = this.date[1]
    let description = this.description[1]
    let low = this.low[1]
    let high = this.high[1]
    const reponseData = [
      {
        description: `Low of ${low[0]}, high of ${high[0]} with ${description[0]}`,
        date: date[0],
      },
      {
        description: `Low of ${low[1]}, high of ${high[1]} with ${description[1]}`,
        date: date[1],
      },
      {
        description: `Low of ${low[2]}, high of ${high[2]} with ${description[2]}`,
        date: date[2],
      },
    ];
    return reponseData;
  }

}

const data = new Forcast();

module.exports.amman = data.Amman();
module.exports.paris = data.Paris();
module.exports.seattle = data.Seattle();
