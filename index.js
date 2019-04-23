'use strict'

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

document.addEventListener('DOMContentLoaded', function () {
  const graph = Graph()
  const n1 = createCircleNode(10, 10, 20, 'goldenrod')
  const n2 = createCircleNode(30, 30, 20, 'blue')
  const e = createLineEdge()
  graph.add(n1)
  graph.add(n2)
  graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
  graph.draw()  
  
  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  function repaint() {
    panel.innerHTML = ''
    graph.draw()
    if (selected !== undefined) {
      // Need to fix this to work for the edge
      if (isEdge) {
        const cps = selected.getConnectionPoints()
        const s = cps.start
        const e = cps.end
        drawGrabber(s.x, s.y)
        drawGrabber(e.x, e.y)
      } else {
        const bounds = selected.getBounds()
        drawGrabber(bounds.x, bounds.y)
        drawGrabber(bounds.x + bounds.width, bounds.y)
        drawGrabber(bounds.x, bounds.y + bounds.height)
        drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
      }
    }    
  }
  
  let isEdge = false
  let selected, dragStartPoint, dragStartBounds
  let connectStartBounds, connectEndBounds

  const panel = document.getElementById('graphpanel')
  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    dragStartPoint = mousePoint
    selected = graph.findNode(mousePoint)
    if (selected){
      isEdge = false
      dragStartBounds = selected.getBounds()
      connectStartBounds = selected.getBounds()
    } else {
      // Grab Edge if not a Node
      isEdge = true
      selected = graph.findEdge(mousePoint)
    }
    repaint()
  })

  panel.addEventListener('mousemove', event => {
    let mousePoint = mouseLocation(event)
    if(dragStartBounds !== null) {
      //dragging
      const bounds = selected.getBounds()
      selected.translate(
        dragStartBounds.x - bounds.x 
        + mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y 
        + mousePoint.y - dragStartPoint.y) 
    }
    repaint()
  })

  panel.addEventListener('mouselocation', event => {
    let mousePoint = mouseLocation(event)
    if(mousePoint){
      // TODO
    }
    repaint()
  })

  panel.addEventListener('mouseup', event => {
    let mousePoint = mouseLocation(event)
    if (!selected) {
      selected = graph.findNode(mousePoint)
    }
    if (selected){
      connectEndBounds =selected.getBounds()}
    dragStartPoint = undefined
    dragStartBounds = undefined
    repaint()
  })

})