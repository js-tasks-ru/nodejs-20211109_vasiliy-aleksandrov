const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.limit = options.limit;
    this.encoding = options.encoding;
    this.fileSize = 0;
  }

  _transform(chunk, encoding, callback) {

      this.fileSize += chunk.length;

      if (this.fileSize > this.limit) {
         return callback(new LimitExceededError());
      } else {
        callback(null, chunk);
      }

  }
}

module.exports = LimitSizeStream;
