import React, { Component } from 'react';
import HandleOpen from './handle_open';
import HandleClose from './handle_close';
import Hamburger from './hamburger';
import './side_nav.css';

class SideNav extends Component {
    constructor(props){
        super(props);
        this.width = 300;
        this.offset = 5;
        this.startPos = -100;
        this.maxScreenSize = 800;
        this.defaultTransition = 800;
        this.maxTransition = 1000;

        const pos = this.setPos();

        this.state = {
            open: pos === 0,
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
        const transitionDuration = this.calcTransition(time);

        this.setState({
            pos: this.startPos - this.offset,
            transitionDuration: this.defaultTransition,
            open: false,
            moving: true
        });

        setTimeout(() => this.setState({ moving: false }), this.defaultTransition);
    }

    clickClose(e) {
        if (this.state.open) {
            this.close();
        }
    }

    handleWindowResize(e) {
        const { pos } = this.state;
        const width = window.innerWidth;

        if (pos < 0 && width > this.maxScreenSize || pos >= 0 && width <= this.maxScreenSize) {
            const newPos = this.setPos();

            this.setState({
                open: newPos === 0,
                pos: newPos
            });
        }
    }

    linkClick(num) {
        console.log(`Link ${num} Clicked`);
    }

    open(time, distance) {
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
        if (!this.state.open) return;

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
        if(this.state.pos >= 0) return;

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
                <Hamburger visible={!open && !moving} open={this.open}/>
                <HandleOpen visible={!open && !moving} open={this.open} close={this.close} slideOut={this.slideOut} />
                <HandleClose open={this.open} close={this.close} slideIn={this.slideIn}>
                    <div style={sideNavStyle} className="side-nav">
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
                </HandleClose>
            </div>
        )
    }
}

export default SideNav;
