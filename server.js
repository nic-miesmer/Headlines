const express = require("express");
const bodyparser = require("body-parser");
//connection to mongodb
const mongoose = require("mongoose");
//promised based http library
const axios = require("axios");
//cheerio webscraping
const cheerio = require("cheerio");

// allows are database to use the schemas we defined in models directory
const db = require("./models");

const PORT = 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: true}));
app.use(express.static("public"));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/headlines";

mongoose.connect(MONGODB_URI,  { useNewUrlParser: true });

//use this for now to check scrape like class activity
const scrapeSite = "http://www.echojs.com/"


//ENDPOINTS

//scrape articles and save to DB

//view all articles

//view one article

//leave a comment















app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  