function createCircleNode(x, y) {
    // const defaultSize = 20
    // const defaultColor = 'white'
    // let size = defaultSize
    // let color = defaultColor
    return {
        getProps: () => {
            return ['Color', 'Size']
        },
        getSize: () => {
            return size
        },
        getColor: () => {
            return color
        },
        getNodeType: () => {
            return {
                name: NodeType.CIRCLE,
            }
        },
        setSize: (newSize) => {
            this.size = newSize
        },
        setColor: (newColor) => {
            this.color = newColor
        },
        setPanel: (newPanel) => {
            this.panel = newPanel
        },
        getConnectionPoint: (p) => {
            let cx = x + size / 2
            let cy = y + size / 2
            let dx = p.x - cx
            let dy = p.y - cy
            let dist = Math.sqrt(dx ** 2 + dy ** 2)
            if (dist === 0) {
                return other
            } else {
                return { x: cx + dx * (size / 2) / dist, y: cy + dy * (size / 2) / dist }
            }
        },
        clone: () => {
            let cloneCN = createCircleNode()
            cloneCN.x = x
            cloneCN.y = y
            cloneCN.size = size
            cloneCN.color = color
            return cloneCN
        },
        getBounds: () => {
            return {
                x: x,
                y: y,
                width: size,
                height: size
            }
        },
        contains: p => {
            return (x + size / 2 - p.x) ** 2 + (y + size / 2 - p.y) ** 2 <= size ** 2 / 4
        },
        translate: (dx, dy) => {
            x += dx
            y += dy
        },
        draw: () => {
            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
            circle.setAttribute('cx', x + size / 2)
            circle.setAttribute('cy', y + size / 2)
            circle.setAttribute('r', size / 2)
            circle.setAttribute('fill', color)
            panel.append(circle)
        }
    }
}