//Dependencies
var request = require("request");
var cheerio = require("cheerio");
var path = require("path");
var express = require("express");
var router = express.Router();
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");

router.get("/scrape", function(req, res){    

    request("https://www.nytimes.com/section/technology/personaltech?module=SectionsNav&action=click&version=BrowseTree&region=TopBar&contentCollection=Tech%2FPersonal%20Tech&contentPlacement=2&pgtype=sectionfront", function(error, response, html) {

	    var $ = cheerio.load(html);
	    
        $(".story.theme-summary").each(function(i, element) {

	      	var newArticle = new Article({
	      		url: $(element).find('.story-body>.story-link').attr('href'),
           		title: $(element).find('h2.headline').text().trim(),
            	summary: $(element).find('p.summary').text().trim()
	   		})

	   		Article.create(newArticle, function(error, doc) {
			      if (error) {
			      	console.log(error)
			      }
		  	});	
		});
		res.json("Success!");
  	});
});

module.exports = router;