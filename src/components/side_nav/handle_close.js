import React, { Component } from 'react';
import './handle_close.css';

class HandleClose extends Component {
    constructor(props){
        super(props);

        this.minDistance = 40;

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    touchStart(e){
        this.start = e.targetTouches[0].clientX;
        this.startTime = new Date().getTime();
    }

    touchMove(e){
        this.lastPos = e.targetTouches[0].clientX;

        this.props.slideIn(this.start - this.lastPos);
    }

    touchEnd(e){
        const timeElapsed = new Date().getTime() - this.startTime;
        const distance = this.start - this.lastPos;

        console.log('TOUCH END CLOSE:', distance);
        if (!isNaN(distance) && distance > this.minDistance) {
            return this.props.close(timeElapsed, distance);
        } 

        // this.props.close();
        // this.props.close();
    }

    preventClick(e){
        e.stopPropagation();
    }

    render(){
        return (
            <div
                className="side-nav-close"
                draggable
                onClick={this.preventClick}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
            >
                {this.props.children}
            </div>
        );
    }
}

export default HandleClose;
