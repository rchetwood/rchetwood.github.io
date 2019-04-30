'use strict'
function createClassNode(x,y){
    let color = 'white' // Default color
    let width = 150 // Default width - temporary
    let height = 100 // Default height - temporary
    let text, methods, attributes // These may be strings
    let type // Class/Interface? Have this one file, or two separate?
    return{
        getConnectionPoint: (p)=>{
            let bounds = getBounds()
            let slope = bounds.getHeight() / bounds.getWidth()
            let ex = p.x
            let ey = p.y
            let x = bounds.getCenterX()
            let y = bounds.getCenterY()
            
            if (ex != 0 && -slope <= ey / ex && ey / ex <= slope)
            {  
                // intersects at left or right boundary
                if (ex > 0) 
                {
                x = bounds.x + bounds.width
                y += (bounds.getWidth() / 2) * ey / ex
                }
                else
                {
                x = bounds.x
                y -= (bounds.width / 2) * ey / ex
                }
            }
            else if (ey != 0)
            {  
                // intersects at top or bottom
                if (ey > 0) 
                {
                x += (bounds.height / 2) * ex / ey
                y = bounds.y +bounds.height
                }
                else
                {
                x -= (bounds.height / 2) * ex / ey
                y = bounds.y
                }
            }
            return {
                x:x,
                y:y
            }
        },
        clone: () => {
            let cloneCN = createRectNode()
            cloneCN.x = x
            cloneCN.y = y
            cloneCN.width = width
            cloneCN.height = height
            cloneCN.color = color
            return cloneCN
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
        raw: ()=>{
            const panel = document.getElementById('graphpanel')
            const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
            // const size = 40
            rect.setAttribute('x', x)
            rect.setAttribute('y', y)
            rect.setAttribute('width', 300 )
            rect.setAttribute('height', 200)
            rect.setAttribute('fill', 'white' )
            rect.setAttribute('stroke', 'black')
            rect.setAttribute('stroke-width', 1)
            panel.appendChild(rect)

        }
    }
}