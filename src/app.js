const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');

const { logRequest } = require('./logger/log-request');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');
const { handlerErrors } = require('./resources/handlerErrors');
const { logger } = require('./logger/index');

process.on('uncaughtException', err => {
  logger.error({
    name: 'uncaughtException',
    message: err.message
  });
  const { exit } = process;
  logger.on('finish', () => exit(1));
});

// throw new Error('I am synchronous error and I am elusive');

process.on('unhandledRejection', err => {
  logger.error({
    name: 'unhandledRejection',
    message: err.message
  });
  const { exit } = process;
  logger.on('finish', () => exit(1));
});

// throw new Error('I am asynchronous error and I am elusive');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(logRequest);

app.use('/users', userRouter);

app.use('/boards', boardRouter);

app.use(handlerErrors);

// eslint-disable-next-line
app.use((err, req, res, next) => {
  logger.error({
    status: `${INTERNAL_SERVER_ERROR}`,
    message: getStatusText(INTERNAL_SERVER_ERROR)
  });
  res.status(INTERNAL_SERVER_ERROR).send(getStatusText(INTERNAL_SERVER_ERROR));
});

module.exports = app;
