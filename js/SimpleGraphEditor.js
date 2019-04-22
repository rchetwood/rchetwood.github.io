'use strict'

// const { GraphFrame } = require('./GraphFrame')
// const { SimpleGraph } = require('./SimpleGraph')

/**
   A program for editing UML diagrams.
   Sets the basic frame.
*/
function SimpleGraphEditor () {
  const frame = GraphFrame(SimpleGraph())
  return frame
}

document.addEventListener('DOMContentLoaded', function () {
  const graph = SimpleGraph()
  // Add stuff to graph here?

  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }

  function repaint() {
    panel.innerHTML = ''
    graph.draw()
    if (selected) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)      
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }    
  }

  let selected // = undefined
  let dragStartPoint
  let dragStartBounds

  const panel = document.getElementById('graphpanel')
  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    dragStartPoint = mousePoint
    selected = graph.findNode(mousePoint)
    if (selected) {
      dragStartBounds = selected.getBounds()
    }
    repaint()
  })

  panel.addEventListener('mouseup', event => {
    let mousePoint = mouseLocation(event)
    dragStartPoint = undefined
    dragStartBounds = undefined
    repaint()
  })

  panel.addEventListener('mousemove', event => {
    let mousePoint = mouseLocation(event)
    if (dragStartBounds !== undefined) {
      const bounds = selected.getBounds()
      selected.translate(
        dragStartBounds.x - bounds.x
        + mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y
        + mousePoint.y - dragStartPoint.y)
    }
    repaint()
  })
})

module.exports = {
  SimpleGraphEditor
}
