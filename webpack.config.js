const Config = require('webpack-chain')
const path = require('path')

const config = new Config()
config.resolve.alias
  .set('src', path.resolve(__dirname, 'src'))
module.exports = config.toConfig