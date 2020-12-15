const { logger } = require('../logger/index');
// eslint-disable-next-line
const logErrors = (err, req, res, next) => {
  const { body, query, originalUrl, method } = req;
  logger.error({
    status: err.message,
    statusText: err.name,
    method,
    message: JSON.stringify({ originalUrl, body, query })
  });
};

module.exports = { logErrors };
