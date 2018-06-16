import React, { Component } from 'react';
import DragDrop from './drag_drop';
import './side_nav.css';

class SideNav extends Component {
    constructor(props){
        super(props);
        this.width = 300;
        this.offset = 5;
        this.startPos = -100;

        this.state = {
            pos: this.startPos - this.offset,
            transition: 0
        }
    }

    slideOut(xPos){
        if(this.state.pos >= 0) return;

        let change = this.startPos + ((xPos / this.width) * 100);

        if(change >= 0){
            change = 0
        }

        this.setState({
            pos: change
        });
    }

    open(time, distance){
        const totalDistance = this.width + this.offset;
        const ppms = distance/time;
        const remainingDistance = totalDistance - distance;
        const transition =  remainingDistance / ppms;

        this.setState({
            pos: 0,
            transition
        });
    }

    render(){

        const sideNavStyle = {
            transitionDuration: `${this.state.transition}ms`,
            transform: `translate(${this.state.pos}%)`
        };

        return (
            <div>
                <DragDrop open={this.open.bind(this)} slideOut={this.slideOut.bind(this)} />
                <div style={sideNavStyle} className="side-nav">
                    <div className="top-section">
                        <span>L</span>
                        <span>F</span>
                    </div>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                        <li>Link 4</li>
                    </ul>
                    <div className="footer">
                        &copy; 2018 LearningFuze
                    </div>
                </div>
            </div>
        )
    }
}

export default SideNav;
