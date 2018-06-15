import React, { Component } from 'react';
import DragDrop from './drag_drop';
import './side_nav.css';

class SideNav extends Component {
    constructor(props){
        super(props);

        this.state = {
            pos: '-105%'
        }
    }
    render(){

        const sideNavStyle = {
            transform: `translate(${this.state.pos})`
        };

        return (
            <div>
                <DragDrop />
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
