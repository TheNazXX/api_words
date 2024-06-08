module.exports = class Words_Error extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static WordExsists() {
    return new Words_Error(400, "Words already exists!");
  }
};
