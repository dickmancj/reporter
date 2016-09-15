import React, {Component} from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Paper from 'material-ui/Paper';
import $ from 'jquery';
import './ReportList.css';

class ReportSummary extends Component {
  render() {
    return <li>{this.props.data._source.title}, {this.props.data._score}</li>;
  }
}

class ReportList extends Component {

  loadReportsFromServer() {
    $.ajax({
      url: this.props.source,
      cache: false,
      success: function(data) {
        this.setState({reports: data.hits && data.hits.hits ? data.hits.hits : []});
      }.bind(this)
    });
  }

  componentDidMount() {
    //this.setState({reports: []});
    this.loadReportsFromServer();
  }

  render() {
    if(this.state && this.state.reports){
      console.log(this.state.reports);
    }
    var rpts = this.state && this.state.reports ? this.state.reports.map(function(result) {
      return <ReportSummary key={result._id} data={result}/>;
    }) : "";
    return (
        <div>
          <Header/>
          <Navigation path={this.props.route.path}/>
          <Paper className="paper" zDepth={2}>
            <div className="reportList">
              Report List
                { rpts }
            </div>
          </Paper>
        </div>
    );
  }
}

export default ReportList;