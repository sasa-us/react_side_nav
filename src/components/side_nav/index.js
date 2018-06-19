import React, { Component } from 'react';
import HandleOpen from './handle_open';
import HandleClose from './handle_close';
import './side_nav.css';

class SideNav extends Component {
    constructor(props){
        super(props);
        this.width = 300;
        this.offset = 5;
        this.startPos = -100;

        this.state = {
            pos: this.setPos(),
            transitionDuration: 600
        }
    }

    componentDidMount(){
        window.onresize = this.handleWindowResize.bind(this);
    }

    setPos(){
        if(window.innerWidth > 800){
            return 0;
        }

        return this.startPos - this.offset;
    }

    handleWindowResize(e){
        const { pos } = this.state;
        const width = window.innerWidth;
        console.log('Resize:', width);

        if(pos < 0 && width > 800 || pos >= 0 && width <= 800){
            this.setState({
                pos: this.setPos()
            });
        }
    }

    slideOut(xPos){
        if(this.state.pos >= 0) return;

        let change = this.startPos + ((xPos / this.width) * 100);

        if(change >= 0){
            change = 0
        }

        this.setState({
            pos: change,
            transitionDuration: 0
        });
    }

    open(time, distance){
        const totalDistance = this.width + this.offset;
        const ppms = distance/time;
        const remainingDistance = totalDistance - distance;
        const duration = remainingDistance / ppms;
        const transitionDuration =  duration < 1000 ? duration : 800

        console.log('Transition:', transitionDuration);

        this.setState({
            pos: 0,
            transitionDuration
        });
    }

    linkClick(num){
        console.log(`Link ${num} Clicked`);
    }

    render(){
        const { pos, transitionDuration } = this.state;

        const sideNavStyle = {
            transitionDuration: `${transitionDuration}ms`,
            transform: `translate(${pos}%)`
        };

        return (
            <div className={ window.innerWidth <= 800 && pos > -100 ? `side-nav-container` : ''}>
                <HandleOpen open={this.open.bind(this)} slideOut={this.slideOut.bind(this)} />
                <HandleClose>
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
