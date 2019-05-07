'use strict'

/**
 * Represents a Diamond Node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createDiamondNode (x, y) {
  /**
   * Uses PointNode as Prototype
   * @constructor
   */
  const base = createPointNode(x, y)
  const defaultSize = 20
  const defaultColor = '#ffffff'
  let size = defaultSize
  let color = defaultColor
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.DIAMOND
    },
    /** @override */
    getProps: () => {
      return new Map([['Color', 'color'], ['Size', 'number']])
    },
    /** @override */
    getSize: () => {
      return size
    },
    /** @override */
    getColor: () => {
      return color
    },
    /** @override */
    setSize: (newSize) => {
      size = newSize
    },
    /** @override */
    setColor: (newColor) => {
      color = newColor
    },
    /** @override */
    getConnectionPoint: (p) => {
      let cx = x + size / 2
      let cy = y + size / 2
      let dx = p.x - cx
      let dy = p.y - cy
      if (dx < dy && dx >= -dy) {
        // South
        return { x: x + size / 2, y: y + size / 1 }
      }
      if (dx >= dy && dx >= -dy) {
        // East
        return { x: x + size / 1, y: y + size / 2 }
      }
      if (dx < dy && dx < -dy) {
        // West
        return { x: x, y: y + size / 2 }
      }
      if (dx >= dy && dx < -dy) {
        // North
        return { x: x + size / 2, y: y }
      }
      return p
    },
    /** @override */
    clone: (x, y) => {
      return createDiamondNode(x, y)
    },
    /** @override */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size / 1,
        height: size / 1
      }
    },
    /** @override */
    contains: p => {
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    /** @override */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /** @override */
    draw: () => {
      const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      let points = ((x + size / 2) + ',' + (y) + ' ' +
                (x + size / 1) + ',' + (y + size / 2) + ' ' +
                (x + size / 2) + ',' + (y + size / 1) + ' ' +
                (x) + ',' + (y + size / 2))
      diamond.setAttribute('points', points)
      diamond.setAttribute('fill', color)
      diamond.setAttribute('stroke', 'black')
      base.getPanel().append(diamond)
    }
  })
}
