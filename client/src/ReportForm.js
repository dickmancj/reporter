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
import './ReportForm.css';

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
      report_files: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateForm = this.validateForm.bind(this);
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
    var reader = new FileReader();
    var files = this.state['report_files'];
    reader.onload = function(e) {
      var rawData = e.target.result;
      console.log(e);
      console.log(rawData);
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

      axios.post('http://localhost:9200/reports/document/', esdoc)
        .then(function(response){
          console.log(response);
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

  render() {
    return (
        <div>
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
                  <MenuItem value="Type 1" primaryText="Type 1" />
                  <MenuItem value="Type 2" primaryText="Type 2" />
                  <MenuItem value="Type 3" primaryText="Type 3" />
                  <MenuItem value="Type 4" primaryText="Type 4" />
                </SelectField>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <TextField id="title" onChange={(event) => { this.handleChange('title', event.target.value); }} floatingLabelText="Title" errorText={!this.state.title && 'Title is required'}/>
              </div>
              <div className="col">
                <TextField id="author" onChange={(event) => { this.handleChange('author', event.target.value); }} floatingLabelText="Author"/>
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
                <TextField id="url" onChange={(event) => { this.handleChange('url', event.target.value); }} floatingLabelText="URL"/>
              </div>
              <div className="col">
                <TextField id="product-id" onChange={(event) => { this.handleChange('product_id', event.target.value); }} floatingLabelText="Product ID" errorText={!this.state.product_id && 'Product ID is required'}/>
              </div>
            </div>
            <div className="flex-grid">
              <div className="col">
                <TextField id="description" onChange={(event) => { this.handleChange('description', event.target.value); }} multiLine={true} rows={3} floatingLabelText="Description"/>
              </div>
              <div className="col">
                <TextField id="keyword-list" onChange={(event) => { this.handleChange('keyword_list', event.target.value); }} multiLine={true} rows={3} floatingLabelText="Keywords"/>
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
