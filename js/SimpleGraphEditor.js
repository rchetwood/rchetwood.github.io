'use strict'

const { GraphFrame } = require('./GraphFrame')
const { SimpleGraph } = require('./SimpleGraph')

function SimpleGraphEditor () {
    // TODO
    const frame = GraphFrame(SimpleGraph())
    return frame
}

module.exports = {
    SimpleGraphEditor
}
