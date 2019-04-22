function createButton(x,y, width, height){
    return{
        draw: ()=>{
            <rect  x="x" y="y" width="40" height="40" style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)" id="circleNodeBtn" onclick="doRectClick()" />
        }
    }
}