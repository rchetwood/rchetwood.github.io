'use strict'

function createDiamondNode (x, y, size, color) {
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
      return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
      let points =  ((x + size / 2) + "," + (y) + " " + 
                    (x+size) + "," + (y+size/2) + " " + 
                    (x+size/2) + ","  + (y + size) + " " + 
                    (x) + "," + (y + size / 2))
      console.log("points: " + points); 
      diamond.setAttribute('points', points)
      diamond.setAttribute('fill', color)
      panel.appendChild(diamond)
    }
  }
}

module.exports = { createDiamondNode} 