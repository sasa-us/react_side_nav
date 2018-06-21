import React from 'react';
import PropTypes from 'prop-types';
import './hamburger.css';

const Hamburger = props => {
    const style = {
        transitionDuration: props.transition
    }

    return (
        <div style={style} className={`hamburger ${props.visible ? '' : 'hidden' }`} onClick={props.open}>
            <div className="line" />
            <div className="line" />
            <div className="line" />
        </div>
    );
}

Hamburger.defaultProps = {
    transition: 200
};

Hamburger.propTypes = {
    open: PropTypes.func.isRequired,
    transition: PropTypes.number.isRequired,
    visible: PropTypes.bool.isRequired
};

export default Hamburger;
