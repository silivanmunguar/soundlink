const path = require('path')

module.exports = {
  entry: './webapp/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'webapp/dist')
  }
}
