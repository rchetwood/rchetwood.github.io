'use strict'

function FormLayout(){
    let left = undefined
    let right = undefined
    let height = undefined
    const GAP = 6

    return{
        preferredLayoutSize: ()=>{
            // Component[] components = parent.getComponents();
            let components = []
            // components = 
            left = 0
            right = 0 
            height = 0
            for(let i = 0; i < components.length; i+=2){
                let cleft = components[i]
                let cright = components[i+1]


            }
        }
    }
}

module.exports = FormLayout