const repeatWordsService = require("../service/repeatWords-service");
const WordsService = require("../service/words-service");

class WordsController {
  async addWord(req, res, next) {
    try {
      const wordData = await WordsService.addWord(req.body);

      await repeatWordsService.addWord(req.body);

      return res.json({
        word: wordData,
        message: "Words was added successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  async getWords(req, res, next) {
    const wordsData = await WordsService.getWords();
    return res.json(wordsData);
  }

  async getWord(req, res, next) {
    const word = req.query.word;

    const wordData = await WordsService.getWord(word);

    return res.json({
      words: wordData,
    });
  }

  async deleteWord(req, res, next) {
    try {
      const word = req.query.word;

      const wordData = await WordsService.deleteWord(word);
      await repeatWordsService.deleteWord(word);

      return res.json({
        data: wordData,
        message: "word was deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new WordsController();
