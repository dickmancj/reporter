import React, {Component} from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Paper from 'material-ui/Paper';
import './ReportList.css';
import elasticsearch from 'elasticsearch';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

let client = new elasticsearch.Client({
  host: 'localhost:9200'
  //log: 'trace'
});

class ReportList extends Component {

  loadReportsFromServer() {
    const search_query = 'ipsum';

    client.search({
      index: 'reports',
      type: 'document',
      q: search_query
    }).then(function ( body ) {
      this.setState({ reports: body.hits.hits })
    }.bind(this), function ( error ) {
      console.trace( error.message );
    });
  }

  constructor(props){
    super(props);
    client = new elasticsearch.Client({
      host: props.source
      //log: 'trace'
    });
  }

  componentDidMount() {
    //this.setState({reports: []});
    this.loadReportsFromServer();
  }

  render() {

    var rpts = this.state && this.state.reports ? this.state.reports.map(function(result) {
      return (
        <TableRow key={result._id}>
          <TableRowColumn>{result._id}</TableRowColumn>
          <TableRowColumn>{result._source.title}</TableRowColumn>
          <TableRowColumn>{result._score}</TableRowColumn>
        </TableRow>
      );
    }) : (
      <TableRow>No Results</TableRow>
    );
    return (
      <div>
        <Header/>
        <Navigation path={this.props.route.path}/>
        <Paper className="paper" zDepth={2}>
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
        </Paper>
      </div>
    );
  }
}

export default ReportList;