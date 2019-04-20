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
  return { start: start.getConnectionPoint(sC), end: end.getConnectionPoint(eC) }
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
  let stroke = 'SOLID' // SOLID, DOTTED
  let type = 'LINE' // LINE, HVEDGE, VHEDGE
  let startArrow = 'NONE' // NONE, DIAMOND, OPEN, CLOSE
  let endArrow = 'NONE' // NONE, DIAMOND, OPEN, CLOSE
  return {
    draw: () => {
      const ps = getConnectionPoints(start, end)
      const panel = document.getElementById('graphpanel')
      // LINE EDGE TYPE: LINE, HVEDGE, VHEDGE
      let line, bend, sa, ea
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
      panel.appendChild(line)
    },
    connect: (s, e) => {
      start = s
      end = e
    },
    clone: () => {
      let cloneLE = createLineEdge()
      cloneLE.start = start
      cloneLE.end = end
      return cloneLE
    },
    contains: (aPoint) => {
      const MAX_DIST = 2
      return this.ptSegDist(this.getConnectionPoints(), aPoint) < MAX_DIST
    },
    getBounds: () => {
      let bx, by, bw, bh
      if (start.x <= end.x) {
        bx = start.x
        bw = end.x - start.x
      } else {
        bx = end.x
        bw = start.x - end.x
      }
      if (start.y <= end.y) {
        by = start.y
        bh = end.y - start.y
      } else {
        by = end.y
        bh = start.y - end.y
      }
      return { x: bx, y: by, width: bw, height: bh }
    },
    getConnectionPoints: () => {
      const sB = start.getBounds()
      const eB = end.getBounds()
      const sC = center(sB)
      const eC = center(eB)
      return { start: start.getConnectionPoint(sC), end: end.getConnectionPoint(eC) }
    }
  }
}

module.exports = {
  createLineEdge
}
