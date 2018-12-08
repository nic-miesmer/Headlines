const express = require("express");
const bodyparser = require("body-parser");
const expressHandlebars = require("express-handlebars")
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// allows are database to use the schemas we defined in models directory
const db = require("./models");

const PORT = 3000;

const app = express();

app.use(bodyparser.urlencoded({ extended: true}));
app.use(express.static("public"));

// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/headlines";

mongoose.connect(MONGODB_URI,  { useNewUrlParser: true });

//use this for now to check scrape like class activity
const scrapeSite = "http://www.echojs.com/"
// const scrapeSite = "http://www.siliconera.com/"
//ENDPOINTS

//scrape articles and save to DB
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  axios.get(scrapeSite).then(function(response) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(response.data);

    // Now, we grab every h2 within an article tag, and do the following:
    $("article h2").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("a")
        .text();
      result.link = $(this)
        .children("a")
        .attr("href");
      result.summary = $(this)
        .children("a")
        .text();

      // Create a new Article using the `result` object built from scraping
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    res.send("Scrape Complete");
  });
});

//view all articles
// Route for getting all Articles from the db
app.get("/articles", function(req, res) {
  // Grab every document in the Articles collection
  db.Article.find({})
    .then(function(dbArticle) {
      // If we were able to successfully find Articles, send them back to the client
      res.json(dbArticle);
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

//view one article

//leave a comment

app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
  