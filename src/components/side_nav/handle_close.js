import React, { Component } from 'react';
import './handle_close.css';

class HandleClose extends Component {
    constructor(props){
        super(props)

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    touchStart(e){
        this.start = e.targetTouches[0].clientX;
    }

    touchMove(e){
        this.lastPos = e.targetTouches[0].clientX;

        this.props.slideIn(this.start - this.lastPos);
    }

    touchEnd(e){
        console.log('TOUCH END!');
        this.props.close();
    }

    render(){
        return (
            <div
                className="side-nav-close"
                draggable
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
