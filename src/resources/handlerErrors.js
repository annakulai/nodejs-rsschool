const { ClientError } = require('./error-classes');
const { logger } = require('../logger/index');

const handlerErrors = (err, req, res, next) => {
  if (err instanceof ClientError) {
    const { body, query, originalUrl, method } = req;
    logger.error({
      status: err.message,
      statusText: err.name,
      method,
      message: JSON.stringify({ originalUrl, body, query })
    });
    res.status(err.message).send(err.name);
    return;
  }
  next(err);
};

module.exports = { handlerErrors };
