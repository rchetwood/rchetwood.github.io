'use strict'

// Do we need these?
const { CircleNode } = require('./CircleNode')
const { DiamondNode } = require('./DiamondNode')
const { LineEdge } = require('./LineEdge')

/**
   A simple graph with round nodes and straight edges.
   Extends Graph
*/
function SimpleGraph () {
  return {
    getNodePrototypes: () => {
      let nodeTypes = []
      // Add Node Types Here
      nodeTypes.push(CircleNode('white'))
      nodeTypes.push(DiamondNode('white'))
      return nodeTypes
    },
    getEdgePrototypes: () => {
      let edgeTypes = []
      // Add Edge Types Here
      edgeTypes.push(LineEdge())
      return edgeTypes
    }
  }
}

module.exports = {
  SimpleGraph
}
