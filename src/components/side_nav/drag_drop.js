import React, { Component } from 'react';
import './drag_drop.css';

class DragDrop extends Component {
    constructor(props){
        super(props);

        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDrag = this.handleDrag.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleTouchStart = this.handleTouchStart.bind(this);
        this.handleTouchMove = this.handleTouchMove.bind(this);
        this.handleTouchEnd = this.handleTouchEnd.bind(this);
    }

    handleDragStart(e) {
        console.log('Drag Start!', e.screenX);
        this.start = e.screenX;
        this.startTime = new Date().getTime();
    }

    handleDrag(e) {
        // console.log('Dragging!', e.screenX);
        const pos = e.screenX;

        if(pos > this.start){
            this.props.slideOut(pos - this.start);
        }
    }

    handleDragEnd(e){
        console.log('Drag End:', e.screenX);
        const timeElapsed = new Date().getTime() - this.startTime;
        const distance = e.screenX - this.start

        console.log('Distance:', distance, timeElapsed);
        this.props.open(timeElapsed, distance);
    }

    handleTouchStart(e){
        console.log('Touch Event:', e.targetTouches);
        const touch = e.targetTouches[0];

        this.start = touch.clientX;
        this.startTime = new Date().getTime();
    }

    handleTouchMove(e){
        // console.log('Moving:', e.targetTouches[0].clientX);
        this.lastPos = e.targetTouches[0].clientX;

        if (this.lastPos > this.start) {
            this.props.slideOut(this.lastPos - this.start);
        }
    }

    handleTouchEnd(e){
        console.log('Drag End:', e);
        const timeElapsed = new Date().getTime() - this.startTime;
        const distance = this.lastPos - this.start
        this.props.open(timeElapsed, distance);
    }

    render(){
        return ( <div
            className="drag-target"
            draggable
            onDragStart={this.handleDragStart}
            onDrag={this.handleDrag}
            onDragEnd={this.handleDragEnd}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            // onTouchEndCapture={this.handleTouchEnd}
            ></div>
        )
    }
}

export default DragDrop;
