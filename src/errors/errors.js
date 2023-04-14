class InternalError extends Error {
  constructor(err) {
    super(err);
    this.code = 500;
  }
}

module.exports = {
  InternalError,
};
