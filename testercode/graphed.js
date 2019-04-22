'use strict'

function createCircleNode (x, y, size, color) {
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
    },
    getConnectionPoint: (p) => {
      let cx = x + size/2
      let cy = y + size/2
      let dx = p.x - cx
      let dy = p.y - cy
      let dist = Math.sqrt(dx**2 + dy**2)
      if (dist === 0) {
        return other
      } else {
        return { x: cc + dx * (size / 2) / dist, y: cy + dy * (size / 2) / dist }
      }
    }
  }
}

function drawGrabber(x, y) {
  const size = 5;
      const panel = document.getElementById('graphpanel')
      const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      rect.setAttribute('x', x - size / 2)
      rect.setAttribute('y', y - size / 2)
      rect.setAttribute('width', size )
      rect.setAttribute('height', size )
      rect.setAttribute('fill', 'black')
      panel.appendChild(rect)

}

class Graph {
  constructor() {
    this.nodes = []
    this.edges = []
  }
  add(n) {
    this.nodes.push(n)
  }
  findNode(p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  draw() {
    for (const n of this.nodes) {
      n.draw()
    }
    for (const e of this.edges) {
      e.draw()
    }
  }
  connect(e, p1, p2) {
    const n1 = this.findNode(p1)
    const n2 = this.findNode(p2)
    if (n1 !== undefined && n2 !== undefined) {
      e.connect(n1, n2)
      this.edges.push(e)
      return true
    }
    return false
  }
}

function center(rect) {
  return { x: rect.x + rect.width / 2,
           y: rect.y + rect.height / 2 }
}

function createLineEdge() {
  let start = undefined
  let end = undefined
  return {
    connect: (s, e) => {
      start = s
      end = e
    },
    draw: () => {
      const panel = document.getElementById('graphpanel')
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line')
      line.setAttribute('edge','line2')
      
      // Just pick the center of the bounds for now
      panel.addEventListener('mousedown', event => {
        let mousePoint = mouseLocation(event)
        // edgeStartPoint = mousePoint
        selected = graph.findNode(mousePoint)
        if (selected){
           p = selected.getBounds()}
        // repaint()
      })
    
      // const p = center(start.getBounds())
      const x1 = p.x
      const y1 = p.y
      line.setAttribute('x1',x1.toString())
      line.setAttribute('y1',y1.toString())

      // Not the "connection points" that graphed2 uses
      panel.addEventListener('mouseup', event => {
        let mousePoint = mouseLocation(event)
        // dragStartPoint = undefined
        // dragStartBounds = undefined
        // repaint()
        // edgeEndPoint = mousePoint
        selected = graph.findNode(mousePoint)
        if (selected){
           q = selected.getBounds()}
      })
      // const q = center(end.getBounds()) 
      const x2 = q.x
      const y2 = q.y
      line.setAttribute('x2',x2.toString())
      line.setAttribute('y2',y2.toString())
      line.setAttribute('stroke','black')
      panel.appendChild(line)
    }
  }
}

function doRectClick(){
  let circleNodeBtn = document.getElementById('circleNodeBtn')
  let edgeBtn = document.getElementById('edgeBtn')
  if( circleNodeBtn.style.fill == 'white')
  {
    circleNodeBtn.style.fill = 'grey'
  }
  else{
    circleNodeBtn.style.fill = 'white'
  }

}

document.addEventListener('DOMContentLoaded', function () {
  const graph = new Graph()
  const n1 = createCircleNode(10, 10, 20, 'goldenrod')
  const n2 = createCircleNode(30, 30, 20, 'blue')
  graph.add(n1)
  graph.add(n2)
  graph.draw()  
  // const e = createLineEdge()
  // graph.connect(e, { x: 20, y: 20 }, { x: 40, y: 40 })



  function mouseLocation(event) {
    var rect = panel.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    }
  }
  
  let selected = undefined
  
  function repaint() {
    panel.innerHTML = ''
    graph.draw()
    if (selected !== undefined) {
      const bounds = selected.getBounds()
      drawGrabber(bounds.x, bounds.y)
      drawGrabber(bounds.x + bounds.width, bounds.y)
      drawGrabber(bounds.x, bounds.y + bounds.height)      
      drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
    }    
  }
  
  let dragStartPoint = undefined
  let dragStartBounds = undefined
  let connectStartBounds = undefined
  let connectEndBounds = undefined
  const panel = document.getElementById('graphpanel')
  panel.addEventListener('mousedown', event => {
    let mousePoint = mouseLocation(event)
    dragStartPoint = mousePoint
    selected = graph.findNode(mousePoint)
    if (selected){
       dragStartBounds = selected.getBounds()
       connectStartBounds = selected.getBounds()}
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
      
    }
    repaint()
  })

  panel.addEventListener('mouseup', event => {
    let mousePoint = mouseLocation(event)
    selected = graph.findNode(mousePoint)
    if (selected){
      connectEndBounds =selected.getBounds()}
    dragStartPoint = undefined
    dragStartBounds = undefined
    repaint()
  })

  // panel.addEventListener('click', event => {
  //   // let circleNodeBtn = document.getElementById('circleNodeBtn')
  //   let location = mouseLocation(event)
  //   let n = createCircleNode(location.x, location.y, 20, 'green')
  //   graph.add(n)
  //   graph.draw();
  // })

  function within(element, pointx, pointy){
    if(pointx >= element.x && pointx <= element.x + element.width
      && pointy <= element.y + height, pointy >= element.y){
        return true
      }
      return false
  }
 
  //code for cloning!
  let btnPressed = undefined
  let circleNodeBtn = document.getElementById('circleNodeBtn')
  let edgeBtn = document.getElementById('edgeBtn')
  circleNodeBtn.addEventListener('click', event =>{

    console.log("pressed? " + btnPressed)

    if(circleNodeBtn.style.fill == 'white'){
      circleNodeBtn.style.fill = 'grey'    
      btnPressed = true
      console.log("pressed? " + btnPressed)
    }else{
      circleNodeBtn.style.fill = 'white'
      btnPressed = false
      console.log("pressed? " + btnPressed)
    }  

  })

  panel.addEventListener('click', event => {
    let location = mouseLocation(event)
    let n = createCircleNode(location.x, location.y, 20, 'green')
    if(btnPressed){
      graph.add(n)
      graph.draw();
    }

  })

})

module.exports = graphed