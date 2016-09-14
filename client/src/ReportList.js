import React, {Component} from 'react';
import $ from 'jquery';

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
      <div className="ReportList">
        Report List
          { rpts }
      </div>
    );
  }
}

export default ReportList;