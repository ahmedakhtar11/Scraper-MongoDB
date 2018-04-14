//Dependencies
var path = require("path");
var express = require("express");
var router = express.Router();
var Note = require("../models/Note.js");
var Article = require("../models/Article.js");


router.get('/note/:id', function(req, res) {
    //Adding Notes for Each Article
    var ArticleId = req.params.id;   
	Article.findOne({"_id": req.params.id })
  	.populate("note")
  	.exec(function(error, article) {
    	if (error) {
      		console.log(error);
    	} else {
            var data = {
                article: article,
                ArticleId: ArticleId
            }
                res.json(data)        
    	}
  	});

});

// Saving a New Note
router.post('/save/note/:id', function(req, res) {

  var ArticleId = req.params.id;
	// Creating a New Note
 	var newNote = new Note(req.body);

  	newNote.save(function(error, result) {
    	if (error) {
      		console.log(error);
    	} else {

            // Update Notes by Article Id.
            Article.findOneAndUpdate({ _id: ArticleId }, { $push: { note: result._id } }, { new: true })

            .exec(function(err, note) {
                if (err) {
                  console.log(err);
                } else {

                    var data = {
                        note: newNote,
                        ArticleId: ArticleId,
                        noteid: result._id
                    }
                  res.json(data);
                }
            });
        }
    });
});

//Deleting all Notes
router.get('/delete/:id', function(req, res) {

    var noteid = req.params.id;
    Note.remove({_id: noteid}, function(err){
        if (err) {
            console.log(err);
        } else {
            res.json("Sucessfully Deleted!");
        }
    });
});

module.exports = router;