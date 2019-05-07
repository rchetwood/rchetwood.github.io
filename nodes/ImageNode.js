'use strict'

/**
 * Represents a Local Image Node.
 * Used to test if framework can add another node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createImageNode (x, y) {
  /**
   * Uses Point as Prototype
   * @constructor
   */
  const base = createPointNode(x, y)
  let size = 50
  const defaultImg = 'default.png'
  let image = defaultImg
  return Object.assign(Object.create(base), {
    /** @override */
    getID: () => {
      return NodeType.IMAGE
    },
    /**
     * Sets the image of this node
     * @param {string} t = Ihe path to the image file
     */
    setImage: (t) => {
      if (!t) {
        image = defaultImg
      } else {
        image = t
      }
    },
    /** Gets the image of this node */
    getImage: () => {
      return image
    },
    /** @override */
    getProps: () => {
      return new Map([['Size', 'number'], ['Image', 'text']])
    },
    /** @override */
    setSize: (newSize) => {
      size = newSize
    },
    /** @override */
    getSize: () => {
      return size
    },
    /** @override */
    getConnectionPoint: (p) => {
      // Copied logic from Violet's Direction and Rectangle class
      // Direction Logic
      let dx = x - p.x
      let dy = y - p.y
      let len = Math.sqrt(dx ** 2 + dy ** 2)
      if (len === 0) {
        len = 1
      }
      let ex = dx / len
      let ey = dy / len

      // Rectangle Logic
      let slope = 1
      let cx = x + size / 2
      let cy = y + size / 2

      if (ex !== 0 && -slope <= ey / ex && ey / ex <= slope) {
        if (ex <= 0) {
          // Right
          cx = x + size / 1
          cy += (size / 2) * ey / ex
        } else {
          // Left
          cx = x
          cy -= (size / 2) * ey / ex
        }
      } else if (ey !== 0) {
        if (ey <= 0) {
          // Bottom
          cx += (size / 2) * ex / ey
          cy = y + size / 1
        } else {
          // Top
          cx -= (size / 2) * ex / ey
          cy = y
        }
      }
      return { x: cx, y: cy }
    },
    /** @override */
    clone: (x, y) => {
      return createImageNode(x, y)
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
    contains: (p) => {
      return ((x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= (size ** 2 / 2))
    },
    /** @override */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /** @override */
    draw: () => {
      const img = document.createElementNS('http://www.w3.org/2000/svg', 'image')
      img.setAttribute('x', x)
      img.setAttribute('y', y)
      img.setAttribute('width', size)
      img.setAttribute('height', size)
      img.setAttribute('href', image)
      base.getPanel().append(img)
    }
  })
}
