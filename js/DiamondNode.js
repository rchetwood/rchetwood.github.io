'use strict'

function DiamondNode (x, y, size, color) {
  return {
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

module.exports = {
  DiamondNode
}
