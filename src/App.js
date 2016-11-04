'use strict';

import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, browserHistory} from 'react-router';
import ReportForm from './components/ReportForm';
import Search from './components/Search';
import ReportDetails from './components/ReportDetails';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {

  render () {
    return (
        <div>
          <MuiThemeProvider>
            <Router history={browserHistory}>
              <Route path='/' component={ReportForm}/>
              <Route path='/search' component={Search}/>
              <Route path='/details/:reportId' component={ReportDetails}/>
              <Route path='/sandbox' component={Search}/>
            </Router>
          </MuiThemeProvider>
        </div>
    );
  }
}
