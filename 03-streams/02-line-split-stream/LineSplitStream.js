const stream = require('stream');
const os = require('os');

class LineSplitStream extends stream.Transform {
  constructor(options) {
    super(options);
    this.encoding = options.encoding; 
    this.remainingData = ''
  }

  _transform(chunk, encoding, callback) {
    let stringData = chunk.toString(this.encoding || 'utf-8');
    let updatedData = this.remainingData + stringData;
    this.remainingData = updatedData.slice(updatedData.lastIndexOf(os.EOL) + 1);
    updatedData = updatedData.lastIndexOf(os.EOL) === -1 ? '' : updatedData.slice(0, updatedData.lastIndexOf(os.EOL));

    updatedData.split(os.EOL).forEach((item) => {
      this.push(item);
    })
    callback();
  }

  _flush(callback) {
    callback(null, this.remainingData);
  }
}

module.exports = LineSplitStream;
