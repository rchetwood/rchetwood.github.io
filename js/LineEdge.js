'use strict'

/**
   An edge that is shaped like a line.
   Extends AbstractEdge in Java
*/
function createLineEdge () {
  let start, end
  return {
    draw: () => {
      const b1 = start.getBounds()
      const b2 = end.getBounds()
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', b1.x)
      line.setAttribute('y1', b1.y)
      line.setAttribute('x2', b2.x)
      line.setAttribute('y2', b2.y)
      line.setAttribute('stroke', 'black')
      panel.appendChild(line)
    },
    connect: (s, e) => {
      start = s
      end = e
    }
  }
}

module.exports = {
  createLineEdge
}
