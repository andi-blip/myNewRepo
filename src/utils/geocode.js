const request = require("postman-request");

const geocode = (address, callback) => {
  const newUrl =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYW5kaWRlbWkiLCJhIjoiY2tvY3p5bTZuM2VweTJwbHB1aW54MzNpMSJ9.wOhZAj7CFLAMTbxi7aAXOQ&limit=1";
  request({ url: newUrl, json: true }, (error, response) => {
    if (error) {
      callback("Coudn't connect to weather sevice", undefined);
    } else if (response.body.features.length == 0) {
      callback("Coudn't find the data in lant and long", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.features[0].center[1],
        longtidude: response.body.features[0].center[0],
        location: response.body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
