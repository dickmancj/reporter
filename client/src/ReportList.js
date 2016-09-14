import React, {Component} from 'react';
import $ from 'jquery';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

//class ReportSummary extends Component {
//  render() {
//    return <li>{this.props.data._source.title}, {this.props.data._score}</li>;
//  }
//}

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
      return <TableRow key={result._id}>
          <TableRowColumn>{result._id}</TableRowColumn>
          <TableRowColumn>{result._source.title}</TableRowColumn>
          <TableRowColumn>{result._score}</TableRowColumn>
        </TableRow>;
    }) : "";
    return (
      <div className="ReportList">
        Report List
        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>Score</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            { rpts }
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default ReportList;