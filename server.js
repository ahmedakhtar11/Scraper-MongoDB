// Dependencies
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

// Models
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

// Routes
var home = require('./routes/home.js');
var saved = require('./routes/saved.js');
var scraped = require('./routes/scraped.js');
var deleteArticles = require('./routes/delete.js');
var note = require('./routes/note.js');

// Initialize Express
var app = express();

// Setting up Handlebars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false}));
app.use(logger("dev"));

/* Setting Public Folder */
app.use(express.static(path.join(__dirname, 'public')));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";
mongoose.Promise = Promise;

mongoose.connect(MONGODB_URI, function (err, db) {
  	if (err) {
    	console.log('Unable to connect to the mongoDB server. Error:', err);
  	} else {
    	console.log('Connection established to', MONGODB_URI);
	}
});

var db = mongoose.connection;

// Return any mongoose database errors
db.on("error", function(error) {
	console.log("Mongoose Error: ", error);
});

// Return Success Message after Successful connection.
db.once("open", function() {
 	console.log("Mongoose connection successful.");
});

app.use('/', home);
app.use('/', saved);
app.use('/', scraped);
app.use('/', deleteArticles);
app.use('/', note);

var PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});

module.exports = app;