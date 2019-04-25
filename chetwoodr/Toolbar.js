'use strict'

//   const n1 = createCircleNode(10, 10, 20, 'goldenrod')
//   const n2 = createCircleNode(30, 30, 20, 'blue')
//   const n3 = createDiamondNode(50, 50, 20, 'red')


draw= () => {
    const x = 10
    const y = 10
    const size = 20
    const color = 'red'
    const panel = document.getElementById('graphpanel')
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    circle.setAttribute('cx', x + size / 2)
    circle.setAttribute('cy', y + size / 2)
    circle.setAttribute('r', size / 2)
    circle.setAttribute('fill', color)
    panel.appendChild(circle)
}

draw();






