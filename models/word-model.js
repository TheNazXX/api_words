const { Schema, model } = require("mongoose");
const { SentenceSchema } = require("./sentence-model");

const WordSchema = new Schema({
  en: { type: String, unique: true, required: true },
  translate: { type: [String], required: true },
  partOfSpeech: { type: String, required: false },
  unit: { type: String, required: false },
  synonyms: { type: [String], required: false },
  sentences: { type: [SentenceSchema], required: false },
  difficult: { type: Boolean, required: false },
  datestamp: { type: Date, required: true },
});

module.exports = model("Word", WordSchema);
