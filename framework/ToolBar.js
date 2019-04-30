
// document.addEventListener('DOMContentLoaded', function () {
//     const panel = document.getElementById('toolbar')
//     let toolBar = toolbar()

//     console.log('panel: ' + panel)
  
//     toolBar.add(createDiamondNode, panel, (state) => {
//       let button = toolBar.getButton(createDiamondNode)
//       if (!button.isPressed().isPressed) {
//         state.current = "Currently drawing diamonds"
//         button.setPressed(true)
//       } else {
//         state.current = "Not drawing"
//         button.setPressed(false)
//       }
  
//       console.log("state: " + state.current)
//     })
  
//     toolBar.add(createCircleNode, panel, (state) => {
//       let button = toolBar.getButton(createCircleNode)
  
//       if (!button.isPressed().isPressed) {
//         state.current = "Currently drawing circles"
//         button.setPressed(true)
//       } else if(button.isPressed) {
//         state.current = "Not drawing " 
//         button.setPressed(false)
//       }
  
//       console.log("state: " + state.current)
//     })
  
//     toolBar.draw()
//   })
  
  function toolbar() {
    let buttons = []
    const gap = 6
    return {
      getButton: (n) => {
        if (buttons.length > 0) {
          let tempNode = n(0, 0)
          for (i = 0; i < buttons.length; i++) {
            let button = buttons[i]
            if (button.getNodeType().name === tempNode.getNodeType().name) {
              return buttons[i]
            }
          }
        }
        return null
      },
      add: (nodeToDraw, panel, functionThatChangesState) => {
        if (find(nodeToDraw) === null) {
          if (buttons.length > 0) {
            const lastButton = buttons[buttons.length - 1]
            const x = lastButton.getBounds().x + lastButton.getBounds().width + gap
            const y = lastButton.getBounds().y
            const button = createButton(x, y, nodeToDraw, panel, functionThatChangesState)
            buttons.push(button)
          } else {
            const dim = panel.getBoundingClientRect()
            const x = dim.left + gap
            const y = dim.top + gap
            const button = createButton(x, y, nodeToDraw, panel, functionThatChangesState)
            button.setPressed(false)
            buttons.push(button)
          }
        }
      },
      remove: () => {
        buttons.pop()
      },
      draw: () => {
        for (i = 0; i < buttons.length; i++) {
          buttons[i].draw();
        }
      }
    }
  
    function find(n) {
      if (buttons.length > 0) {
        let tempNode = n(0, 0)
        for (i = 0; i < buttons.length; i++) {
          let button = buttons[i]
          if (button.getNodeType().name === tempNode.getNodeType().name) {
            return button[i]
          }
        }
      }
      return null
    }
    
  }
  
  function createButton(x, y, nodeToDraw, panel, aStrategy) {
    const default_size = 20
    let button_color = 'grey'
    const node_color = 'blue'
    let square = getSquare()
    return {
      getNodeType: () => {
        let tempNode = nodeToDraw(0, 0)
        return {
          name: tempNode.getNodeType().name
        }
      },
      isPressed: () => {
        return {
          isPressed: isPressed
        }
      },
      setPressed: (newPress) => {
        if (newPress) {
          this.isPressed = newPress;
          square.style.fill = 'black'
        } else {
          this.isPressed = false;
          square.style.fill = 'grey'
        }
      },
      getBounds: () => {
        return {
          x: x,
          y: y,
          width: default_size,
          height: default_size
        }
      },
      draw: () => {
        let node = getNode((default_size / 4), (default_size / 4))
        let div = getDiv()
        div.addEventListener('click', aStrategy)
        let svg = getSVG(div)
        node.setPanel(svg)
        svg.append(square)
        node.draw()
        div.append(svg)
        panel.appendChild(div)
      }
    }
  
    function getNode(x, y) {
      let tempNode = nodeToDraw(0, 0)
      if (tempNode.getNodeType().name == NodeType.CIRCLE) {
        let circle = createCircleNode(x, y)
        circle.setSize(default_size / 2)
        circle.setColor(node_color)
        circle.setPanel(panel)
        return circle
      } else if (tempNode.getNodeType().name == NodeType.DIAMOND) {
        let diamond = createDiamondNode(x, y)
        diamond.setSize(default_size / 2)
        diamond.setColor(node_color)
        diamond.setPanel(panel)
        return diamond
      }
    }
  
    function getDiv() {
      const node = getNode(0, 0)
      var div = document.createElement('div');
      div.style.position = "absolute"
      div.style.left = x + 'px'
      div.style.top = y + 'px'
      div.style.height = default_size + 'px'
      div.style.width = default_size + 'px'
      div.id = node.getNodeType().name
      return div
    }
  
    function getSquare() {
      let square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      square.setAttribute('height', default_size)
      square.setAttribute('width', default_size)
      square.setAttribute('x', 0)
      square.setAttribute('y', 0)
      square.setAttribute('fill', button_color)
      return square
    }
  
    function getSVG(div) {
      let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('height', default_size)
      svg.setAttribute('width', default_size)
      svg.setAttribute('x', div.style.left)
      svg.setAttribute('y', div.style.top)
      return svg
    }
  }
  
  
  