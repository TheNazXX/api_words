module.exports = class API_Error extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedUser() {
    return new API_Error(401, "User is unauthorized");
  }

  static BadRequest(message, errors = []) {
    return new API_Error(400, message, errors);
  }
};
