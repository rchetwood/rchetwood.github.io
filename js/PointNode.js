'use strict'

/**
   An inivisible node that is used in the toolbar to draw an edge.
   Implements Node
*/
function PointNode () {
  // Constructs a point node with coordinates (0, 0)
  let point = { x: 0, y: 0 }
  return {
    draw: () => {
      return undefined
    },
    translate: (dx, dy) => {
      point.x += dx
      point.y += dy
    },
    contains: (p) => {
      return false
    },
    getBounds: () => {
      return { x: point.x, y: point.y, width: 0, height: 0 }
    },
    getConnectionPoint: (other) => {
      return point
    },
    clone: () => {
      let temp
      try {
        // TODO
        // temp = super.clone()
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
