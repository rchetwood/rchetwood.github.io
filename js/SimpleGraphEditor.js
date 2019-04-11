'use strict'

// Are these two lines necessary?
// Or will they only be used in the test case file(s)?
const { GraphFrame } = require('./GraphFrame')
const { SimpleGraph } = require('./SimpleGraph')

function SimpleGraphEditor () {
  const frame = GraphFrame(SimpleGraph())
  return frame
}

module.exports = {
  SimpleGraphEditor
}
