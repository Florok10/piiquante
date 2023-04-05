class UserValidationError extends Error {
  constructor(error) {
    super('Validation failed');
    this.error = error;
  }
}

class UserDuplicateError extends Error {
  constructor() {
    super('Duplicate email');
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
  }
}

module.exports = {
  UserValidationError,
  UserDuplicateError,
  UserNotFoundError,
};
