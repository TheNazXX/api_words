const WordsService = require("../service/words-service");
const stripe = require("stripe")(
  "sk_test_51PMOn8RuHZHrqSSF8Yagh5qXxznwvfG3PB2mW61GF8WgOQUzs4jCvOWXywTxJ2IAwDQg8e67lxY9eAh69yqDfVVY00RbTJELr3"
);

class WordsController {
  async addWord(req, res, next) {
    console.log(req.body);
    const wordData = await WordsService.addWord(req.body);
    return res.json({
      word: wordData,
      message: "Words was added successfully",
    });
  }

  async getWords(req, res, next) {
    const wordsData = await WordsService.getWords();
    return res.json(wordsData);
  }

  async getWord(req, res, next) {
    const word = req.query.word;

    const wordData = await WordsService.getWord(word);

    return res.json({
      data: wordData,
    });
  }

  async deleteWord(req, res, next) {
    const word = req.query.word;

    const wordData = await WordsService.deleteWord(word);

    return res.json({
      data: wordData,
      message: "word was deleted successfully",
    });
  }
}

module.exports = new WordsController();
