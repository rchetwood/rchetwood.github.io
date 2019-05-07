'use strict'

/** Represents a toolbar for a framework */
function toolbar () {
  let buttons = []
  const gap = 6
  return {
    /** Resets the toolbar */
    reset: () => {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].setButtonColor('gainsboro')
        buttons[i].setPressed(false)
      }
    },
    /** Gets the button that is pressed */
    getPressedButton: () => {
      for (let i = 0; i < buttons.length; i++) {
        if (buttons[i].isPressed()) {
          return buttons[i].getNode(0, 0)
        }
      }
      return undefined
    },
    /**
     * Grabs the button that matches a constructor
     * @param {constructor} n - The constructor to be compared
     */
    getButton: (n) => {
      if (buttons.length > 0) {
        for (let i = 0; i < buttons.length; i++) {
          let button = buttons[i]
          if (button.getNodeType() === n) {
            return buttons[i]
          }
        }
      }
      return undefined
    },
    /**
     * Adds a button to the toolbar
     * @param {constructor} nodeToDraw - The button's Node/Edge constructor
     * @param {panel} panel - The panel to be drawn on
     * @param {} functionThatChangesState - A passed function that changes the state of the button
     */
    add: (nodeToDraw, panel, functionThatChangesState) => {
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
    },
    /** Removes the button at the top of the button list */
    remove: () => {
      buttons.pop()
    },
    /** Draws all the buttons */
    draw: () => {
      for (let i = 0; i < buttons.length; i++) {
        buttons[i].draw()
      }
    }
  }
}

/**
 * Represents a button in the toolbar
 * @param {int} x - The x coordinate of the button
 * @param {int} y - The y coordinate of the button
 * @param {constructor} nodeToDraw - The node/edge constructor of the button
 * @param {panel} panel - The panel to be drawn on
 * @param {stategy} aStrategy - The strategy method being used
 */
function createButton (x, y, nodeToDraw, panel, aStrategy) {
  const defaultSize = 40
  let buttonColor = 'gainsboro'
  let square = getSquare()
  let isPressed
  return {
    /** Gets the button's node/edge */
    getNode: () => {
      return getNode(0, 0)
    },
    /** Returns the button's node/edge constructor */
    getNodeType: () => {
      return nodeToDraw
    },
    /** Checks if the button is pressed */
    isPressed: () => {
      return isPressed
    },
    /**
     * Sets the button pressed state
     * @param {boolean} newPress - The new pressed state
     */
    setPressed: (newPress) => {
      if (newPress) {
        isPressed = newPress
        square.style.fill = 'grey'
      } else {
        isPressed = false
        square.style.fill = 'gainsboro'
      }
    },
    /**
     * Sets the button color
     * @param {color} color - The new color
     */
    setButtonColor: (color) => {
      square.style.fill = color
    },
    /** Returns the bounds of the button */
    getBounds: () => {
      return {
        x: x,
        y: y,
        width: defaultSize,
        height: defaultSize
      }
    },
    /** Draws the button */
    draw: () => {
      let node = getNode((defaultSize / 4), (defaultSize / 4))
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
  /**
   * Draws the button's node/edge at a specific coordinate.
   * @param {int} x - The x coordinate
   * @param {int} y - The y coordinate
   */
  function getNode (x, y) {
    let tempNode = nodeToDraw(0, 0)
    if (!tempNode.isEdge) {
      let node = nodeToDraw(x, y)
      node.setSize(defaultSize / 2)
      node.setHeight(defaultSize / 2)
      node.setWidth(defaultSize / 2)
      node.setName('')
      node.setPanel(panel)
      return node
    } else {
      let pointNode1 = createPointNode(x, y)
      pointNode1.setPanel(panel)
      let pointNode2 = createPointNode(x + (defaultSize / 2), y + (defaultSize / 2))
      pointNode2.setPanel(panel)
      let edge = tempNode.clone()
      edge.setPanel(panel)
      edge.connect(pointNode1, pointNode2)
      return edge
    }
  }
  /** Creates a div element for the button */
  function getDiv () {
    let node = getNode(0, 0)
    let div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.left = x + 'px'
    div.style.top = y + 'px'
    div.style.height = defaultSize + 'px'
    div.style.width = defaultSize + 'px'
    div.title = node.getID()
    return div
  }
  /** Creates the button shape */
  function getSquare () {
    let square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
    square.setAttribute('height', defaultSize)
    square.setAttribute('width', defaultSize)
    square.setAttribute('x', 0)
    square.setAttribute('y', 0)
    square.setAttribute('fill', buttonColor)
    square.setAttribute('stroke', 'black')
    square.setAttribute('stroke-width', 2)
    return square
  }
  /**
   * Creates an svg element in an HTML div element
   * @param {div} div - The given div element
   */
  function getSVG (div) {
    let svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    svg.setAttribute('height', defaultSize)
    svg.setAttribute('width', defaultSize)
    svg.setAttribute('x', div.style.left)
    svg.setAttribute('y', div.style.top)
    return svg
  }
}
