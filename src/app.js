const hbs = require("hbs");
const path = require("path");
const express = require("express");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();

const port = process.env.PORT || 3000;

const pathFile = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const hbsPath = path.join(__dirname, "../templates/partials");

app.use(express.static(pathFile));

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(hbsPath);

app.get("", (req, res) => {
  res.render("index", {
    name: "Andi",
    age: 21,
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "About me",
    age: 21,
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    name: "Help Page",
    help: "With what can i help you ask something",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Use addres on API",
    });
  }

  const address = req.query.address;

  const location = req.query.location;
  geocode(address, (error, { latitude, longtitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longtitude, (error, forecatData) => {
      console.log(forecatData);
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        degree: forecatData.degree,
        weather: forecatData.weather,
        cloud: forecatData.cloud,
        location: req.query.address,
      });
    });
  });

  // res.send({
  //   forecast: forecast,
  //   location: location,
  //   address: address,
  //   koka: "e bardh",
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must use a search for api",
    });
  }
  console.log(req.query);

  res.send({
    product: [],
  });
});

app.listen(port, () => {
  console.log("Filloj kodi " + port);
});
