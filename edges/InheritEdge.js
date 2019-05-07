'use strict'

/**
 * Represents a Class Inheritance.
 * @constructor
*/
function createInheritEdge () {
  /**
   * Uses LineEdge as Prototype
   * @constructor
   */
  const base = createLineEdge()
  base.setEndArrow('CLOSE') // Sets end arrow as a closed arrow
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.INHERIT
    },
    /** @override */
    clone: () => {
      return createInheritEdge()
    }
  })
}
