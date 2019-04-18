'use strict'

/**
   An edge that is shaped like a line.
   Extends AbstractEdge in Java
*/
function LineEdge () {
  let start, end
  let stroke = 'SOLID'
  let type = 'LINE'
  let startArrow = 'NONE'
  let endArrow = 'NONE'
  return {
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const ps = getConnectionPoints()
      // line edge type
      let line
      let bend
      switch (type) {
        case 'HVEDGE':
          line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          bend = {x: ps.end.x, y: ps.start.y}
          line.setAttribute('points', 
          '' + ps.start.x + ' ' + ps.start.y + 
          ' ' + bend.x + ' ' + bend.y + 
          ' ' + ps.end.x + ' ' + ps.end.y)
          break;
        case 'VHEDGE':
          line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          bend = {x: ps.start.x, y: ps.end.y}
          line.setAttribute('points', 
          '' + ps.start.x + ' ' + ps.start.y + 
          ' ' + bend.x + ' ' + bend.y + 
          ' ' + ps.end.x + ' ' + ps.end.y)
          break;
        default:
          line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', ps.start.x)
          line.setAttribute('x2', ps.end.x)
          line.setAttribute('y1', ps.start.y)
          line.setAttribute('y2', ps.end.y)
      }
      // line stroke types
      switch (stroke) {
        case 'DOTTED':
          line.setAttribute('stroke-dasharray', 4)
          break;
        default:
          line.setAttribute('stroke-dasharray', 0)
      }
      // arrow points and types
      const t = 2.5/lineDist(ps.start,ps.end)
      let cpt, bpt, rpt, lpt
      if (startArrow !== 'NONE') {
        cpt  = linePoint(ps.start,ps.end,t)
        lpt = rotate(cpt,ps.start,90)
        bpt = rotate(cpt,ps.start,180)
        rpt = rotate(cpt,ps.start,270)
      }
      if (endArrow !== 'NONE') {
        cpt  = linePoint(ps.end,ps.start,t)
        lpt = rotate(cpt,ps.end,90)
        bpt = rotate(cpt,ps.end,180)
        rpt = rotate(cpt,ps.end,270)
      }
      switch (startArrow) {
        case 'diamond':
          sa = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          sa.setAttribute('fill', 'white')
          sa.setAttribute('points', 
          '' + ps.start.x + ' ' + ps.start.y + 
          ' ' + lpt.x + ' ' + lpt.y + 
          ' ' + bpt.x + ' ' + bpt.y + 
          ' ' + rpt.x + ' ' + rpt.y)
          break;
        case 'openArrow':
          sa = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          sa.setAttribute('points', 
          '' + rpt.x + ' ' + rpt.y +
          ' ' + ps.start.x + ' ' + ps.start.y + 
          ' ' + lpt.x + ' ' + lpt.y)
          break;
        case 'closeArrow':
          sa = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          sa.setAttribute('fill', 'white')
          sa.setAttribute('points', 
          '' + rpt.x + ' ' + rpt.y +
          ' ' + ps.start.x + ' ' + ps.start.y + 
          ' ' + lpt.x + ' ' + lpt.y)
          break;
        default:
          sa = undefined
      }
      switch (endArrow) {
        case 'diamond':
          ea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          ea.setAttribute('fill', 'white')
          ea.setAttribute('points', 
          '' + ps.end.x + ' ' + ps.end.y + 
          ' ' + lpt.x + ' ' + lpt.y + 
          ' ' + pt.x + ' ' + pt.y + 
          ' ' + rpt.x + ' ' + rpt.y)
          break;
        case 'openArrow':
          ea = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          ea.setAttribute('points', 
          '' + rpt.x + ' ' + rpt.y +
          ' ' + ps.end.x + ' ' + ps.end.y + 
          ' ' + lpt.x + ' ' + lpt.y)
          break;
        case 'closeArrow':
          ea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          ea.setAttribute('fill', 'white')
          ea.setAttribute('points', 
          '' + rpt.x + ' ' + rpt.y +
          ' ' + ps.end.x + ' ' + ps.end.y + 
          ' ' + lpt.x + ' ' + lpt.y)
          break;
        default:
          ea = undefined
      }
      if (sa !== undefined) {
        panel.appendChild(sa)
      }
      if (sa !== undefined) {
        panel.appendChild(ea)
      }
      if (sa !== undefined) {
        panel.appendChild(line)
      }
    },
    contains: (aPoint) => {
      const MAX_DIST = 2
      return ptSegDist(getConnectionPoints(), aPoint) < MAX_DIST
    },
    rotate: (c,p,angle) => {
      // rotate p by angle at c
      let radians = (Math.PI / 180) * angle
      let cos = Math.cos(radians)
      let sin = Math.sin(radians)
      let nx = (cos * (p.x - c.x)) + (sin * (p.y - c.y)) + c.x
      let ny = (cos * (p.y - c.y)) - (sin * (p.x - c.x)) + c.y
      return {x: nx, y: ny}
    },
    linePoint: (p1,p2,t) => {
      // Find point on line by t distance from p1
      return {x: (1-t)*p1.x + t*p2.x, y: (1-t)*p1.y + t*p2.y}
    },
    lineDist: (p1,p2) => {
      // Find distance of line from p1 to p2
      return Math.sqrt((p1.x-p2.x)**2 + (p1.y-p2.y)**2)
    },
    ptSegDist: (ps,p) => {
      // distance between p and line of ps
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
