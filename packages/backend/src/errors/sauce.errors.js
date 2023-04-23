class SauceNotFoundError extends Error {
  constructor() {
    super("The sauce wasn't found");
    this.code = 400;
  }
}

module.exports = {
  SauceNotFoundError,
};
