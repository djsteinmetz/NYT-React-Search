const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  key: String,
  headline: { type: String, required: true },
  author: { type: String },
  snippet: String,
  url: String,
  date: { type: Date, default: Date.now },
  note: String
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
