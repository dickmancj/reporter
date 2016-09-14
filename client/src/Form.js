import React, {Component} from 'react';
import ReportList from './ReportList';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';

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
      report_type: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(key, value) {
    let stateObj = {};
    stateObj[key] = value;
    this.setState(stateObj, () => {
      // callback after state changes
      console.log(this.state[key]);
    });
  }

  render() {
    return (
        <div>
          <div className="flex-grid">
            <div className="col">
              <SelectField value={this.state.classification} onChange={(event, key, payload) => { this.handleChange('classification', payload); }} floatingLabelText="Classification">
                <MenuItem value="Unclassified" primaryText="Unclassified" />
                <MenuItem value="FOUO" primaryText="FOUO" />
                <MenuItem value="Secret" primaryText="Secret" />
                <MenuItem value="Top Secret" primaryText="Top Secret" />
              </SelectField>
            </div>
            <div className="col">
              <SelectField value={this.state.report_type} onChange={(event, key, payload) => { this.handleChange('report_type', payload); }} floatingLabelText="Report Type">
                <MenuItem value="Type 1" primaryText="Type 1" />
                <MenuItem value="Type 2" primaryText="Type 2" />
                <MenuItem value="Type 3" primaryText="Type 3" />
                <MenuItem value="Type 4" primaryText="Type 4" />
              </SelectField>
            </div>
          </div>
          <div className="flex-grid">
            <div className="col">
              <TextField id="title" onChange={(event) => { this.handleChange('title', event.target.value); }} floatingLabelText="Title"/>
            </div>
            <div className="col">
              <TextField id="author" onChange={(event) => { this.handleChange('author', event.target.value); }} floatingLabelText="Author"/>
            </div>
          </div>
          <div className="flex-grid">
            <div className="col">
              <TextField id="url" onChange={(event) => { this.handleChange('url', event.target.value); }} floatingLabelText="URL"/>
            </div>
            <div className="col">
              <TextField id="product-id" onChange={(event) => { this.handleChange('product_id', event.target.value); }} floatingLabelText="Product ID"/>
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
              <TextField id="description" onChange={(event) => { this.handleChange('description', event.target.value); }} multiLine={true} rows={3} floatingLabelText="Description"/>
            </div>
            <div className="col">
              <TextField id="keyword-list" onChange={(event) => { this.handleChange('keyword_list', event.target.value); }} multiLine={true} rows={3} floatingLabelText="Keywords"/>
            </div>
          </div>
          <ReportList source="http://localhost:9200/reports/document/_search?q=Research%20Report%202&pretty=true"/>
        </div>
    );
  }
}

export default Form;
