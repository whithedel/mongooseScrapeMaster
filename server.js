// requiring all dependencies for the app 
require("dotenv").config();
const express = require("express");
var exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");


// requiring all models to be used 
let db = require("./models");

// Initialize Express
const app = express();

// Port to be used on the app
const PORT = process.env.PORT || 3000;


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json());
// Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/mongooseScrapeMaster", { useNewUrlParser: true })
// .catch( err => console.log(err));

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI,{ useNewUrlParser: true })
// .catch( err => console.log(err));


//routes
require("./routes/scrapeRoutes")(app);
require("./routes/articlesRoutes")(app);
require("./routes/singleArticleRoutes")(app);
require("./routes/404Routes")(app);


// Starting the server, syncing our models ------------------------------------/
app.listen(PORT, function () {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",PORT,PORT);
});
