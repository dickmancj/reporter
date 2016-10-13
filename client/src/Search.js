import React, {Component} from 'react';
import _ from 'lodash';
import Header from './Header';
import Navigation from './Navigation';
import Paper from 'material-ui/Paper';
import './Search.css';
import elasticsearch from 'elasticsearch';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import { browserHistory, Link } from 'react-router';
let client = new elasticsearch.Client({
  host: process.env.REPORTS_ES_HOST
  //log: 'trace'
});

class Search extends Component {

  loadReportsFromServer(search_query) {
    console.log(process.env.REPORTS_ES_HOST);

    if(search_query === ''){ search_query = '*' }
    client.search({
      index: 'reports',
      type: 'document',
      q: search_query
    }).then(function ( body ) {
      this.setState({ reports: body.hits.hits });
    }.bind(this), function ( error ) {
      console.trace( error.message );
    });
  }

  rowSelected(selectedRows){
    var rpt = this.state.reports[selectedRows[0]];
    //console.log(rpt);
    browserHistory.push('/details/' + rpt._id);
  }

  constructor(props){
    super(props);
    client = new elasticsearch.Client({
      host: props.source
      //log: 'trace'
    });
  }

  componentWillMount() {
    this.queryChanged = _.debounce(function (search_query) {
      console.log(search_query);
      this.loadReportsFromServer(search_query);
    }, 500);
  }

  componentDidMount() {
    //this.setState({reports: []});
    this.loadReportsFromServer('*');
  }

  render() {
    var rpts = this.state && this.state.reports ? this.state.reports.map(function(result) {
      return (
        <TableRow key={result._id}>
          <TableRowColumn><Link to={{ pathname: '/details/' }} >{result._id}</Link></TableRowColumn>
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
          <div className="ReportSearch">
            <TextField
              floatingLabelText="Search"
              onChange={(event, key, payload) => { this.queryChanged(event.target.value); }}
              style={{width: "100%"}}
              />
          </div>
          <div className="ReportList">
            Results
            <Table onRowSelection={this.rowSelected.bind(this)}>
              <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                <TableRow>
                  <TableHeaderColumn>ID</TableHeaderColumn>
                  <TableHeaderColumn>Title</TableHeaderColumn>
                  <TableHeaderColumn>Score</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false}>
                { rpts }
              </TableBody>
            </Table>
          </div>
        </Paper>
      </div>
    );
  }
}

export default Search;