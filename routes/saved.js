//Dependencies
var path = require("path");
var express = require("express");
var Article = require("../models/Article.js");
var router = express.Router();
var Note = require("../models/Note.js");

router.get('/saved', function(req, res) {

  // Find every Article in the articles array
  Article.find({saved: true}).sort({"date": 1})
  .populate("note")
    .exec(function(error, articles) {
        if (error) {
            console.log(error);
        } else {

            var data = {
                articles: articles
            };
            res.render('saved', data);
        }
    });
});

// Updating Article as Saved
router.get('/saved/:id', function(req, res) {
    var id = req.params.id;
    Article.update(
        {
          _id: id
        },
        {
            $set: {
                saved: true
            }
        },
        function(error, edited) {
            if (error) {
                console.log(error);
            } else {
                res.json("Article Saved!")
            }
        }
    );
});

// Updating Articles as Unsaved
router.get("/unsave/:id", function(req, res){

    var id = req.params.id;
    Article.update(
        {
          _id: id
        },
        {
            $set: {
                saved: false
            }
        },
        function(error, edited) {
            if (error) {
                console.log(error);
            } else {
                res.redirect("/saved")
            }
        }
    );
});
  
module.exports = router;

