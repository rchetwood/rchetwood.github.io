
document.addEventListener('DOMContentLoaded', function () {
  const scene = 'toolbar'
  let toolBar = toolbar()

  toolBar.add(createDiamondNode, scene)
  toolBar.add(createDiamondNode, scene)
  toolBar.add(createCircleNode, scene)
  toolBar.add(createDiamondNode, scene)
  toolBar.draw()
})

function toolbar() {
  let buttons = []
  const gap = 6
  return {
    add: (nodeType, scene) => {
      if (buttons.length > 0) {
        const lastButton = buttons[buttons.length - 1]
        const x = lastButton.getBounds().x + lastButton.getBounds().width + gap
        const y = lastButton.getBounds().y
        const button = createButton(x, y, nodeType, scene)
        buttons.push(button)
      } else {
        const panel = document.getElementById(scene)
        const dim = panel.getBoundingClientRect()
        const x = dim.left + gap
        const y = dim.top + gap
        const button = createButton(x, y, nodeType, scene)
        buttons.push(button)
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
}

function createButton(x, y, aNode, scene) {
  const default_size = 20
  const button_color = 'grey'
  const node_color = 'blue'
  return {
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: default_size,
        height: default_size
      }
    },
    getNodeType: (x, y, aNode, scene) => {
      if (aNode.getProperties().name == NodeType.CIRCLE) {
        console.log('circle')
        return cirlceNode(x + (default_size / 4), y + (default_size / 4), default_size / 2, node_color, scene)
      } else if (aNode.getProperties().name == NodeType.DIAMOND) {
        console.log('diamond')
        return diamondNode(x + (default_size / 4), y + (default_size / 4), default_size / 2, node_color, scene)
      }
    },
    draw: () => {
      let panel = document.getElementById(scene)

      let square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
      square.setAttribute('height', default_size)
      square.setAttribute('width', default_size)
      square.setAttribute('x', x)
      square.setAttribute('y', y)
      square.setAttribute('fill', button_color)
      panel.appendChild(square)

      let node = aNode(x + (default_size / 4), y + (default_size / 4), default_size / 2, node_color, scene)
      // if (nodeType.properties == NodeType.CIRCLE) {
      //   console.log('circle')
      //   node = cirlceNode(x + (default_size / 4), y + (default_size / 4), default_size / 2, node_color, scene)
      // } else if (nodeType.properties == NodeType.DIAMOND) {
      //   console.log('diamond')
      //   node = diamondNode(x + (default_size / 4), y + (default_size / 4), default_size / 2, node_color, scene)
      // }

      node.draw()
    }

  }
}


