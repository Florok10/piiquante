class InternalError extends Error {
  constructor() {
    super('Internal server error');
    this.code = 500;
  }
}

module.exports = {
  InternalError,
};
