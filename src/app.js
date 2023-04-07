const express = require('express');
const router = require('./routes/router.js');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/api', router);

module.exports = app;
