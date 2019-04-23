'use strict'

function Graph () {
  const nodes = []
  const edges = []
  return {
    connect: function (edge, point1, point2) {
      let n1 = this.findNode(point1)
      let n2 = this.findNode(point2)
      if (n1 !== undefined && n2 !== undefined) {
        edge.connect(n1, n2)
        edges.push(edge)
        return true
      }
      return false
    },
    add (n) {
      nodes.push(n)
    },
    findNode: function (p) {
      for (let i = nodes.length - 1; i >= 0; i--) {
        const n = nodes[i]
        if (n.contains(p)) return n
      }
      return undefined
    },
    findEdge: (p) => {
      for (let i = edges.length - 1; i >= 0; i--) {
        const e = edges[i]
        if (e.contains(p)) return e
      }
      return undefined
    },
    draw: () => {
      for (const n of nodes) {
        n.draw()
      }
      for (const e of edges) {
        e.draw()
      }
    },
    removeNode: (n) => {
      for (let i = edges.length - 1; i >= 0; i--) {
        const e = edges[i]
        if (e.getStart() === n || e.getEnd() === n) {
          edges.remove(e)
        }
      }
      nodes.remove(n)
    },
    removeEdge: (e) => {
      edges.remove(e)
    },
    getBounds: () => {
      let r
      for (const n of nodes) {
        let b = n.getBounds()
        if (r === undefined) { r = b } else { r.add(b) }
      }
      for (const e of edges) {
        r.add(e.getBounds())
      }
      return r
    },
    getNodes: () => {
      return nodes
    },
    getEdges: () => {
      return edges
    }
  }
}

module.exports = { Graph }
