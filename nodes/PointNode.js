'use strict'

/**
   An inivisible node that is used in the toolbar to draw an edge.
   Implements Node in Java
*/
function PointNode (x, y) {
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
    clone: (x, y) => {
      return PointNode(x, y)
    }
  }
}