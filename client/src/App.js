import React, {Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, browserHistory } from 'react-router';
import ReportForm from './ReportForm';
import ReportList from './ReportList';
import './App.css';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return (
        <div>
          <MuiThemeProvider>
            <Router history={browserHistory}>
              <Route path="/" component={ReportForm}/>
              <Route path="/list" component={ReportList}/>
            </Router>
          </MuiThemeProvider>
        </div>
    );
  }
}

export default App;