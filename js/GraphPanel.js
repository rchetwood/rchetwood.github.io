'use strict'

const {LineEdge} = requires('./LineEdge')

function GraphPanel(Toolbar, Graph){
    document.bgColor = 'white'
    let toolBar = Toolbar
    let graph = Graph()
    graph = Graph
    let selected  = undefined
    let rubberBandStart = undefined
    const PURPLE = rbg(0.7,0.4,0.7)

    document.addEventListener('DOMContentLoaded', function () {
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
                // This line should theoretically work, but currently doesnt.
                if (selected instanceof createLineEdge) {
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
          
          let dragStartPoint = undefined
          let dragStartBounds = undefined
          const panel = document.getElementById('graphpanel')
          panel.addEventListener('mousedown', event => {
            let mousePoint = mouseLocation(event)
            dragStartPoint = mousePoint
            selected = graph.findNode(mousePoint)
            if (selected){
              dragStartBounds = selected.getBounds()
            } else {
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
        
          panel.addEventListener('mouseup', event => {
            let mousePoint = mouseLocation(event)
            dragStartPoint = undefined
            dragStartBounds = undefined
            repaint()
          })
    })
    return{
        paintComponent: () => {
            let bounds = getBounds()
            let graphBounds = graph.getBounds()
            graph.draw()

            if(selected instanceof Node){
                let grabberBounds = selected.getBounds()
                drawGrabber(bounds.x, bounds.y)
                drawGrabber(bounds.x + bounds.width, bounds.y)
                drawGrabber(bounds.x, bounds.y + bounds.height)      
                drawGrabber(bounds.x + bounds.width, bounds.y + bounds.height)
            }
            
            if(selected instanceof LineEdge){
                let edge = selected.getConnectionPoints()
                drawGrabber(edge.x1, edge.y1)
                drawGrabber(edge.x2, edge.y2)
            }

            if(rubberBandStart !== undefined){
                // Color oldColor = g2.getColor();
                let color = PURPLE
                let newline = Line(rubberBandStart, lastMousePoint)
                newline.draw()
                // g2.setColor(oldColor);
            }
        },
        removeSelected: () =>{
            if( selected instanceof Node){
                graph.removeNode(selected)
            }else if(selected instanceof LineEdge){
                graph.removeEdge(selected)
            }
            selected = null
            repaint()
        },
        editSelected: () =>{
            const panel = document.getElementById('editSelected')
            panel.addEventListener('editSelected', event => {
                repaint()
            })
            alert('properties') 
            //also need a dropdown for the list of properties
        },
        drawGrabber: (x, y)=>{
            const size = 5;
            const panel = document.getElementById('graphpanel')
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            rect.setAttribute('x', x - size / 2)
            rect.setAttribute('y', y - size / 2)
            rect.setAttribute('width', size )
            rect.setAttribute('height', size )
            rect.setAttribute('fill', 'black')
            panel.appendChild(rect)
          
        },
        getPrefferedSize: () =>{
            let bounds = graph.getBounds()
            return{
                x: bounds.x,
                y: bounds.y
            }
        }
    }
}

module.exports ={ GraphPanel}