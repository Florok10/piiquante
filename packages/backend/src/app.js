const express = require('express');
const router = require('./routes/router.js');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');

require('dotenv').config();

const app = express();

const PORT = process.env.APP_PORT || 3000;

app.set('port', PORT);
app.use(helmet());
app.use(
  mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      console.warn(`This request[${key}] is sanitized`, req);
    },
  })
);
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
  next();
});

app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/api', router);

module.exports = app;
