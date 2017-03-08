require('./server/globalConstantsConfig')

const fs = require('fs')
const path = require('path')

const babelrc = fs.readFileSync(path.resolve(__dirname, '../.babelrc'))

const config

try {
  config = JSON.parse(babelrc)
} catch (err) {
  console.error('==>ERROR: Error parsing your .babelrc.')
  console.error(err)
}

// set babel register
require('babel-register')(config)

require('./server/globalFunctionConfig')
// start app
require('./server/express')
