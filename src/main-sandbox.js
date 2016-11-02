'use strict';

if (process.env.NODE_ENV !== 'development') {
    throw new Error('ERROR: Sandbox is only intended for dev environment');
}

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.css';

function mainSandbox () {
    ReactDOM.render(
        <App />,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainSandbox);
