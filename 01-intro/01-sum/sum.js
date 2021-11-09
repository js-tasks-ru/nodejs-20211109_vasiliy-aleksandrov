function sum(a, b) {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a + b;
  } else {
    throw new TypeError('Ошбика типа');
  }
}

module.exports = sum;
