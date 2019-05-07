'use strict'

/**
 * Finds the index of a list that contains an object.
 * @param {array} list - The list to be checked
 * @param {obj} x - The object to be compared
 */
function findRemoveindex (list, x) {
  for (let i = 0; i < list.length; i++) {
    if (list[i] === x) {
      return i
    }
  }
  return undefined
}

/**
 * Represents a graph that contains nodes and edges.
 */
function Graph () {
  const nodes = []
  const edges = []
  return {
    /**
     * Connects two nodes with an edge.
     * @param {edge} edge - The edge to be used
     * @param {node} point1 - The starting node
     * @param {node} point2 - The ending node
     */
    connect: function (edge, point1, point2) {
      let n1 = this.findNode(point1)
      let n2 = this.findNode(point2)
      if (n1 && n2) {
        edge.connect(n1, n2)
        edges.push(edge)
        return true
      }
      return false
    },
    /**
     * Adds a node to the graph.
     * @param {node} n - The node to be added
     */
    add: function (n) {
      nodes.push(n)
    },
    /**
     * Checks if a node exists at a point.
     * Returns the node if it exists.
     * @param {coordinate} p - The point to be checked
     */
    findNode: function (p) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        if (n.contains(p)) {
          return n
        }
      }
      return undefined
    },
    /**
     * Checks if an edge exists near a point.
     * Returns the edge if it exists.
     * @param {coordinate} p - The point to be checked
     */
    findEdge: (p) => {
      for (let i = edges.length - 1; i >= 0; i--) {
        const e = edges[i]
        if (e.contains(p)) return e
      }
      return undefined
    },
    /**
     * Draws all the nodes and edges in the graph.
     */
    draw: () => {
      for (const n of nodes) {
        n.draw()
      }
      for (const e of edges) {
        e.draw()
      }
    },
    /**
     * Removes a given node from the graph.
     * @param {node} n - The node to be removed
     */
    removeNode: function (n) {
      for (let i = edges.length - 1; i >= 0; i--) {
        const e = edges[i]
        if (e.getStart() === n || e.getEnd() === n) {
          this.removeEdge(e)
        }
      }
      let index = findRemoveindex(nodes, n)
      nodes.splice(index, 1)
    },
    /**
     * Removes a given edge from the graph.
     * @param {edge} e - The edge to be removed
     */
    removeEdge: function (e) {
      let index = findRemoveindex(edges, e)
      edges.splice(index, 1)
    },
    /** Gets the bounds surrounding all the nodes and edges. */
    getBounds: () => {
      let r
      for (const n of nodes) {
        let b = n.getBounds()
        if (!r) {
          r = b
        } else {
          r.add(b)
        }
      }
      for (const e of edges) {
        r.add(e.getBounds())
      }
      return r
    },
    /** Returns the graphs nodes. */
    getNodes: () => {
      return nodes
    },
    /** Returns the graphs edges. */
    getEdges: () => {
      return edges
    }
  }
}
