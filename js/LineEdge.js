'use strict'

const { LineStyle } = require('./LineStyle')
const { AbstractEdge } = require('./AbstractEdge')

/**
   An edge that is shaped like a straight line.
   Extends AbstractEdge
*/
function LineEdge () {
  let ls = LineStyle()
  let le = AbstractEdge()
  ls.styles = SOLID
  return {
    draw: () => {
      const stroke = ls.getStroke()
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const ps = getConnectionPoints()
      line.setAttribute('x1', ps.start.x)
      line.setAttribute('x2', ps.end.x)
      line.setAttribute('y1', ps.start.y)
      line.setAttribute('y2', ps.end.y)
      if (ls.styles === SOLID) {
        line.setAttribute('stroke-dasharray', stroke)
      }
      if (ls.styles === DOTTED) {
        line.setAttribute('stroke-dasharray', stroke)
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
    setLineStyle: (newValue) => {
      ls.styles = newValue
    },
    getLineStyle: () => {
      return ls.styles
    },
    clone: () => {
      return le.clone()
    },
    connect: (s, e) => {
      le.connect(s, e)
    },
    getStart: () => {
      return le.getStart()
    },
    getEnd: () => {
      return le.getEnd()
    },
    getBounds: (g2) => {
      return le.getBounds(g2)
    },
    getConnectionPoints: () => {
      return le.getConnectionPoints()
    }
  }
}

module.exports = {
  LineEdge
}
