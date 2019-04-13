'use strict'

const { Node } = require('./Node')

/**
   An inivisible node that is used in the toolbar to draw an edge.
   Implements Node
*/
function PointNode () {
  // Constructs a point node with coordinates (0, 0)
  const pn = Node()
  pn.point = { x: 0, y: 0 }
  return {
    draw: () => {
      return undefined
    },
    translate: (dx, dy) => {
      pn.point.x += dx
      pn.point.y += dy
    },
    contains: (p) => {
      return false
    },
    getBounds: () => {
      return { x: pn.point.x, y: pn.point.y, width: 0, height: 0 }
    },
    getConnectionPoint: (other) => {
      return pn.point
    },
    clone: () => {
      let temp
      try {
        temp = pn.clone()
      } catch (err) {
        return undefined
      }
      return temp
    }
  }
}

module.exports = {
  PointNode
}
