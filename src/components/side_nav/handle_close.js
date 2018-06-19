import React, { Component } from 'react';
import './handle_close.css';

class HandleClose extends Component {
    touchStart(e){
        console.log('Touch Start:', e.targetTouches[0].target.localName === 'li');
        console.dir(e.targetTouches[0].target);
    }
    render(){
        return (
            <div
                className="side-nav-close"
                draggable
                onTouchStart={this.touchStart}
            >
                {this.props.children}
            </div>
        );
    }
}

export default HandleClose;
