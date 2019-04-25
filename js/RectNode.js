'use strict'

function createRectNode (x, y) {
  let color = 'white' // Default color
  let width = 40 // Default width - temporary
  let height = 30 // Default height - temporary
  let text, methods, attributes // These may be strings
  let type // Class/Interface? Have this one file, or two separate?
  return {
    getConnectionPoint: (p) => {
      let cx = x + width / 2
      let cy = y + height / 2
      let dx = p.x - cx
      let dy = p.y - cy
      if (dx < dy && dx >= -dy) {
        // South
        return { x: x + width / 2, y: y + height }
      }
      if (dx >= dy && dx >= -dy) {
        // East
        return { x: x + width, y: y + height / 2 }
      }
      if (dx < dy && dx < -dy) {
        // West
        return { x: x, y: y + height / 2 }
      }
      if (dx >= dy && dx < -dy) {
        // North
        return { x: x + width / 2, y: y }
      }
      return p
    },
    clone: () => {
      let cloneCN = createRectNode()
      cloneCN.x = x
      cloneCN.y = y
      cloneCN.width = width
      cloneCN.height = height
      cloneCN.color = color
      return cloneCN
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    contains: p => {
      return ((x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <= ((width + height) / 2) ** 2 / 2)
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      if (text !== undefined){
        const textBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        // TODO - how to add written text?
      }
      // Find dimensions of text to determine bounding rectangle size
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', x)
      rect.setAttribute('y', y)
      rect.setAttribute('width', width)
      rect.setAttribute('height', height)
      rect.setAttribute('fill', color)
      rect.setAttribute('stroke', 'black')
      panel.appendChild(rect)
    }
  }
}

module.exports = {
  createRectNode
}
