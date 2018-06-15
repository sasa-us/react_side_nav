import React, { Component } from 'react';
import './side_nav.css';

class SideNav extends Component {
    render(){
        return (
            <div className="side-nav">
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
        )
    }
}

export default SideNav;
