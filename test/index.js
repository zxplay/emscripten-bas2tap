const Module = require('../public/dist/bas2tap.js')

module.exports = input => {
  return new Promise((resolve, reject) => {
    Module({
      'input': input,
      'resolve': resolve,
      'arguments': ['input.bas', 'output.tap', '-a', '-shello']
    });
  });
}
