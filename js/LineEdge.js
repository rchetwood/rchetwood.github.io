'use strict'

/**
   An edge that is shaped like a straight line.
   Extends AbstractEdge in Java
*/
function LineEdge () {
  let stroke = 'SOLID'
  let start, end
  let arrow = {type: undefined, at: undefined}
  return {
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const ps = getConnectionPoints()
      line.setAttribute('x1', ps.start.x)
      line.setAttribute('x2', ps.end.x)
      line.setAttribute('y1', ps.start.y)
      line.setAttribute('y2', ps.end.y)
      if (stroke === 'SOLID') {
        line.setAttribute('stroke-dasharray', 0)
      }
      if (stroke === 'DOTTED') {
        line.setAttribute('stroke-dasharray', 4)
      }
      panel.appendChild(line)
    },
    contains: (aPoint) => {
      const MAX_DIST = 2
      return ptSegDist(getConnectionPoints(), aPoint) < MAX_DIST
    },
    ptSegDist: (ps,p) => {
      let line = (ps.start.x - ps.end.x)**2 + (ps.start.y - ps.end.y)**2 
      if (line === 0){
        return (p.x - ps.start.x)**2 + (p.y - ps.start.y)**2 
      }
      let temp = ((p.x - ps.start.x) * (ps.end.x - ps.start.x) + (p.y - ps.start.y) * (ps.end.y - ps.start.y)) / line
      temp = Math.max(0, Math.min(1,temp))
      let p2 = {x: ps.start.x + t * (ps.end.x - ps.start.x), y: ps.start.y + t * (ps.end.y - ps.start.y) }
      let dist = (p.x - p2.x)**2 + (p.y - p2.y)**2 
      return Math.sqrt(dist)
    },
    clone: () => {
      let cloneLE = AbstractEdge()
      cloneLE.start = start
      cloneLE.end = end
      return cloneLE
    },
    connect: (s, e) => {
      start = s
      end = e
    },
    getBounds: () => {
      let bx, by, bw, bh
      if (start.x <= end.x){
        bx = start.x
        bw = end.x-start.x
      } else {
        bx = end.x
        bw = start.x-end.x
      }
      if (start.y <= end.y){
        by = start.y
        bh = end.y-start.y
      } else {
        by = end.y
        bh = start.y-end.y
      }
      return { x: bx, y: by, width: bw, height: bh }
    },
    getConnectionPoints: () => {
      let sB = start.getBounds()
      let eB = end.getBounds()
      let sC = {x: sB.x+sB.width/2, y: sB.y+sB.height/2}
      let eC = {x: eB.x+eB.width/2, y: eB.y+eB.height/2}
      return {start: start.getConnectionPoint(sC), end: end.getConnectionPoint(eC)}
      //return {start: start, end: end}
    }
  }
}

module.exports = {
  LineEdge
}
