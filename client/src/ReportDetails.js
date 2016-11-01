import React, {Component} from 'react';
import Header from './Header';
import Navigation from './Navigation';
import Downloader from './components/Downloader';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import moment from 'moment';
import './ReportDetails.css';

//import { browserHistory, Router, Route, Link } from 'react-router';


class ReportDetails extends Component {
  constructor(props) {

    super(props);
    this.state = {
      reportId: props.params.reportId,
      report: {},
      title: '',
      description: '',
      classification: '',
      lat: '',
      lon: '',
      country_code: '',
      author: '',
      agency: '',
      url: '',
      keyword_list: '',
      event_date: '',
      publish_date: '',
      updated_date: '',
      report_type: '',
      report_name: ''
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
          report: response.data,
          classification: response.data._source.classification,
          report_type: response.data._source.report_type,
          title: response.data._source.title,
          author: response.data._source.author,
          agency: response.data._source.agency,
          lat: response.data._source.location.lat,
          lon: response.data._source.location.lon,
          country_code: response.data._source.country_code,
          event_date: response.data._source.event_date,
          publish_date: response.data._source.publish_date,
          updated_date: response.data._source.updated_date,
          description: response.data._source.description,
          url: response.data._source.url,
          keyword_list: response.data._source.keyword_list,
          report_name: response.data._source.report_content._name
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
      <div className="details-container">
        {this.state.show_overlay ? <div className="overlay">
          <div className="content">

          </div>
        </div> : null}
        <Header />
        <Navigation path={this.props.route.path}/>
        <Paper className="paper" zDepth={2}>
          <h3>{this.state.report_name}</h3>
          <div className="download">
            <Downloader content={this.state.report._source} />
          </div>
          <div className="flex-grid">
            <div className="col">
              <label>Classification</label>
              {this.state.classification}
            </div>
            <div className="col">
              <label>Report Type</label>
              {this.state.report_type}
            </div>
            <div className="col">
              <label>Title</label>
              {this.state.title}
            </div>
            <div className="col">
              <label>Author</label>
              {this.state.author}
            </div>
          </div>
          <div className="flex-grid">
            <div className="col">
              <label>Agency</label>
              {this.state.agency}
            </div>
            <div className="col">
              <label>Event Date</label>
              {moment.utc(this.state.event_date).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className="col">
              <label>Publish Date</label>
              {moment.utc(this.state.publish_date).format('YYYY-MM-DD HH:mm:ss')}
            </div>
            <div className="col">
              <label>Updated Date</label>
              {this.state.updated_date}
            </div>
          </div>
          <div className="flex-grid">
            <div className="col">
              <label>URL</label>
              {this.state.url ? <a href={this.state.url}>{this.state.url}</a> : ''}
            </div>
            <div className="col">
              <label>Latitude</label>
              {this.state.lat}
            </div>
            <div className="col">
              <label>Longitude</label>
              {this.state.lon}
            </div>
          </div>
          <div className="flex-grid">
            <div className="col">
              <label>Country Code</label>
              {this.state.country_code}
            </div>
          </div>
          <div className="flex-grid">
            <div className="col-2">
              <label>Description</label>
              {this.state.description}
            </div>
            <div className="col-2">
              <label>Keyword List</label>
              {this.state.keyword_list}
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default ReportDetails;
