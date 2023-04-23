const mongoose = require('mongoose');
require('dotenv').config();

const { DB_URL, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const URL =
  DB_URL.replace('<user>', DB_USER).replace('<password>', DB_PASSWORD) +
  DB_NAME;

const connect = async () => {
  try {
    await mongoose.connect(URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to the database');
  } catch (err) {
    console.error('Database connection failed');
    console.log(err);
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
