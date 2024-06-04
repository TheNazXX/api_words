const { Schema, model } = require("mongoose");

const SentenceShema = {
  en: { type: String, require: true },
  translate: { type: String, require: true },
};

module.exports = model("Sentence", SentenceShema);
