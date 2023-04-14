class SauceNotFoundError extends Error {
  constructor() {
    super('Sauce not found');
    this.code = 400;
  }
}

module.exports = {
  SauceNotFoundError,
};
