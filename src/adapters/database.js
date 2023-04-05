const mongoose = require('mongoose');

const connect = async () => {
  const dbUri = 'mongodb://localhost/piiquante';

  try {
    await mongoose.connect(dbUri);
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection failed');
    process.exit(1);
  }
};

const disconnect = async () => {
  await mongoose.connection.close();
};

module.exports = {
  connect,
  disconnect,
};
