'use strict'

/**
 * Represents a Dependency.
 * @constructor
*/
function createDependEdge () {
  /**
   * Uses LineEdge as Prototype
   * @constructor
   */
  const base = createLineEdge()
  base.setStroke('DOTTED') // Sets line stroke to dotted
  base.setEndArrow('OPEN') // Sets end arrow as an open arrow
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.DEPEND
    },
    /** @override */
    clone: () => {
      return createDependEdge()
    }
  })
}
