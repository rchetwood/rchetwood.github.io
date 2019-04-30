function createDiamondNode(x, y) {
    return {
        getNodeType: () => {
            return {
                name: NodeType.DIAMOND
            }
        },
        getProps: () => {
            return ['Color', 'Size']
        },
        getSize: () => {
            return size
        },
        getColor: () => {
            return color
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
            const diamond = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
            let points = ((x + size / 2) + "," + (y) + " " +
                (x + size) + "," + (y + size / 2) + " " +
                (x + size / 2) + "," + (y + size) + " " +
                (x) + "," + (y + size / 2))
            diamond.setAttribute('points', points)
            diamond.setAttribute('fill', color)
            panel.append(diamond)
        }
    }
}
