'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './main.css';

function mainApp () {
    ReactDOM.render(
        <App />,
        document.getElementById('appContainer')
    );
}

document.addEventListener('DOMContentLoaded', mainApp);
