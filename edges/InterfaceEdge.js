'use strict'

/**
 * Represents an Inferface Inheritance.
 * @constructor
*/
function createInterfaceEdge () {
  /**
   * Uses LineEdge as Prototype
   * @constructor
   */
  const base = createLineEdge()
  base.setStroke('DOTTED') // Sets line stroke to dotted
  base.setEndArrow('CLOSE') //  Sets end arrow as a closed arrow
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.INTERFACE
    },
    /** @override */
    clone: () => {
      return createInterfaceEdge()
    }
  })
}
