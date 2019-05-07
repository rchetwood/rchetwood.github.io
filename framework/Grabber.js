'use strict'

/**
 * Creates one of the four grabbers of a selected object
 * @param {int} x - The x coordinate
 * @param {int} y - The y coordinate
 */
function drawGrabber (x, y) {
  const size = 5
  const panel = document.getElementById('graphpanel')
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', x - size / 2)
  rect.setAttribute('y', y - size / 2)
  rect.setAttribute('width', size)
  rect.setAttribute('height', size)
  rect.setAttribute('fill', 'black')
  panel.appendChild(rect)
}
