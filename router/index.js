const Router = require("express").Router;
const router = new Router();
const { body } = require("express-validator");

const userController = require("../controllers/user-controller");
const WordsController = require("../controllers/words-controller");
const RepeatWordsController = require("../controllers/repeatWords-controller");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({
    min: 3,
    max: 32,
  }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);

router.get("/refresh", userController.refresh);
router.get("/users", userController.getUsers);

//----------------Words-----------------//

router.post("/addWord", WordsController.addWord);
router.get("/words", WordsController.getWords);

router.get("/word", WordsController.getWord);
router.delete("/word", WordsController.deleteWord);

//----------------Repeat-Words-----------------//

router.post("/repeat-word", RepeatWordsController.addWord);
router.get("/repeat-words", RepeatWordsController.getAllWords);

module.exports = router;
