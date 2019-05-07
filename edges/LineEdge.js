'use strict'

/**
 * Finds the center of a given rectangle bounds.
 * @param {bounds} rect - The bounds of an object
 * @returns {number, number} center x center y
 */
function center (rect) {
  return { x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2 }
}

/**
 * Rotates a point at an origin by a specified angle.
 * @param {point} c - The origin point to be rotate at
 * @param {point} p - The point to be rotated
 * @param {int} c - The decimal angle size
 * @returns {number, number} x and y
 */
function rotate (c, p, angle) {
  let radians = (Math.PI / 180) * angle
  let cos = Math.cos(radians)
  let sin = Math.sin(radians)
  let nx = (cos * (p.x - c.x)) + (sin * (p.y - c.y)) + c.x
  let ny = (cos * (p.y - c.y)) - (sin * (p.x - c.x)) + c.y
  return { x: nx, y: ny }
}

/**
 * Finds a point on a line that is a certain distance from the start.
 * @param {point} p1 - The starting point of the line
 * @param {point} p2 - The ending point of the line
 * @param {int} t - The distance on the line from p1
 * @returns startpoint of the line
 */
function linePoint (p1, p2, t) {
  return { x: (1 - t) * p1.x + t * p2.x, y: (1 - t) * p1.y + t * p2.y }
}

/**
 * Finds the distance of the line between two points.
 * @param {point} p1 - The starting point
 * @param {point} p2 - The ending point
 * @returns the distance btw the 2 points
 */
function lineDist (p1, p2) {
  return Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
}

/**
 * Finds the distance between a line and a point
 * @param {point} ps - The start and end points of the line
 * @param {point} p - The point to be checked
 * @returns the line length
 */
function ptSegDist (ps, p) {
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

/**
 * Represents a standard Line
 * @constructor
 * @returns {JSON} the functions  getID, setPanel, getPanel, getProps, getTypes, getStrokes
 * getStartArrows, getEndArrows, getStroke, getType, getStartArrow, getEndArrow, getStart,
 * getEnd, setStroke, getType....
*/
function createLineEdge () {
  const isEdge = true
  let start, end, bend // Start, End, and Bend points
  let stroke = 'SOLID' // SOLID, DOTTED
  let type = 'LINE' // LINE, HVEDGE, VHEDGE
  let startArrow = 'NONE' // NONE, DIAMOND, OPEN, CLOSE
  let endArrow = 'NONE' // NONE, DIAMOND, OPEN, CLOSE
  let panel
  return {
    /** Boolean to tell if object is edge */
    isEdge,
    /** Returns ID of Edge
     * @returns type of node
     */
    getID: () => {
      return NodeType.EDGE
    },
    /**
     * Set the panel to be drawn on
     * @param {obj} newPanel - The new panel
    */
    setPanel: (newPanel) => {
      panel = newPanel
    },
    /** Returns the panel that is drawn on 
     * @returns panel 
    */
    getPanel: () => {
      return panel
    },
    /** Returns a list of line properties 
     * @returns the list of properties
    */
    getProps: () => {
      return ['Type', 'Stroke', 'StartArrow', 'EndArrow']
    },
    /** Return line type for dropdown menu
     * @returns the list of edges
     */
    getTypes: () => {
      return ['Line', 'HVEdge', 'VHEdge']
    },
    /** Return line stroke for dropdown menu 
     * @returns the list of strokes
    */
    getStrokes: () => {
      return ['Solid', 'Dotted']
    },
    /** Return line start arrow for dropdown menu 
     * @returns list of start arrow types
    */
    getStartArrows: () => {
      return ['None', 'Diamond', 'Open', 'Close']
    },
    /** Return line end arrow for dropdown menu 
     * @returns list of end arrow types
    */
    getEndArrows: () => {
      return ['None', 'Diamond', 'Open', 'Close']
    },
    /** Returns the stroke type 
     * @returns the current stroke
    */
    getStroke: () => {
      return stroke
    },
    /** Returns the line type 
     * @returns the current type
    */
    getType: () => {
      return type
    },
    /** Returns the start arrow type 
     * @returns current start arrow
    */
    getStartArrow: () => {
      return startArrow
    },
    /** Returns the end arrow type
     * @returns current end arrow
     */
    getEndArrow: () => {
      return endArrow
    },
    /** Returns the start node 
     * @returns current start
    */
    getStart: () => {
      return start
    },
    /** Returns the end node 
     * @returns current end
    */
    getEnd: () => {
      return end
    },
    /**
     * Sets the line stroke type
     * @param {string} t - The stroke type
     */
    setStroke: (t) => {
      stroke = t.toUpperCase()
    },
    /**
     * Sets the line type
     * @param {string} t - The line type
     */
    setType: (t) => {
      type = t.toUpperCase()
    },
    /**
     * Sets the start arrow
     * @param {string} t - The start arrow type
     */
    setStartArrow: (t) => {
      startArrow = t.toUpperCase()
    },
    /**
     * Sets the end arrow
     * @param {string} t - The end arrow type
     */
    setEndArrow: (t) => {
      endArrow = t.toUpperCase()
    },
    draw: function () {
      const ps = this.getConnectionPoints()
      // LINE EDGE TYPE: LINE, HVEDGE, VHEDGE
      let line, sa, ea
      // Drawing line type
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
      // If drawing the start arrow for a Bending Edge
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
      let tE = 0; let cptE = 0; let bptE = 0; let rptE = 0; let lptE = 0
      // If drawing the end arrow for a Bending Edge
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
      // Drawing starting arrow
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
      // Drawing ending arrow
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
      // Adding all line components to the main panel
      panel.appendChild(line)
      if (sa) {
        sa.setAttribute('stroke', 'black')
        panel.appendChild(sa)
      }
      if (ea) {
        ea.setAttribute('stroke', 'black')
        panel.appendChild(ea)
      }
    },
    /**
     * Defines the start and end nodes of the edge
     * @param {node} s - The starting node
     * @param {node} e - The ending node
     */
    connect: function (s, e) {
      start = s
      end = e
    },
    /** Creates a blank clone of the edge 
     * @returns new lineEdge
    */
    clone: () => {
      return createLineEdge()
    },
    /**
     * Checks if a point is close enough to or on the edge
     * @param {coordiante} aPoint - The point to be checked
     * @returns true if point is close to line false if it isnt
     */
    contains: function (aPoint) {
      const MAX_DIST = 2
      let cps = this.getConnectionPoints()
      if (bend) {
        return (ptSegDist({ start: cps.start, end: bend }, aPoint) < MAX_DIST ||
        ptSegDist({ start: bend, end: cps.end }, aPoint) < MAX_DIST)
      }
      return ptSegDist(cps, aPoint) < MAX_DIST
    },
    /** Returns the bounds of the edge
     * @returns {JSON} x,y, width, height of the line edge
     */
    getBounds: function () {
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
    /** Grabs the start and end points for the edge
     * @returns {JSON} start and the end points of the line edge
     */
    getConnectionPoints: function () {
      const sB = start.getBounds()
      const eB = end.getBounds()
      const sC = center(sB)
      const eC = center(eB)
      return { start: start.getConnectionPoint(eC), end: end.getConnectionPoint(sC) }
    }
  }
}
