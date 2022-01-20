const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const httpErrors = require('http-errors');

require('dotenv').config();

const { myLogger } = require('../../helpers/logger');
const errorHandler = require('./middlewares/errorHandler');
const originCors = require('../../../config/cors');
const routes = require('./routes/index');
require('../../drivers/index');

const basePath = process.env.BASE_PATH || '/';
const app = express();
const corsOptions = {
  origin: originCors[app.get('env')] || originCors.development,
  optionsSuccessStatus: 200,
};

if (app.get('env') === 'production') {
  app.use(helmet());
} else {
  app.use(helmet({
    frameguard: false,
  }));
}

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: 1024102420, type: 'application/json' }));

app.use(basePath, routes);

app.use((req, res, next) => {
  next(httpErrors.NotFound());
});

app.use(errorHandler);

app.listen(process.env.REST_PORT || 3000);

myLogger.info(
  'express',
  `Server running on port: ${process.env.REST_PORT || 3000}`,
);

module.exports = app;
