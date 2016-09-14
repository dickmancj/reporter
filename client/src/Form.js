import React, {Component} from 'react';
import ReportList from './ReportList';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      classification: 'Unclassified',
      author: '',
      url: '',
      keyword_list: '',
      product_id: ''
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
          <div>
            <TextField id="title" onChange={(event) => { this.handleChange('title', event.target.value); }} floatingLabelText="Title"/>
          </div>
          <div>
            <TextField id="description" onChange={(event) => { this.handleChange('description', event.target.value); }} label="Description" multiLine={true} rows={3}/>
          </div>
          <div>
            <SelectField value={this.state.classification} onChange={(event, key, payload) => { this.handleChange('classification', payload); }} floatingLabelText="Classification" fullWidth={true}>
              <MenuItem value="Unclassified" primaryText="Unclassified" />
              <MenuItem value="FOUO" primaryText="FOUO" />
              <MenuItem value="Secret" primaryText="Secret" />
              <MenuItem value="Top Secret" primaryText="Top Secret" />
            </SelectField>
          </div>
          <div>
            <TextField id="keyword-list" onChange={(event) => { this.handleChange('keyword_list', event.target.value); }} label="Keywords" multiLine={true} rows={3}/>
          </div>
          <div>
            <TextField id="author" onChange={(event) => { this.handleChange('author', event.target.value); }} floatingLabelText="Author"/>
          </div>
          <div>
            <TextField id="url" onChange={(event) => { this.handleChange('url', event.target.value); }} floatingLabelText="URL"/>
          </div>
          <div>
            <TextField id="product-id" onChange={(event) => { this.handleChange('product_id', event.target.value); }} floatingLabelText="Product ID"/>
          </div>
          <ReportList source="http://localhost:9200/reports/document/_search?q=Research%20Report%202&pretty=true"/>
        </div>
    );
  }
}

export default Form;
