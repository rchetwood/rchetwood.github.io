'use strict'

/**
   An edge that is shaped like a line.
   Extends AbstractEdge in Java
*/
function center (rect) {
  return { x: rect.x + rect.width / 2, 
    y: rect.y + rect.height / 2 }
}

function getConnectionPoints (start, end) {
  const sB = start.getBounds()
  const eB = end.getBounds()
  const sC = center(sB)
  const eC = center(eB)
  //return { start: start.getConnectionPoint(sC), end: end.getConnectionPoint(eC) }
  return { start: sC, end: eC }
}

function createLineEdge () {
  let start, end
  return {
    draw: () => {
      const ps = getConnectionPoints(start, end)
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('x1', ps.start.x)
      line.setAttribute('y1', ps.start.y)
      line.setAttribute('x2', ps.end.x)
      line.setAttribute('y2', ps.end.y)
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
