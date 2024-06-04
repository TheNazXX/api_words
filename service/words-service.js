const WordModel = require("../models/word-model");

class WordsService {
  async addWord(word) {
    const wordInDB = await WordModel.findOne({ en: word.en });

    if (wordInDB) {
      throw new Error("Word already exists");
    }

    const wordData = WordModel.create(word);

    return wordData;
  }

  async getWords() {
    const words = await WordModel.find({});
    return words;
  }

  async getWord(word) {
    const wordData = await WordModel.findOne({ en: word });
    return wordData;
  }

  async deleteWord(word) {
    const wordData = await WordModel.deleteOne({ en: word });
    return wordData;
  }
}

module.exports = new WordsService();
