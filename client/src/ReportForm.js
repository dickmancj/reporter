import React, {Component} from 'react';
import Header from './Header';
import Navigation from './Navigation';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import './ReportForm.css';
import reportTypes from './reportTypes.json';

const REPORT_TYPES = reportTypes.map(function (t) {
  return <MenuItem key={t.value} value={t.value} primaryText={t.title} />
});

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      classification: '',
      author: '',
      url: '',
      keyword_list: '',
      product_id: '',
      publish_date: new Date(),
      updated_date: new Date(),
      report_type: '',
      report_files: [],
      show_overlay: false,
      show_snackbar: false,
      snackbar_message: '',
      snackbar_class: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.handleRequestClosed = this.handleRequestClosed.bind(this);
  }

  handleChange(key, value) {
    let stateObj = {};
    stateObj[key] = value;
    this.setState(stateObj, () => {
      // callback after state changes
      console.log(this.state[key]);
    });
  }

  handleClick() {
    var self = this;
    var reader = new FileReader();
    var files = this.state['report_files'];
    self.setState({show_overlay: true});
    reader.onload = function(e) {
      var rawData = e.target.result;
      //console.log(e);
      //console.log(rawData);
      var esdoc = {
        classification: this.state.classification,
        title: this.state.title,
        description: this.state.description,
        keyword_list: this.state.keyword_list,
        url: this.state.url,
        author: this.state.author,
        publish_date: this.state.publish_date,
        report_content: rawData.split(',')[1]
      };

      axios.post('http://' + process.env.REPORTS_ES_HOST + '/reports/document/', esdoc)
        .then(function(response){
          self.setState({
            title: '',
            description: '',
            classification: '',
            author: '',
            url: '',
            keyword_list: '',
            product_id: '',
            publish_date: new Date(),
            updated_date: new Date(),
            report_type: '',
            report_files: [],
            show_overlay: false,
            snackbar_message: 'Form submission successful',
            show_snackbar: true,
            snackbar_class: 'success'
          });
          console.log(response);
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made, but the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
          self.setState({
            show_overlay: false,
            snackbar_message: 'Error posting document: ' + error.message,
            show_snackar: true,
            snackbar_class: 'fail'
          });
        });
      console.log(esdoc);
    }.bind(this);

    if(files){
      reader.readAsDataURL(files[0]);

    }
    // stringify state for form submission
    let formData = JSON.stringify(this.state);
    console.log(formData);
  }

  validateForm() {
    return !!(this.state.classification && this.state.report_type && this.state.title && this.state.product_id && this.state.report_files.length > 0);
  }

  handleRequestClosed() {
    this.setState({
      snackbar_message: '',
      show_snackbar: false,
      snackbar_class: ''
    });
  }

  render() {
    return (
        <div className="container">
          {this.state.show_overlay ? <div className="overlay">
            <div className="content">
              <CircularProgress/>
            </div>
          </div> : null}
          <Snackbar
              open={this.state.show_snackbar}
              message={this.state.snackbar_message}
              autoHideDuration={4000}
              onRequestClose={this.handleRequestClose}
              className={this.state.snackbar_class}
              bodyStyle={{"background": "none"}}
          />
          <Header/>
          <Navigation path={this.props.route.path}/>
          <Paper className="paper" zDepth={2}>
            <div className="flex-grid">
              <div className="col">
                <SelectField value={this.state.classification} onChange={(event, key, payload) => { this.handleChange('classification', payload); }} floatingLabelText="Classification" errorText={!this.state.classification && 'Classification is required'}>
                  <MenuItem value="Unclassified" primaryText="Unclassified" />
                  <MenuItem value="FOUO" primaryText="FOUO" />
                  <MenuItem value="Secret" primaryText="Secret" />
                  <MenuItem value="Top Secret" primaryText="Top Secret" />
                </SelectField>
              </div>
              <div className="col">
                <SelectField value={this.state.report_type} onChange={(event, key, payload) => { this.handleChange('report_type', payload); }} floatingLabelText="Report Type" errorText={!this.state.report_type && 'Report Type is required'}>
                  {REPORT_TYPES}
                </SelectField>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <TextField id="title" onChange={(event) => { this.handleChange('title', event.target.value); }} floatingLabelText="Title" value={this.state.title} errorText={!this.state.title && 'Title is required'}/>
              </div>
              <div className="col">
                <TextField id="author" onChange={(event) => { this.handleChange('author', event.target.value); }} floatingLabelText="Author" value={this.state.author}/>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <DatePicker id="publish-date" container="inline" mode="landscape" floatingLabelText="Publish Date" autoOk={true} value={this.state.publish_date} onChange={(event, date) => { this.handleChange('publish_date', date); }}/>
              </div>
              <div className="col">
                <DatePicker id="updated-date" container="inline" mode="landscape" floatingLabelText="Updated Date" autoOk={true} value={this.state.updated_date} onChange={(event, date) => { this.handleChange('updated_date', date); }}/>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <TextField id="url" onChange={(event) => { this.handleChange('url', event.target.value); }} floatingLabelText="URL" value={this.state.url}/>
              </div>
              <div className="col">
                <TextField id="product-id" onChange={(event) => { this.handleChange('product_id', event.target.value); }} floatingLabelText="Product ID" value={this.state.product_id} errorText={!this.state.product_id && 'Product ID is required'}/>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <TextField id="description" onChange={(event) => { this.handleChange('description', event.target.value); }} multiLine={true} rows={3} floatingLabelText="Description" value={this.state.description}/>
              </div>
              <div className="col">
                <TextField id="keyword-list" onChange={(event) => { this.handleChange('keyword_list', event.target.value); }} multiLine={true} rows={3} floatingLabelText="Keywords" value={this.state.keyword_list}/>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <Dropzone className="dropzone" onDrop={(files) => { this.handleChange('report_files', files); }}>
                  <div>Try dropping some files here, or click to select files to upload.</div>
                  {this.state.report_files ? <div>
                    <small>Uploading {this.state.report_files.length} files...</small>
                    <div>{this.state.report_files.map((file, idx) => <p key={idx}>{file.name}</p>)}</div>
                  </div> : null}
                </Dropzone>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <div className="submit-btn">
                  <RaisedButton label="Submit" fullWidth={true} labelPosition="before" primary={true} icon={<FontIcon className="material-icons">check_circle</FontIcon>} onClick={this.handleClick} disabled={!this.validateForm()}/>
                </div>
              </div>
            </div>
          </Paper>
        </div>
    );
  }
}

export default Form;
