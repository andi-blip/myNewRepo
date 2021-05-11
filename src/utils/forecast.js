const request = require("postman-request");

const forecast = (latitude, longtidude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c206d17e7d43529e4656e6c616564f5c&query=" +
    encodeURIComponent(latitude) +
    ",";
    encodeURIComponent(longtidude) + "&units=f";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      callback("Coudn't connect to weather sevice", undefined);
    } else if (response.body.error) {
      callback("Coudn't find the data in lant and long", undefined);
    } else {
      callback(undefined, {
        degree: response.body.current.wind_degree,
        weather: response.body.current.weather_descriptions[0],
        cloud: response.body.current.cloudcover,
      });
    }
  });
};

module.exports = forecast;
