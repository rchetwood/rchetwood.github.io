'use strict'

/**
 * Represents a Point Node.
 * An invisible node that can be used in the toolbar to draw an edge.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 * @returns {JSON} whether the obj is an edge, the setter and getter method for Panel, COlor, Size, Width, Height, Name and ID
 */
function createPointNode (x, y) {
  const isEdge = false
  let panel
  return {
    /** Boolean to tell if object is edge */
    isEdge,
    /**
     * Set the panel to be drawn on
     * @param {obj} newPanel - The new panel
    */
    setPanel: (newPanel) => {
      panel = newPanel
    },
    /**
     * Set the node's color
     * @param {string} newColor - The new color
    */
    setColor: (newColor) => {},
    /**
     * Set the node's size
     * @param {int} i - The new size
    */
    setSize: (i) => {},
    /**
     * Set the node's height
     * @param {int} i - The new height
    */
    setHeight: (i) => {},
    /**
     * Set the node's width
     * @param {int} i - The new width
    */
    setWidth: (i) => {},
    /**
     * Set the node's name
     * @param {string} i - The new name
    */
    setName: (i) => {},
    /** Returns ID of Node 
     * @returns the obj ID
    */
    getID: () => {},
    /** Returns the node's color 
     * @returns the current color
    */
    getColor: () => {},
    /** Returns the node's size
     * @returns current size
     */
    getSize: () => {
      return 0
    },
    /** Returns the node's panel 
     * @returns the current panel
    */
    getPanel: () => {
      return panel
    },
    /** Return a list of the node properties 
     * @returns list of props
    */
    getProps: () => {
      return []
    },
    /**
     * Returns a point on the node closest to the given point
     * @param {coordinate} p - The point of comparison
     * @returns {JSON} the x and y of point
    */
    getConnectionPoint: (p) => {
      return { x: x, y: y }
    },
    /**
     * Creates a clone of this node at (x,y)
     * @param {int} x - The x coordinate
     * @param {int} y - The y coordinate
     * @returns new point node
    */
    clone: (x, y) => {
      return createPointNode(x, y)
    },
    /** Returns the bounds of the node 
     * @returns {JSON} x, y, width, height of the bounds
    */
    getBounds: () => {
      return { x: x, y: y, width: 0, height: 0 }
    },
    /**
     * Checks if the node contains the given point
     * @param {coordinate} p - The point of comparison
     * @returns true if the point is within node and false if it isnt
    */
    contains: (p) => {
      if (p.x === x && p.y === y) {
        return true
      }
      return false
    },
    /**
     * Move the node by a certain distance
     * @param {int} dx - The change in x
     * @param {int} dy - The change in y
    */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /** Draws the invisible node */
    draw: () => {
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x)
      circle.setAttribute('cy', y)
      circle.setAttribute('r', 0)
      panel.append(circle)
    }
  }
}
