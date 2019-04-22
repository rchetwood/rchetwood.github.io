'use strict'

class Graph {
  constructor () {
    this.nodes = []
    this.edges = []
  }
  add (n) {
    this.nodes.push(n)
  }
  findNode (p) {
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      const n = this.nodes[i]
      if (n.contains(p)) return n
    }
    return undefined
  }
  findEdge (p) {
    for (let i = this.edges.length - 1; i >= 0; i--) {
      const e = this.edges[i]
      if (e.contains(p)) return e
    }
    return undefined
  }
  draw () {
    for (const n of this.nodes) {
      n.draw()
    }
    for (const e of this.edges) {
      e.draw()
    }
  }
  connect (e, p1, p2) {
    const n1 = this.findNode(p1)
    const n2 = this.findNode(p2)
    if (n1 !== undefined && n2 !== undefined) {
      e.connect(n1, n2)
      this.edges.push(e)
      return true
    }
    return false
  }
}

module.exports = {
  Graph
}
