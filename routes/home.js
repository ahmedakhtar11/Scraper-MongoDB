//Dependencies
var path = require("path");
var express = require("express");
var router = express.Router();

var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get('/', function(req, res) {

	Article.find().sort({createdAt: 1})
  	.exec(function(error, articles) {
    	if (error) {
      		console.log(error); 
    	} else {

    	var data = {
				articles: articles
			};

      		res.render('home', data);
    	}
  	});
});

module.exports = router;