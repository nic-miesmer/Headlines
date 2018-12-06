const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");
const bodyparser = require("body-parser");

const PORT = 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: true}));
app.use(express.static("public"));


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  