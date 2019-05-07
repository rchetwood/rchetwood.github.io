'use strict'

/**
 * Represents an Aggregation.
 * @constructor
*/
function createAggregateEdge () {
  /**
   * Uses LineEdge as Prototype
   * @constructor
   */
  const base = createLineEdge()
  base.setStartArrow('DIAMOND') // Sets start arrow as a Diamond
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.AGGREGATE
    },
    /** @override */
    clone: () => {
      return createAggregateEdge()
    }
  })
}
