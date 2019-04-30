'use strict'

const {Toolbar} = requires("./Toolbar")

function GraphFrame(){
    const FRAME_WIDTH = 600
    const FRAME_HEIGHT = 400

    constructFrameComponents()

    return{
        constructFrameComponents: () =>{
            let toolbar = Toolbar()
            let panel = GraphPanel()
            // scrollPane = new JScrollPane(panel);
            // this.add(toolBar, BorderLayout.NORTH);
            // this.add(scrollPane, BorderLayout.CENTER);
        },
        openFile: () =>{
            const openFile = document.getElementById('openFile');
            openFile.addEventListener('click', function (event) {
                alert('Select a file');
              });
        },
        saveFile: () =>{

        }
    }
}
module.exports = GraphFrame