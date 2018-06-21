import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HandleOpen from './handle_open';
import HandleClose from './handle_close';
import Hamburger from './hamburger';
import SideNav from './side_nav';
import './side_nav.css';

class SideNavContainer extends Component {
    constructor(props){
        super(props);
        
        this.width = props.navWidth;
        this.offset = props.navOffset;
        this.startPos = props.navStartPos;
        this.maxScreenSize = props.hiddenNavMaxScreenWidth;
        this.defaultTransition = props.defaultTransition;
        this.maxTransition = props.maxTransition;

        const pos = this.setPos();
        const isOpen = pos === 0;

        this.state = {
            open: isOpen,
            largeScreen: isOpen,
            pos,
            transitionDuration: this.defaultTransition,
            moving: false
        }

        this.close = this.close.bind(this);
        this.clickClose = this.clickClose.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.open = this.open.bind(this);
        this.slideIn = this.slideIn.bind(this);
        this.slideOut = this.slideOut.bind(this);
    }

    componentDidMount(){
        window.onresize = this.handleWindowResize;
    }

    calcTransition(time, distance){
        const totalDistance = this.width + this.offset;
        const ppms = distance / time;
        const remainingDistance = totalDistance - distance;
        const duration = remainingDistance / ppms;
        
        return duration <= this.maxTransition ? duration : this.defaultTransition;
    }

    close(time, distance) {
        if(this.state.largeScreen) return;

        const transitionDuration = this.calcTransition(time, distance);

        this.setState({
            pos: this.startPos - this.offset,
            transitionDuration,
            open: false,
            moving: true
        });

        setTimeout(() => this.setState({ moving: false }), this.defaultTransition);
    }

    clickClose(e) {
        if (this.state.open && !this.state.largeScreen) {
            this.close();
        }
    }

    handleWindowResize(e) {
        const { pos } = this.state;
        const width = window.innerWidth;

        if (pos < 0 && width > this.maxScreenSize || pos >= 0 && width <= this.maxScreenSize) {
            const newPos = this.setPos();
            const isOpen = newPos === 0;

            this.setState({
                open: isOpen,
                largeScreen: isOpen,
                pos: newPos
            });
        }
    }

    open(time, distance) {
        if (this.state.largeScreen) return;

        const transitionDuration = this.calcTransition(time, distance);

        this.setState({
            pos: 0,
            transitionDuration,
            open: true,
            moving: true
        });

        setTimeout(() => this.setState({moving: false}), transitionDuration);
    }

    setPos(){
        if(window.innerWidth > this.maxScreenSize){
            return 0;
        }

        return this.startPos - this.offset;
    }

    slideIn(xPos) {
        if (!this.state.open || this.state.largeScreen) return;

        let change = -((xPos / this.width) * 100);

        if (change > 0) {
            change = 0;
        }

        this.setState({
            pos: change,
            transitionDuration: 0,
            moving: true
        });
    }

    slideOut(xPos){
        if(this.state.pos >= 0 || this.state.largeScreen) return;

        let change = this.startPos + ((xPos / this.width) * 100);

        if(change > 0){
            change = 0
        }

        this.setState({
            pos: change,
            transitionDuration: 0,
            moving: true
        });
    }

    render(){
        const { pos, transitionDuration, open, moving } = this.state;

        const sideNavStyle = {
            transitionDuration: `${transitionDuration}ms`,
            transform: `translate(${pos}%)`
        };

        return (
            <div onClick={this.clickClose} className={ `side-nav-container ${window.innerWidth <= this.maxScreenSize && pos > this.startPos ? `open` : ''} ${moving || open ? 'on-top' : ''}`}>
                <Hamburger transition={transitionDuration} visible={!open && !moving} open={this.open}/>
                <HandleOpen visible={!open && !moving} open={this.open} close={this.close} slideOut={this.slideOut} />
                <HandleClose isOpen={open} open={this.open} close={this.close} slideIn={this.slideIn}>
                    <SideNav close={this.close} style={sideNavStyle} />
                </HandleClose>
            </div>
        )
    }
}

SideNavContainer.defaultProps = {
    navWidth: 300,
    navOffset: 5,
    navStartPos: -100,
    hiddenNavMaxScreenWidth: 800,
    defaultTransition: 800,
    maxTransition: 1000
};

SideNavContainer.propTypes = {
    navWidth: PropTypes.number.isRequired,
    navOffset: PropTypes.number.isRequired,
    navStartPos: PropTypes.number.isRequired,
    hiddenNavMaxScreenWidth: PropTypes.number.isRequired,
    defaultTransition: PropTypes.number.isRequired,
    maxTransition: PropTypes.number.isRequired
}

export default SideNavContainer;
