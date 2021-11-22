const stream = require('stream');
const LimitExceededError = require('./LimitExceededError');

class LimitSizeStream extends stream.Transform {
  constructor(option) {
    super(option);
    this.limit = option.limit;
    this.encoding = option.encoding;
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
