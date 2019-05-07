'use strict'

/**
 * Represents a Class Node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createClassNode (x, y) {
  /**
   * Uses RectNode as Prototype
   * @constructor
   */
  const base = createRectNode(x, y)
  base.setName('Class') // Default text in node
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.CLASS
    },
    /** @override */
    getProps: () => {
      return new Map([['Name', 'text'], ['Methods', 'text'], ['Attributes', 'text']])
    },
    /** @override */
    clone: (x, y) => {
      return createClassNode(x, y)
    }
  })
}
