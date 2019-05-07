'use strict'
/** Represents a Property Sheet of a selected object */
function PropertySheet () {
  let props = []
  let propstype = []
  let current
  return {
    /**
     * Get the properties of the node selected.
     * @param obj the selected node
     */
    getProperties: (obj) => {
      current = obj
      if (!obj) {
        props = []
      } else {
        if (current.isEdge) {
          props = current.getProps()
        } else {
          let m = current.getProps()
          props = Array.from(m.keys())
          propstype = Array.from(m.values())
        }
      }
    },
    /** Draws the properties of the selected node by iterating through them and apeending html elements to the frame */
    draw: () => {
      let prop, edit, br
      // If there are no properties, do not draw anything.
      if (props.length === 0) {
        return
      }
      const panel = document.getElementById('editor')
      // Grab Each Property of Current Object
      if (current.isEdge) {
        edit = document.createElement('form')
        edit.id = 'edit'
      }
      for (let i = 0; i < props.length; i++) {
        // Define Property Name: props[i].toString()
        prop = document.createElement('label')
        prop.textContent = props[i] + ': ' // Property Name
        // Define Property Getter
        let func = 'get' + props[i]
        // If selected object is not an edge
        if (!current.isEdge) {
          edit = document.createElement('input')
          edit.setAttribute('type', propstype[i].toString())
          edit.setAttribute('value', current[func]().toString()) // Property Value
          br = document.createElement('br')
          panel.appendChild(prop)
          panel.appendChild(edit)
          panel.appendChild(br)
        } else {
          // Else, selected is an edge
          let drop = document.createElement('select')
          drop.id = props[i].toString()
          let f = 'get' + props[i] + 's'
          let temp = current[f]()
          for (let i = 0; i < temp.length; i++) {
            let op = document.createElement('option')
            let t = temp[i]
            op.value = t
            op.innerHTML = t
            if (t.toLowerCase() === current[func]().toString().toLowerCase()) {
              op.selected = 'selected'
            }
            drop.appendChild(op)
          }
          br = document.createElement('br')
          edit.appendChild(prop)
          edit.appendChild(drop)
          edit.appendChild(br)
          panel.appendChild(edit)
        }
      }
    }
  }
}
