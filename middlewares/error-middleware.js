const API_Error = require("../exceptions/api-error");

module.exports = function (error, req, res, next) {
  console.log(error);

  if (error instanceof API_Error) {
    return res
      .status(error.status)
      .json({ message: error.message, errors: error.errors });
  }

  return res.status(500).json({ message: "Internal server error" });
};
