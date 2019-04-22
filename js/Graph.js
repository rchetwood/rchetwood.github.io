'use strict'

function Graph(){
    const nodes = []
    const edges = []
    return{
        findNode: (p, nodes) =>{
            for(let i = nodes.length -1; i >= 0; i--){
                const n = nodes[i]
                if(n.contains(p)) return n
            }
            return undefined
        },
        connect: (edge, point1, point2) => {
            let n1 = findNode(point1, nodes) // wont be able to use own function
            let n2 = findNode(point2, nodes)
            if (n1 !== undefined && n2 != undefined)
            {
               edge.connect(n1, n2)
               edges.push(e)
               return true
            }
            return false
        },
        add: (n, p) =>{
            let bounds = node.getBounds()
            n.translate(p.getX() - bounds.getX(),
                p.getY() - bounds.getY());
            nodes.push(n)
            return true
        } ,
        findNode: (p) =>{
            for(let i = nodes.length -1; i >= 0; i--){
                const n = nodes[i]
                if(n.contains(p)) return n
            }
            return undefined
        },
        findEdge: (p) =>{
            for(let i = edges.length -1; i >= 0; i--){
                const e = edges[i]
                if(e.contains(p)) return e
            }
            return undefined
        },
        draw: () =>{
            for (const n of nodes) {
                n.draw()
            }
            for (const e of edges) {
                e.draw()
            }
        },
        removeNode: (n) =>{
            for(let i = edges.length -1; i >= 0; i--){
                const e = edges[i]
                if(e.getStart() === n || e.getEnd() === n){
                    edges.remove(e)
                }
            }
            nodes.remove(n)
        },
        removeEdge: (e) =>{
            edges.remove(e)
        },
        getBounds: () =>{
            let r = undefined
            for(const n of nodes){
                let b = n.getBounds()
                if(r === undefined){ r = b}
                else{ r.add(b)}
            }
            for(const e of edges){
                r.add(e.getBounds())
            }
            //unsure if this is the correct JS translation of the java code
            //return r == null ? new Rectangle2D.Double() : r;
            // kuor: Cannot use this
            return r
        },
        getNodes: () =>{
            return nodes
        },
        getEdges: () =>{
            return edges
        }
    }
}

module.exports = Graph