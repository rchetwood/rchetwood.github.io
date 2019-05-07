'use strict'

/**
 * Represents an Vertical-Horizontal Line.
 * @constructor
*/
function createVHEdge () {
  /**
   * Uses LineEdge as Prototype
   * @constructor
   */
  const base = createLineEdge()
  base.setType('VHEdge') // Sets line type as a VH Edge
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.VH
    },
    /** @override */
    clone: () => {
      return createVHEdge()
    }
  })
}
