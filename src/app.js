const express = require('express');
const router = require('./routes/router.js');
const helmet = require('helmet');

const app = express();

app.use(helmet());

app.use(router);

module.exports = app;
