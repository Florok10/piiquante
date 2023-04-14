const express = require('express');
const router = require('./routes/router.js');
const helmet = require('helmet');

const app = express();

app.use(helmet());
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Origin'
  );
  res.setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/api', router);

module.exports = app;
