'use strict'

function createRectNode () {
  let x, y, width, height, color
  let text, methods, attributes
  let type // Class/Interface? Have this one file, or two separate?
  return {
    getConnectionPoint: (p) => {
      let cx = x + size/2
      let cy = y + size/2
      let dx = p.x - cx
      let dy = p.y - cy
      if (dx<dy && dx>=-dy) {
        // South
        return {x: x+size/2, y: y+size} }
      if (dx>=dy && dx>=-dy) {
        // East
        return {x: x+size, y: y+size/2} }
      if (dx<dy && dx<-dy) {
        // West
        return {x: x, y: y+size/2} }
      if (dx>=dy && dx<-dy) {
        // North
        return {x: x+size/2, y: y} }
      return other;
    },
    clone: () => {
      let cloneCN = createCircleNode()
      cloneCN.x = x
      cloneCN.y = y
      cloneCN.size = size
      cloneCN.color = color
      return cloneCN
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: size,
        height: size
      }
    },
    contains: p => {
      return ((x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 2)
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', x)
      rect.setAttribute('y', y)
      rect.setAttribute('width', width)
      rect.setAttribute('height', height)
      rect.setAttribute('fill', color)
      panel.appendChild(rect)
    }
  }
}

module.exports = {
  createRectNode
}