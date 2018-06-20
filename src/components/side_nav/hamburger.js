import React from 'react';
import './hamburger.css';

export default props => {
    return (
        <div className={`hamburger ${props.visible ? '' : 'hidden' }`} onClick={props.open}>
            <div className="line" />
            <div className="line" />
            <div className="line" />
        </div>
    );
}
