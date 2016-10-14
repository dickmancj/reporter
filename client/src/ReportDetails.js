import React, {Component} from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Downloader from './components/Downloader';
import axios from 'axios';
import Paper from 'material-ui/Paper';

//import { browserHistory, Router, Route, Link } from 'react-router';


class ReportDetails extends Component {
  constructor(props) {

    super(props);
    this.state = {
      reportId: props.params.reportId,
      report: {
      }
    };
  }

  loadReportDetailsFromServer() {

    var host = process.env.REPORTS_ES_HOST;
    var deturl = 'http://' + host + '/reports/document/' + this.state.reportId;
    var self = this;
    axios.get(deturl)
      .then(function (response) {
        console.log(response);
        self.setState({
          report: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.loadReportDetailsFromServer();
  }

  render() {
    return (
      <div className="container">
        {this.state.show_overlay ? <div className="overlay">
          <div className="content">

          </div>
        </div> : null}
        <Header />
        <Navigation path={this.props.route.path}/>
        <Paper className="paper" zDepth={2}>
          <div className="flex-grid">
            <div className="col">
              {this.state.report._id}
            </div>
            <div className="col">
              <Downloader />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ReportDetails;
