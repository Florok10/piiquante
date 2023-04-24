class SauceNotFoundError extends Error {
  constructor() {
    super("The sauce wasn't found");
    this.code = 404;
  }
}

module.exports = {
  SauceNotFoundError,
};
