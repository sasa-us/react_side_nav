import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import SideNav from './side_nav';

const App = () => (
    <div>
        <SideNav/>
        <div className="app">
            <img src={logo} className="logo rotate"/>
            <h1>Welcome to React</h1>
        </div>
    </div>
);

export default App;
