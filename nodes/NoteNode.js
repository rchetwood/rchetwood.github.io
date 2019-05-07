'use strict'

/**
 * Represents a Note Node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createNoteNode (x, y) {
  /**
   * Uses RectNode as Prototype
   * @constructor
   */
  const base = createRectNode(x, y)
  base.setColor('khaki') // Set note color
  let note // Uses 'Note' instead of 'Name'
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.NOTE
    },
    /** @override */
    getProps: () => {
      return new Map([['Note', 'text']])
    },
    /** @override */
    clone: (x, y) => {
      return createNoteNode(x, y)
    },
    /** Returns the node's note */
    getNote: () => {
      if (note) {
        return note
      }
      return ''
    },
    /**
     * Set the node's note
     * @param {string} t - The note
    */
    setNote: (t) => {
      note = t
      base.setName(note)
    }
  })
}
