import React, { Component } from 'react';
import './drag_drop.css';

class DragDrop extends Component {
    handleDrag(e) {
        console.log('Dragging!', e.screenX);
    }
    
    handleDragStart(e){
        console.log('Drag Start!', e.screenX);
    }
    render(){
        return ( <div
            className="drag-target"
            draggable
            onDrag={this.handleDrag}
            onDragStart={this.handleDragStart}></div>
        )
    }
}

export default DragDrop;
