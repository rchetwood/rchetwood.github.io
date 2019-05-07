'use strict'

/**
 * Main component that combines everything together to work.
 * Includes a Navigation Bar, a Tool Bar, a UML Editor, and a Property Sheet
 * As well as their corresponding event listeners.
 */
document.addEventListener('DOMContentLoaded', function () {
  // ===== NAVIGATION BAR - NAVBAR DIV ===== //
  const navbar = document.getElementById('navbar')
  const clear = document.createElement('button') // Clear the main panel
  clear.innerHTML = 'New'
  const edit = document.createElement('button') // Edit the selected
  edit.innerHTML = 'Edit'
  const del = document.createElement('button') // Delete the selected
  del.innerHTML = 'Delete'
  // Add buttons to NavBar
  navbar.appendChild(clear)
  navbar.appendChild(edit)
  navbar.appendChild(del)

  // === Add NavBar Listeners Here === //
  // Clears the graph and resets the frame.
  clear.addEventListener('click', function () {
    let i
    let ns = graph.getNodes().length
    for (i = 0; i < ns; i++) {
      graph.removeNode(ns[i])
    }
    let es = graph.getEdges().length
    for (i = 0; i < es; i++) {
      graph.removeEdge(es[i])
    }
    selected = undefined
    p.getProperties(selected)
    repaint(true)
  })
  // Edits the selected object
  edit.addEventListener('click', function () {
    let temp = toolBar.getPressedButton()
    if (!temp && selected) {
      p.getProperties(selected)
    }
    repaint(true)
    if (selected) {
      editor.appendChild(btn)
    }
  })
  // Deletes the selected object
  del.addEventListener('click', function () {
    let temp = toolBar.getPressedButton()
    if (!temp && selected) {
      if (selected.isEdge) {
        graph.removeEdge(selected)
      } else {
        graph.removeNode(selected)
      }
      selected = undefined
      p.getProperties(selected)
      repaint(true)
    }
  })

  // ===== TOOLBAR - TOOLBAR DIV ===== //
  const toolBarPanel = document.getElementById('toolbar')
  const toolBar = toolbar()
  // === Add new Nodes/Edges Here === //
  const nodesAndEdges = [
    createCircleNode,
    createDiamondNode,
    createClassNode,
    createInterfaceNode,
    createNoteNode,
    createLineEdge,
    createHVEdge,
    createVHEdge,
    createAggregateEdge,
    createDependEdge,
    createInheritEdge,
    createInterfaceEdge
    // createImageNode // TO BE ADDED IN PRESENTATION
  ]
  // Add all Node/Edge constructors into Toolbar
  for (let i = 0; i < nodesAndEdges.length; i++) {
    let temp = nodesAndEdges[i]
    toolBar.add(temp, toolBarPanel, () => {
      let button = toolBar.getButton(temp)
      if (!button.isPressed()) {
        toolBar.reset()
        button.setPressed(true)
      } else {
        button.setPressed(false)
      }
    })
  }
  // Draw the Toolbar
  toolBar.draw()

  // === Add Toolbar Listeners Here === //
  // Checks if any button is pressed. If a button is pressed, do not display the PropertySheet.
  toolBarPanel.addEventListener('click', event => {
    let temp = toolBar.getPressedButton()
    if (temp) {
      p.getProperties(undefined)
      repaint(true)
    }
  })

  // ===== UML EDITOR - GRAPHPANEL DIV ===== //
  const panel = document.getElementById('graphpanel')
  const graph = Graph()
  graph.draw()

  // === Add Graph Listeners Here === //
  // Adds a specific node if a specific Toolbar button is pressed
  panel.addEventListener('click', event => {
    let mousePoint = mouseLocation(event)
    let temp = toolBar.getPressedButton()
    let node
    if (temp && !temp.isEdge) {
      node = temp.clone(mousePoint.x, mousePoint.y)
      node.setPanel(panel)
      graph.add(node)
      repaint(true)
    }
  })
  // Checks entire state when the mouseclick goes up
  panel.addEventListener('mouseup', event => {
    let mousePoint = mouseLocation(event)
    if (startNode && !startNode.isEdge) {
      selected = graph.findNode(mousePoint)
    }
    if (selected) {
      connectEndBounds = selected.getBounds()
      let uppt = center(connectEndBounds)
      upx = uppt.x
      upy = uppt.y
    }
    dragStartPoint = undefined
    dragStartBounds = undefined
    let node = toolBar.getPressedButton()
    // If creating an edge, check the start and end node, and that they are not the same.
    if (node && node.isEdge && startNode && selected && (startNode !== selected)) {
      let e = node.clone()
      e.setPanel(panel)
      graph.connect(e, { x: downx, y: downy }, { x: upx, y: upy })
    }
    repaint(true)
  })
  // Checks entire state when the mouseclick goes down
  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    dragStartPoint = mousePoint
    selected = graph.findNode(mousePoint)
    if (selected) {
      dragStartBounds = selected.getBounds()
      connectStartBounds = selected.getBounds()
      let downpt = center(connectStartBounds)
      downx = downpt.x
      downy = downpt.y
    } else {
      selected = graph.findEdge(mousePoint)
    }
    startNode = selected
    p.getProperties(undefined)
    repaint(true)
  })
  // Checks entire state when the mouse moves
  panel.addEventListener('mousemove', event => {
    let mousePoint = mouseLocation(event)
    let temp = toolBar.getPressedButton()
    // If no toolbar button is being used, and a node is selected
    if (dragStartBounds && !temp && selected) {
      // Dragging Nodes
      const bounds = selected.getBounds()
      selected.translate(
        dragStartBounds.x - bounds.x +
        mousePoint.x - dragStartPoint.x,
        dragStartBounds.y - bounds.y +
        mousePoint.y - dragStartPoint.y)
    }
    repaint(false)
  })

  // ===== PROPERTY SHEET - EDITOR DIV ===== //
  const editor = document.getElementById('editor')
  const p = PropertySheet()
  p.draw()
  // Submit Button
  const btn = document.createElement('button')
  btn.innerHTML = 'Submit'

  // === Add Editor Listeners Here === //
  // Submits the new properties when the button is clicked
  btn.addEventListener('click', function () {
    let j = 0
    let cn = editor.childNodes
    if (selected) {
      if (!selected.isEdge) {
        for (let i = 1; i < cn.length; i += 3) {
          let newval = cn[i].value
          let sp = Array.from(selected.getProps().keys())
          cn[i].value = newval
          let func = 'set' + sp[j]
          selected[func](newval)
          j++
        }
      } else {
        let fcn = cn[0].childNodes
        for (let i = 1; i < fcn.length; i += 3) {
          let sp = selected.getProps()
          let obj = document.getElementById(sp[j].toString())
          let newval = obj.options[obj.selectedIndex].text
          let func = 'set' + sp[j]
          selected[func](newval)
          j++
        }
      }
    }
    repaint(true)
    editor.appendChild(btn)
  })

  // ===== GENERAL FUNCTIONS & VARIABLES ===== //
  let downx, downy, upx, upy
  let startNode, selected, dragStartPoint, dragStartBounds
  let connectStartBounds, connectEndBounds

  /**
   * Returns the location of the mouse
   * @param {*} event - General event
   */
  function mouseLocation (event) {
    const rect = panel.getBoundingClientRect()
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }

  /**
   * Repaints the UML Editor and the PropertySheet
   * @param {boolean} bool - To redraw the PropertySheet
   */
  function repaint (bool) {
    panel.innerHTML = ''
    graph.draw()
    if (bool) {
      editor.innerHTML = ''
      p.draw()
    }
    let temp = toolBar.getPressedButton()
    if (!temp) {
      if (selected) {
        if (selected.isEdge) {
          const cps = selected.getConnectionPoints()
          const s = cps.start
          const e = cps.end
          drawGrabber(s.x, s.y)
          drawGrabber(e.x, e.y)
        } else {
          const bounds = selected.getBounds()
          drawGrabber(bounds.x, bounds.y)
          drawGrabber((bounds.x + bounds.width / 1), bounds.y)
          drawGrabber(bounds.x, (bounds.y + bounds.height / 1))
          drawGrabber((bounds.x + bounds.width / 1), (bounds.y + bounds.height / 1))
        }
      } else if (editor.contains(btn)) {
        // Remove the submit button
        editor.removeChild(btn)
      }
    } else {
      // Reset selected and remove the submit button
      selected = undefined
      if (editor.contains(btn)) {
        editor.removeChild(btn)
      }
    }
    // Resizes the graph is the node are outside the graphframe
    FormLayout(graph)
  }
})
