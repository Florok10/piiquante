class UserValidationError extends Error {
  constructor(error) {
    super('User validation failed');
    this.error = error;
  }
}

class UserPasswordValidationError extends Error {
  constructor() {
    super(
      'The password does not match the rules, one special character (@$!%*#?&) and minimum 8 characters'
    );
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
  UserPasswordValidationError,
  UserDuplicateError,
  UserNotFoundError,
};
