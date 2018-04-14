var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// Schema to Hold Articles
var SchemaArticles = new Schema({

    //Title Field
    title: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    //Summary Field
    summary: {
        type: String,
        trim: true
    },
    //Url Field
    url: {
        type: String,
        trim: true
    },
    //Saved Field
    saved: {
        type: Boolean,
        default: false
    },

    note: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ]
});

var Article = mongoose.model("Article", SchemaArticles);

module.exports = Article;