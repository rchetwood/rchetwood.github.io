'use strict'

function PropertySheet (x, y) {
  let props = []
  let current
  return {
    getProperties: (obj) => {
      current = obj
      if (obj === undefined) {
        props = []
      } else {
        props = obj.getProps()
      }
    },
    draw: () => {
      let prop, edit, rect
      const panel = document.getElementById('editor')
      if (props.length === 0) {
        return
      }
      for (let i = 0; i < props.length; i++) {
        prop = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        edit = document.createElementNS('http://www.w3.org/2000/svg', 'text')
        rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        panel.appendChild(prop)
        panel.appendChild(rect)
        panel.appendChild(edit)
        // Property Name
        prop.textContent = props[i] + ': '
        prop.setAttribute('x', x)
        prop.setAttribute('y', y + ((i + 1) * 20))
        // Property info
        let func = 'get' + props[i]
        edit.textContent = current[func]().toString()
        let w = prop.getBBox().width
        edit.setAttribute('x', x + w + 10)
        edit.setAttribute('y', y + ((i + 1) * 20))
        edit.setAttribute('contentEditable', 'true')
        // Edit border rectangle
        edit.getBBox()
        rect.setAttribute('x', x + w + 5)
        rect.setAttribute('y', y + (i * 20) + 6)
        rect.setAttribute('width', 150) 
        rect.setAttribute('height', edit.getBBox().height + 1)
        rect.setAttribute('fill', 'white')
        rect.setAttribute('stroke', 'black')
      }
    }
  }
}
