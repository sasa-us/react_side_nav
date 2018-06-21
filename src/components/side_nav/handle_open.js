import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './handle_open.css';

class HandleOpen extends Component {
    constructor(props){
        super(props);

        this.minXDistance = props.minX;
        this.maxYDistance = props.maxY;

        this.touchStart = this.touchStart.bind(this);
        this.touchMove = this.touchMove.bind(this);
        this.touchEnd = this.touchEnd.bind(this);
    }

    touchStart(e){
        const touch = e.targetTouches[0];

        this.startX = this.lastPosX = touch.clientX;
        this.startY = this.lastPosY = touch.clientY;
        this.startTime = new Date().getTime();
    }

    touchMove(e){
        this.lastPosX = e.targetTouches[0].clientX;
        this.lastPosY = e.targetTouches[0].clientY;

        this.props.slideOut(this.lastPosX - this.startX);
    }

    touchEnd(e){
        const timeElapsed = new Date().getTime() - this.startTime;
        const distanceX = this.lastPosX - this.startX;
        const distanceY =  Math.abs(this.lastPosY - this.startY);
        
        if(distanceY < this.maxYDistance && !isNaN(distanceX) && distanceX > this.minXDistance){
            return this.props.open(timeElapsed, distanceX);
        }
        
        this.props.close();
    }

    render(){
        return ( 
            <div
                className={`open-target ${this.props.visible ? '' : 'hidden'}`}
                onTouchStart={this.touchStart}
                onTouchMove={this.touchMove}
                onTouchEnd={this.touchEnd}
            ></div>
        );
    }
}

HandleOpen.defaultProps = {
    minX: 40,
    maxY: 100
};

HandleOpen.propTypes = {
    minX: PropTypes.number.isRequired,
    maxY: PropTypes.number.isRequired
};

export default HandleOpen;
