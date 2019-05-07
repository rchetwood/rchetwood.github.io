'use strict'
/**
 * A function that dyamically resizes a graph.
 * Expands the graph panel if nodes are moved out of the scope.
 * @param {Graph} graph the graph panel
 */
function FormLayout (graph) {
  /**
     * Getting the nodes max x and max y
     * @param {Node} node
     */
  function getMaxXY (node) {
    return {
      x: node.getBounds().x + node.getBounds().width / 1,
      y: node.getBounds().y + node.getBounds().height / 1
    }
  }
  // Get the graph panel
  const panel = document.getElementById('graphpanel')
  const defaultWidth = 500
  const defaultHeight = 300
  let panelWidth = panel.width.baseVal.value
  let panelHeight = panel.height.baseVal.value
  // Get all the graph's nodes
  let nodes = graph.getNodes()
  // Check whether the nodes are outside the graph
  // If graph is empty, reset to default size
  if (nodes.length === 0) {
    panel.style.width = defaultWidth
    panel.style.height = defaultHeight
  } else {
    for (const n of nodes) {
      let max = getMaxXY(n)
      let maxX = max.x
      let maxY = max.y
      if (maxX > panelWidth) {
        let newWidth = panelWidth + 150
        panel.style.width = newWidth
      }
      if (maxY > panelHeight) {
        let newHeight = panelHeight + 100
        panel.style.height = newHeight
      }
    }
  }
}
