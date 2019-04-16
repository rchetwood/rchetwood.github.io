'use strict'

// Do we need these?
const { CircleNode } = require('./CircleNode')
const { DiamondNode } = require('./DiamondNode')
const { LineEdge } = require('./LineEdge')

const { Graph } = require('./Graph')

/**
   A simple graph with round nodes and straight edges.
   Extends Graph in Java
*/
function SimpleGraph () {
  const sg = Graph()
  nodes = sg.nodes
  edges = sg.edges
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
    },
    connect: (e, p1, p2) => {
      return sg.connect(e, p1, p2)
    },
    add: (n, p) => {
      return sg.add(n, p)
    },
    findNode: (p) => {
      return sg.findNode(p)
    },
    findEdge: (p) => {
      return sg.findEdge(p)
    },
    draw: () => {
      return sg.draw()
    },
    removeNode: (n) => {
      return sg.removeNode(n)
    },
    removeEdge: (e) => {
      return sg.removeEdge(e)
    },
    getBounds: () => {
      return sg.getBounds()
    },
  }
}

module.exports = {
  SimpleGraph
}
