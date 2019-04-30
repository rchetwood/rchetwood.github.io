'use strict'

function createCircleNode (x, y) {
  const defaultSize = 20
  const defaultColor = 'white'
  let size = defaultSize
  let color = defaultColor
  return {
    getProps: () => {
      return ['Color', 'Size']
    },
    getSize: (t) => {
      return size
    },
    getColor: (t) => {
      return color
    },
    setSize: (t) => {
      size = t
    },
    setColor: (t) => {
      color = t
    },
    getConnectionPoint: (p) => {
      let cx = x + size / 2
      let cy = y + size / 2
      let dx = p.x - cx
      let dy = p.y - cy
      let dist = Math.sqrt(dx ** 2 + dy ** 2)
      if (dist === 0) {
        return p
      } else {
        return { x: cx + dx * (size / 2) / dist, y: cy + dy * (size / 2) / dist }
      }
    },
    clone: (x, y) => {
      return createCircleNode(x, y)
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
      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
      circle.setAttribute('cx', x + size / 2)
      circle.setAttribute('cy', y + size / 2)
      circle.setAttribute('r', size / 2)
      circle.setAttribute('fill', color)
      diamond.setAttribute('stroke', 'black')
      panel.appendChild(circle)
    }
  }
}
