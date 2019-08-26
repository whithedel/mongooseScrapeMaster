const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')

let Schema = mongoose.Schema;

let ArticleSchema = new Schema({
  headline: {
    type: String,
    required: false
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
    required: false
  },

  url: {
    type: String,
    required: false
  },

  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

ArticleSchema.plugin(findOrCreate)

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
