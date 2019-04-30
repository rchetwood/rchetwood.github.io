'use strict'

function drawGrabber (x, y) {
  const size = 5
  var panel = document.getElementById('graphpanel')
  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
  rect.setAttribute('x', x - size / 2)
  rect.setAttribute('y', y - size / 2)
  rect.setAttribute('width', size)
  rect.setAttribute('height', size)
  rect.setAttribute('fill', 'black')
  panel.appendChild(rect)
}

document.addEventListener('DOMContentLoaded', function () {

  var toolBarPanel = document.getElementById('toolbar')
  let toolBar = toolbar()

  toolBar.add(createDiamondNode, toolBarPanel, (state) => {
    let button = toolBar.getButton(createDiamondNode)
    if (!button.isPressed().isPressed) {
      state.current = "Currently drawing diamonds"
      button.setPressed(true)
    } else {
      state.current = "Not drawing"
      button.setPressed(false)
    }

    console.log("state: " + state.current)
  })

  toolBar.add(createCircleNode, toolBarPanel, (state) => {
    let button = toolBar.getButton(createCircleNode)

    if (!button.isPressed().isPressed) {
      state.current = "Currently drawing circles"
      button.setPressed(true)
    } else if(button.isPressed) {
      state.current = "Not drawing " 
      button.setPressed(false)
    }

    console.log("state: " + state.current)
  })

  toolBar.draw()
  
  const graph = Graph()
  var panel = document.getElementById('graphpanel')
  
  const n1 = createCircleNode(10, 10)
  n1.setPanel(panel)
  const n2 = createCircleNode(30, 30)
  n2.setPanel(panel)
  const cn = createInterfaceNode(70,70)
  const rn = createRectNode(250, 30)
  rn.setName('test class')
  rn.setMethods('method1()')
  rn.setAttributes('attribute')
  const e = createLineEdge()
  graph.add(n1)
  graph.add(n2)
  graph.add(cn)
  graph.add(rn)
  graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })
  graph.draw()  

  // Property Sheet
  const p = PropertySheet(5, 5)
  p.draw()
  
  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  function repaint() {
    panel.innerHTML = ''
    editor.innerHTML= ''
    graph.draw()
    p.draw()
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

  var panel = document.getElementById('graphpanel')

  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event) 
    dragStartPoint = mousePoint
    selected = graph.findNode(mousePoint)

    if (selected){
      isEdge = false
      dragStartBounds = selected.getBounds()
      connectStartBounds = selected.getBounds()
      p.getProperties(selected)
    } else {
      // Grab Edge if not a Node
      isEdge = true
      selected = graph.findEdge(mousePoint)
      p.getProperties(selected)
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
    FormLayout(graph)
  })

  const editor = document.getElementById('editor')
  // Add editor listeners here
})