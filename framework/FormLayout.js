'use strict'

function FormLayout(graph){


    function getMaxXY(node) {
        return{
            
            x: node.getBounds().x + node.getBounds().width,
            y: node.getBounds().y +node.getBounds().height
        }
    }

     
  
    const panel = document.getElementById('graphpanel')
    let panelWidth  = panel.width.baseVal.value
    let panelHeight = panel.height.baseVal.value 



    let nodes  = graph.getNodes()

    for(const n of nodes){
        let max = getMaxXY(n)
        let maxX = max.x
        let maxY = max.y

        if(maxX > panelWidth)
        {   
            let newWidth = panelWidth+150
            panel.style.width= newWidth
           
        }
        if(maxY > panelHeight){
            let newHeight = panelHeight+100
            panel.setAttribute('height', newHeight)  
        }
    }

}
