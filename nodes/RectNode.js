'use strict'

function createRectNode (x, y) {
  let defaultWidth = 50
  let defaultHeight = 25
  let defaultColor = 'white'
  let color = defaultColor
  let width = defaultWidth
  let height = defaultHeight
  let name, methods, attributes // These may be strings
  let mBool = 0 // fake booleans to set height in draw method
  let aBool = 0
  return {
    getProps: () => {
      return ['Name', 'Methods', 'Attributes']
    },
    getName: (t) => {
      return name
    },
    getMethods: (t) => {
      return methods
    },
    getAttributes: (t) => {
      return attributes
    },
    setName: (t) => {
      name = t
    },
    setMethods: (t) => {
      methods = t
    },
    setAttributes: (t) => {
      attributes = t
    },
    getConnectionPoint: (p) => {
      let cx = x + width / 2
      let cy = y + height / 2
      let dx = p.x - cx
      let dy = p.y - cy
      if (dx < dy && dx >= -dy) {
        // South
        return { x: x + width / 2, y: y + height }
      }
      if (dx >= dy && dx >= -dy) {
        // East
        return { x: x + width, y: y + height / 2 }
      }
      if (dx < dy && dx < -dy) {
        // West
        return { x: x, y: y + height / 2 }
      }
      if (dx >= dy && dx < -dy) {
        // North
        return { x: x + width / 2, y: y }
      }
      return p
    },
    clone: (x, y) => {
      return createRectNode(x, y)
    },
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: width,
        height: height
      }
    },
    contains: p => {
      return ((x + width / 2 - p.x) ** 2 + (y + height / 2 - p.y) ** 2 <= ((width + height) / 2) ** 2 / 2)
    },
    translate: (dx, dy) => {
      x += dx
      y += dy
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      const nameBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const methBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const attBox = document.createElementNS('http://www.w3.org/2000/svg', 'text')
      const methLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      const attLine = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      panel.appendChild(rect)
      // Find dimensions of text to determine bounding rectangle size
      let nb, mb, ab
      let nh = 0, mh = 0, ah = 0
      if (name !== undefined) {
        nameBox.textContent = name
        panel.appendChild(nameBox)
        nb = nameBox.getBBox()
        width = nb.width + 10
        nh = nb.height
        nameBox.setAttribute('x', x + 5)
        nameBox.setAttribute('y', y + nh)
      }
      if (methods !== undefined) {
        methBox.textContent = methods
        panel.appendChild(methBox)
        mb = methBox.getBBox()
        mh = mb.height
        if (mb.width + 10 > width) {
          width = mb.width + 10
        }
        methBox.setAttribute('x', x + 5)
        methBox.setAttribute('y', y + nh + 20)
        if (mBool === 0){
          height += mh + 5
          mBool++
        }
        panel.appendChild(methLine)
      } else {
        mBool = 0
      }
      if (attributes !== undefined) {
        attBox.textContent = attributes
        panel.appendChild(attBox)
        ab = attBox.getBBox()
        ah = ab.height
        if (ab.width + 10 > width) {
          width = ab.width + 10
        }
        attBox.setAttribute('x', x + 5)
        attBox.setAttribute('y', y + nh + mh + 25)
        if (aBool === 0){
          height += ah + 5
          aBool++
        }
        panel.appendChild(attLine)
      } else {
        aBool = 0
      }
      if (methLine !== undefined) {
        methLine.setAttribute('x1', x)
        methLine.setAttribute('y1', y + nh + 5)
        methLine.setAttribute('x2', x + width)
        methLine.setAttribute('y2', y + nh + 5)
        methLine.setAttribute('stroke', 'black')
      }
      if (attLine !== undefined) {
        attLine.setAttribute('x1', x)
        attLine.setAttribute('y1', y + nh + mh + 10)
        attLine.setAttribute('x2', x + width)
        attLine.setAttribute('y2', y + nh + mh + 10)
        attLine.setAttribute('stroke', 'black')
      }
      rect.setAttribute('x', x)
      rect.setAttribute('y', y)
      rect.setAttribute('width', width)
      rect.setAttribute('height', height)
      rect.setAttribute('fill', color)
      rect.setAttribute('stroke', 'black')
    }
  }
}
