const { getStatusText } = require('http-status-codes');

class ClientError extends Error {
  constructor(name) {
    super(name);
    this.name = getStatusText(name);
  }
}

class ServerError extends Error {
  constructor(name) {
    super(name);
    this.name = getStatusText(name);
  }
}
module.exports = { ClientError, ServerError };
