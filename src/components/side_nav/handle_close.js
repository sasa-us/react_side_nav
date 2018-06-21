import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './handle_close.css';

class HandleClose extends Component {
    constructor(props){
        super(props);

        this.minXDistance = props.minX;
        this.maxYDistance = props.maxY;

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    touchStart(e){
        this.startX = this.lastPos = e.targetTouches[0].clientX;
        this.startY = this.lastPosY = e.targetTouches[0].clientY;
        this.startTime = new Date().getTime();
    }

    touchMove(e){
        this.lastPosX = e.targetTouches[0].clientX;
        this.lastPosY = this.lastPosY = e.targetTouches[0].clientY;

        this.props.slideIn(this.startX - this.lastPosX);
    }

    touchEnd(e){
        const timeElapsed = new Date().getTime() - this.startTime;
        const distanceX = this.startX - this.lastPosX;
        const distanceY = Math.abs(this.startY - this.lastPosY);

        if (distanceY < this.maxYDistance && !isNaN(distanceX) && distanceX > this.minXDistance) {
            return this.props.close(timeElapsed, distanceX);
        } else if(this.props.isOpen && distanceX > 0){
            this.props.open(0, 0);
        }
    }

    preventClick(e){
        e.stopPropagation();
    }

    render(){
        return (
            <div
                className="side-nav-close"
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

HandleClose.defaultProps = {
    minX: 40,
    maxY: 100
};

HandleClose.propTypes = {
    minX: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired
};

export default HandleClose;
