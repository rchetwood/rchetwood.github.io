'use strict'

/**
   An edge that is shaped like a line.
   Extends AbstractEdge in Java
*/
function center (rect) {
  return { x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2 }
}

function rotate (c, p, angle) {
  // rotate p by angle at c
  let radians = (Math.PI / 180) * angle
  let cos = Math.cos(radians)
  let sin = Math.sin(radians)
  let nx = (cos * (p.x - c.x)) + (sin * (p.y - c.y)) + c.x
  let ny = (cos * (p.y - c.y)) - (sin * (p.x - c.x)) + c.y
  return { x: nx, y: ny }
}

function linePoint (p1, p2, t) {
  // Find point on line by t distance from p1
  return { x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y }
}

function lineDist (p1, p2) {
  // Find distance of line from p1 to p2
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

function ptSegDist (ps, p) {
  // distance between p and line of ps
  let line = (ps.start.x - ps.end.x) ** 2 + (ps.start.y - ps.end.y) ** 2
  if (line === 0) {
    return (p.x - ps.start.x) ** 2 + (p.y - ps.start.y) ** 2
  }
  let t = ((p.x - ps.start.x) * (ps.end.x - ps.start.x) + (p.y - ps.start.y) * (ps.end.y - ps.start.y)) / line
  t = Math.max(0, Math.min(1, t))
  let p2 = { x: ps.start.x + t * (ps.end.x - ps.start.x), y: ps.start.y + t * (ps.end.y - ps.start.y) }
  let dist = (p.x - p2.x) ** 2 + (p.y - p2.y) ** 2
  return Math.sqrt(dist)
}

function createLineEdge () {
  let start, end
  let stroke = 'DOTTED' // SOLID, DOTTED
  let type = 'HVEDGE' // LINE, HVEDGE, VHEDGE
  let startArrow = 'DIAMOND' // NONE, DIAMOND, OPEN, CLOSE
  let endArrow = 'DIAMOND' // NONE, DIAMOND, OPEN, CLOSE
  let bend
  return {
    draw: function()  {
      const ps = this.getConnectionPoints()
      const panel = document.getElementById('graphpanel')
      // LINE EDGE TYPE: LINE, HVEDGE, VHEDGE
      let line, sa, ea
      switch (type) {
        case 'HVEDGE':
          line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          bend = { x: ps.end.x, y: ps.start.y }
          line.setAttribute('points',
            '' + ps.start.x + ' ' + ps.start.y +
          ' ' + bend.x + ' ' + bend.y +
          ' ' + ps.end.x + ' ' + ps.end.y)
          break
        case 'VHEDGE':
          line = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          bend = { x: ps.start.x, y: ps.end.y }
          line.setAttribute('points',
            '' + ps.start.x + ' ' + ps.start.y +
          ' ' + bend.x + ' ' + bend.y +
          ' ' + ps.end.x + ' ' + ps.end.y)
          break
        default:
          line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
          line.setAttribute('x1', ps.start.x)
          line.setAttribute('y1', ps.start.y)
          line.setAttribute('x2', ps.end.x)
          line.setAttribute('y2', ps.end.y)
      }
      line.setAttribute('stroke', 'black')
      line.setAttribute('fill', 'transparent')
      // LINE STROKE TYPE: SOLID, DOTTED
      switch (stroke) {
        case 'DOTTED':
          line.setAttribute('stroke-dasharray', 4)
          break
        default:
          line.setAttribute('stroke-dasharray', 0)
      }
      // LINE POINTER TYPES: NONE, DIAMOND, OPEN, CLOSE
      let tS, cptS, bptS, rptS, lptS
      if (startArrow !== 'NONE') {
        if (type !== 'LINE') {
          if (ps.start.x === bend.x && ps.start.y === bend.y) {
            bend = ps.end
          }
          tS = 5 / lineDist(ps.start, bend)
          cptS = linePoint(ps.start, bend, tS)
        } else {
          tS = 5 / lineDist(ps.start, ps.end)
          cptS = linePoint(ps.start, ps.end, tS)
        }
        lptS = rotate(cptS, ps.start, 90)
        bptS = rotate(cptS, ps.start, 180)
        rptS = rotate(cptS, ps.start, 270)
      }
      let tE, cptE, bptE, rptE, lptE
      if (endArrow !== 'NONE') {
        if (type !== 'LINE') {
          if (ps.end.x === bend.x && ps.end.y === bend.y) {
            bend = ps.start
          }
          tE = 5 / lineDist(ps.end, bend)
          cptE = linePoint(ps.end, bend, tE)
        } else {
          tE = 5 / lineDist(ps.end, ps.start)
          cptE = linePoint(ps.end, ps.start, tE)
        }
        lptE = rotate(cptE, ps.end, 90)
        bptE = rotate(cptE, ps.end, 180)
        rptE = rotate(cptE, ps.end, 270)
      }
      switch (startArrow) {
        case 'DIAMOND':
          sa = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          sa.setAttribute('fill', 'white')
          sa.setAttribute('points',
            '' + ps.start.x + ' ' + ps.start.y +
          ' ' + lptS.x + ' ' + lptS.y +
          ' ' + bptS.x + ' ' + bptS.y +
          ' ' + rptS.x + ' ' + rptS.y)
          break
        case 'OPEN':
          sa = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          sa.setAttribute('fill', 'transparent')
          sa.setAttribute('points',
            '' + rptS.x + ' ' + rptS.y +
          ' ' + ps.start.x + ' ' + ps.start.y +
          ' ' + lptS.x + ' ' + lptS.y)
          break
        case 'CLOSE':
          sa = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          sa.setAttribute('fill', 'white')
          sa.setAttribute('points',
            '' + rptS.x + ' ' + rptS.y +
          ' ' + ps.start.x + ' ' + ps.start.y +
          ' ' + lptS.x + ' ' + lptS.y)
          break
        default:
          sa = undefined
      }
      switch (endArrow) {
        case 'DIAMOND':
          ea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          ea.setAttribute('fill', 'white')
          ea.setAttribute('points',
            '' + ps.end.x + ' ' + ps.end.y +
          ' ' + lptE.x + ' ' + lptE.y +
          ' ' + bptE.x + ' ' + bptE.y +
          ' ' + rptE.x + ' ' + rptE.y)
          break
        case 'OPEN':
          ea = document.createElementNS('http://www.w3.org/2000/svg', 'polyline')
          ea.setAttribute('fill', 'transparent')
          ea.setAttribute('points',
            '' + rptE.x + ' ' + rptE.y +
          ' ' + ps.end.x + ' ' + ps.end.y +
          ' ' + lptE.x + ' ' + lptE.y)
          break
        case 'CLOSE':
          ea = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
          ea.setAttribute('fill', 'white')
          ea.setAttribute('points',
            '' + rptE.x + ' ' + rptE.y +
          ' ' + ps.end.x + ' ' + ps.end.y +
          ' ' + lptE.x + ' ' + lptE.y)
          break
        default:
          ea = undefined
      }
      panel.appendChild(line)
      if (sa !== undefined) {
        sa.setAttribute('stroke', 'black')
        panel.appendChild(sa)
      }
      if (ea !== undefined) {
        ea.setAttribute('stroke', 'black')
        panel.appendChild(ea)
      }
    },
    connect: function(s, e) {
      start = s
      end = e
    },
    clone: () => {
      let cloneLE = createLineEdge()
      cloneLE.start = start
      cloneLE.end = end
      return cloneLE
    },
    contains: function(aPoint) {
      // For Line; need to add for HV and VH
      const MAX_DIST = 2
      let cps = this.getConnectionPoints()
      if (bend !== undefined){
        return (ptSegDist({start: cps.start, end: bend}, aPoint) < MAX_DIST
        || ptSegDist({start: bend, end: cps.end}, aPoint) < MAX_DIST)
      }
      return ptSegDist(cps, aPoint) < MAX_DIST
    },
    getBounds: function() {
      const ps = this.getConnectionPoints()
      let s = ps.start
      let e = ps.end
      let bx, by, bw, bh
      if (s.x <= e.x) {
        bx = s.x
        bw = e.x - s.x
      } else {
        bx = e.x
        bw = s.x - e.x
      }
      if (s.y <= e.y) {
        by = s.y
        bh = e.y - s.y
      } else {
        by = s.y
        bh = e.y - s.y
      }
      return { x: bx, y: by, width: bw, height: bh }
    },
    getConnectionPoints: function() {
      const sB = start.getBounds()
      const eB = end.getBounds()
      const sC = center(sB)
      const eC = center(eB)
      return { start: start.getConnectionPoint(eC), end: end.getConnectionPoint(sC) }
    }
  }
}

module.exports = {
  createLineEdge
}
