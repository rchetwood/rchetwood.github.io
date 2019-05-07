'use strict'

/**
 * Represents a Horizonal-Vertical Edge.
 * @constructor
*/
function createHVEdge () {
  /**
   * Uses LineEdge as Prototype
   * @constructor
   */
  const base = createLineEdge()
  base.setType('HVEdge') // Sets line type as an HV Edge
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.HV
    },
    /** @override */
    clone: () => {
      return createHVEdge()
    }
  })
}
