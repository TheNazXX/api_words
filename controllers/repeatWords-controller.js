const RepeatWordsService = require("../service/repeatWords-service");

class RepeatWordsController {
  async addWord(req, res, next) {
    try {
      const wordData = await RepeatWordsService.addWord(req.body);

      return res.json({
        word: wordData,
        message: "Word was added successfully!",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllWords(req, res, next) {
    try {
      const words = await RepeatWordsService.getAllWords();

      return res.json({
        words,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteWord(req, res, next) {
    try {
    } catch (error) {}
  }
}

module.exports = new RepeatWordsController();
