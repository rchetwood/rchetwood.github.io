'use strict'

const { Node } = require('./Node')

/**
   An inivisible node that is used in the toolbar to draw an edge.
   Implements Node in Java
*/
function PointNode () {
  // Constructs a point node with coordinates (0, 0)
  let x = 0
  let y = 0
  return {
    draw: () => {
      return undefined
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    contains: (p) => {
      return false
    },
    getBounds: () => {
      return { x: x, y: y, width: 0, height: 0 }
    },
    getConnectionPoint: (other) => {
      return {x: x, y: y}
    },
    clone: () => {
      let clonePN = PointNode()
      clonePN.x = x
      clonePN.y = y
      return clonePN
    }
  }
}

module.exports = {
  PointNode
}
