function createDiamondNode (x, y, size, color) {
    return {
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
        panel.appendChild(circle)
      }
    }
  }