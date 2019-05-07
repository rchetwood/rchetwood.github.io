'use strict'

/**
 * Represents a Rectangle Node.
 * @constructor
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function createRectNode (x, y) {
  /**
   * Uses PointNode as Prototype
   * @constructor
   */
  const base = createPointNode(x, y)
  let defaultWidth = 50
  let defaultHeight = 25
  let defaultColor = 'white'
  let color = defaultColor
  let width = defaultWidth
  let height = defaultHeight
  let name, methods, attributes // Strings inside the node
  let mBool = 0 // Fake booleans to set height in draw method
  let aBool = 0
  return Object.assign(Object.create(base), {
    /** @override */
    getProps: () => {
      return new Map([['Name', 'text'], ['Methods', 'text'], ['Attributes', 'text']])
    },
    /** Returns the node's name */
    getName: () => {
      if (name) {
        return name
      }
      return ''
    },
    /** Returns the node's methods */
    getMethods: () => {
      if (methods) {
        return methods
      }
      return ''
    },
    /** Returns the node's attributes */
    getAttributes: () => {
      if (attributes) {
        return attributes
      }
      return ''
    },
    /** @override */
    getColor: () => {
      return color
    },
    /**
     * Set the node's name
     * @param {string} t - The new name
    */
    setName: (t) => {
      name = t
    },
    /**
     * Set the node's method
     * @param {string} t - The new method
    */
    setMethods: (t) => {
      methods = t
    },
    /**
     * Set the node's attribute
     * @param {string} t - The new attribute
    */
    setAttributes: (t) => {
      attributes = t
    },
    /**
     * Set the node's height
     * @param {int} newHeight - The new height
    */
    setHeight: (newHeight) => {
      height = newHeight
    },
    /**
     * Set the node's width
     * @param {int} newWidth - The new width
    */
    setWidth: (newWidth) => {
      width = newWidth
    },
    /** @override */
    setColor: (c) => {
      color = c
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
      let slope = height / width
      let cx = x + width / 2
      let cy = y + height / 2

      if (ex !== 0 && -slope <= ey / ex && ey / ex <= slope) {
        if (ex <= 0) {
          // Right
          cx = x + width / 1
          cy += (width / 2) * ey / ex
        } else {
          // Left
          cx = x
          cy -= (width / 2) * ey / ex
        }
      } else if (ey !== 0) {
        if (ey <= 0) {
          // Bottom
          cx += (height / 2) * ex / ey
          cy = y + height / 1
        } else {
          // Top
          cx -= (height / 2) * ex / ey
          cy = y
        }
      }
      return { x: cx, y: cy }
    },
    /** @override */
    clone: (x, y) => {
      return createRectNode(x, y)
    },
    /** @override */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    /** @override */
    contains: (p) => {
      return ((x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <= ((width + height) / 2) ** 2 / 2)
    },
    /** @override */
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    /** @override */
    draw: function () {
      const panel = base.getPanel()
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      const nameBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const methBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const attBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const methLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const attLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      panel.appendChild(rect)
      // Find dimensions of text to determine bounding rectangle size
      let nb, mb, ab
      let nh = 0; let mh = 0; let ah = 0
      let nw = 0; let mw = 0; let aw = 0
      // If given a name
      if (name) {
        nameBox.textContent = name
        panel.appendChild(nameBox)
        nb = nameBox.getBBox()
        if (nb.width + 10 > width) {
          width = nb.width + 10
        }
        nh = nb.height
        nw = nb.width + 10
        nameBox.setAttribute('x', x + 5)
        nameBox.setAttribute('y', y + nh)
      } else {
        nh = defaultHeight - 9
        nw = defaultWidth
      }
      // If given methods
      if (methods && methods !== '') {
        methBox.textContent = methods
        panel.appendChild(methBox)
        mb = methBox.getBBox()
        mh = mb.height
        mw = mb.width + 10
        if (mb.width + 10 > width) {
          width = mb.width + 10
        }
        methBox.setAttribute('x', x + 5)
        methBox.setAttribute('y', y + nh + 20)
        if (mBool === 0) {
          height += mh + 5
          mBool++
        }
        panel.appendChild(methLine)
      } else {
        mBool = 0
      }
      // If given attributes
      if (attributes && attributes !== '') {
        attBox.textContent = attributes
        panel.appendChild(attBox)
        ab = attBox.getBBox()
        ah = ab.height
        aw = ab.width + 10
        if (ab.width + 10 > width) {
          width = ab.width + 10
        }
        attBox.setAttribute('x', x + 5)
        attBox.setAttribute('y', y + nh + mh + 25)
        if (aBool === 0) {
          height += ah + 5
          aBool++
        }
        panel.appendChild(attLine)
      } else {
        aBool = 0
      }
      // Reset height and width
      if (height > (nh + mh + ah + 10)) {
        while (height > (nh + mh + ah + 10)) {
          height -= 1
        }
      } else {
        while (height < (nh + mh + ah)) {
          height += 1
        }
      }
      while (width > Math.max(nw, mw, aw) && width > defaultWidth) {
        width -= 1
      }
      // Split line between name and methods
      if (methLine) {
        methLine.setAttribute('x1', x)
        methLine.setAttribute('y1', y + nh + 5)
        methLine.setAttribute('x2', x + width)
        methLine.setAttribute('y2', y + nh + 5)
        methLine.setAttribute('stroke', 'black')
      }
      // Split line between methods and attributes
      if (attLine) {
        attLine.setAttribute('x1', x)
        attLine.setAttribute('y1', y + nh + mh + 10)
        attLine.setAttribute('x2', x + width)
        attLine.setAttribute('y2', y + nh + mh + 10)
        attLine.setAttribute('stroke', 'black')
      }
      // Set bounding rectangle
      rect.setAttribute('x', x)
      rect.setAttribute('y', y)
      rect.setAttribute('width', width)
      rect.setAttribute('height', height)
      rect.setAttribute('fill', color)
      rect.setAttribute('stroke', 'black')
    }
  })
}
