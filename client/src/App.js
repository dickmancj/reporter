import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form';
import ReportList from './ReportList';

class App extends Component {

  render() {
    return (
        <div className="App">
          <div className="App-header">
            <img src={logo} className="App-logo" alt="logo"/>
            <h2>Welcome to React</h2>
          </div>
          <div className="App-intro">
            <Form />
          </div>
          <div>
            <ReportList source="http://localhost:9200/reports/document/_search?q=Research%20Report%202&pretty=true"/>
          </div>
        </div>
    );
  }
}

export default App;