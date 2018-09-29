const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  headline: { type: String, required: true, unique: true },
  author: { type: String },
  snippet: String,
  url: String,
  date: { type: Date, default: Date.now },
  note: String
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
