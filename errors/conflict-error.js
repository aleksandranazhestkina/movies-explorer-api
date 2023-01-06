const ERROR_CODE_CONFLICT = 409;

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_CONFLICT;
  }
}

module.exports = ConflictError;
