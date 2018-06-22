import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SideNav extends Component {
    linkClick(num) {
        console.log(`Link ${num} Clicked`);
        setTimeout(this.props.close, 300);
    }

    render(){
        return (
            <div style={this.props.style} className="side-nav">
                <div className="top-section">
                    <span>L</span>
                    <span>F</span>
                </div>
                <ul>
                    <li onClick={this.linkClick.bind(this, 1)}>Link 1</li>
                    <li onClick={this.linkClick.bind(this, 2)}>Link 2</li>
                    <li onClick={this.linkClick.bind(this, 3)}>Link 3</li>
                    <li onClick={this.linkClick.bind(this, 4)}>Link 4</li>
                </ul>
                <div className="footer">
                    &copy; 2018 LearningFuze
                </div>
            </div>
        );
    }
}

SideNav.propTypes = {
    close: PropTypes.func.isRequired,
    style: PropTypes.object.isRequired
};

export default SideNav;
