'use strict'

/**
 * Represents a Interface Node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createInterfaceNode (x, y) {
  /**
   * Uses RectNode as Prototype
   * @constructor
   */
  const base = createRectNode(x, y)
  base.setName('<<Interface>>') // Default text in node
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.INTERFACE
    },
    /** @override */
    getProps: () => {
      return new Map([['Name', 'text'], ['Methods', 'text']])
    },
    /** @override */
    clone: (x, y) => {
      return createInterfaceNode(x, y)
    }
  })
}
