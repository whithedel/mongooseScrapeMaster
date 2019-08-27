const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  headline: {
    type: String,
    required: true,
    unique: true 
  },

  summary: {
    type: String,
    required: false
  },

  snippet: {
    type: String,
    required: false
  },

  picture: {
    type: String,
    required: true
  },

  url: {
    type: String,
    required: true,
    unique: true 
  },

  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
});

ArticleSchema.plugin(findOrCreate)

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
