class UserPasswordValidationError extends Error {
  constructor() {
    super(
      'The password does not match the rules, one special character (@$!%*#?&, no spaces allowed) and minimum 8 characters'
    );
    this.code = 400;
  }
}

class UserEmailValidationError extends Error {
  constructor() {
    super('The given email is not in a valid format');
    this.code = 400;
  }
}

class UserDuplicateError extends Error {
  constructor() {
    super('The given email is already used');
    this.code = 400;
  }
}

class UserNotFoundError extends Error {
  constructor() {
    super('User not found');
    this.code = 406;
  }
}

class UserWrongInformationsError extends Error {
  constructor() {
    super('The informations does not match any account');
    this.code = 401;
  }
}

module.exports = {
  UserPasswordValidationError,
  UserEmailValidationError,
  UserDuplicateError,
  UserNotFoundError,
  UserWrongInformationsError,
};
