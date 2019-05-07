'use strict'

/**
 * Represents a Circle Node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createCircleNode (x, y) {
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
      return NodeType.CIRCLE
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
      let dist = Math.sqrt(dx ** 2 + dy ** 2)
      if (dist === 0) {
        return p
      } else {
        return { x: cx + dx * (size / 2) / dist, y: cy + dy * (size / 2) / dist }
      }
    },
    /** @override */
    clone: (x, y) => {
      return createCircleNode(x, y)
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
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r', size / 2)
      circle.setAttribute('fill', color)
      circle.setAttribute('stroke', 'black')
      base.getPanel().append(circle)
    }
  })
}
