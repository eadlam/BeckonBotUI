import './main.css';
// import eventemitter2 from 'imports?require=>false!./libs/eventemitter2.min.js';
// window.EventEmitter = eventemitter2;
// window.EventEmitter2 = eventemitter2;

// import ROSLIB from './libs/ROSLIB';
// window.ROSLIB = ROSLIB;

// require("raw!./libs/eventemitter2.min.js");
// require("raw!./libs/roslib.js");
// import roslib from 'imports?eventemitter2=eventemitter2!./libs/roslib.js';
// window.ROSLIB = roslib;

// import ROSLIB from './libs/roslib';
// window.ROSLIB = require('./libs/roslib');

// import EventEmitter2 from 'EventEmitter2';
// window.EventEmitter2 = EventEmitter2;


import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import alt from './libs/alt';
import storage from './libs/storage';
import persist from './libs/persist';

// persist(alt, storage, 'app');

ReactDOM.render(<App />, document.getElementById('app'));


