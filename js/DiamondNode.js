'use strict'

function DiamondNode (color) {
  let x, y
  let size = 10
  this.color = color
  return {
    getConnectionPoint: (p) => {
      let cx = x + size/2
      let cy = y + size/2
      let dx = p.x - cx
      let dy = p.y - cy
      let dist = Math.sqrt(dx**2 + dy**2)
      if (dist === 0) {
        return other
      } else {
        return { x: cc + dx * (size / 2) / dist, y: cy + dy * (size / 2) / dist }
      }
    },
    clone: () => {
      let cloneDN = DiamondNode()
      cloneDN.x = x
      cloneDN.y = y
      cloneDN.size = size
      cloneDN.color = this.color
      return cloneDN
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
      diamond.setAttribute('fill', this.color)
      panel.appendChild(diamond)
    }
  }
}

module.exports = {
  DiamondNode
}
