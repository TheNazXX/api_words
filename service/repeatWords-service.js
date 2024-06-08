const Words_Error = require("../exceptions/WordsModel/word-model");
const { RepeatWordModel } = require("../models/word-model");

class RepeatWordsService {
  async addWord(data) {
    let dataFromDb;

    if (data instanceof Array) {
      await RepeatWordModel.deleteMany({});
      dataFromDb = await RepeatWordModel.insertMany(data);
    } else {
      const isWord = await RepeatWordModel.findOne({ en: data.en });

      if (isWord) {
        throw Words_Error.WordExsists();
      }

      dataFromDb = await RepeatWordModel.create(data);
    }

    return dataFromDb;
  }

  async getAllWords() {
    const words = await RepeatWordModel.find({});
    return words;
  }

  async deleteWord(word) {
    await RepeatWordModel.deleteOne({ en: word });
  }
}

module.exports = new RepeatWordsService();
