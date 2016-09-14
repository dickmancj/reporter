import React, {Component} from 'react';
import { Textfield, Menu, MenuItem, Button } from 'react-mdl';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      classification: 'Classification',
      author: '',
      url: '',
      keyword_list: ''
    };
    this.changeState = this.changeState.bind(this);
  }

  changeState(key, value) {
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
            <Button raised ripple id="classificationBtn" onClick={(event) => { event.preventDefault(); }}>{this.state.classification} <i className="material-icons">keyboard_arrow_down</i></Button>
            <Menu target="classificationBtn">
              <MenuItem onClick={() => { this.changeState('classification', 'Unclassified'); }}>Unclassified</MenuItem>
              <MenuItem onClick={() => { this.changeState('classification', 'FOUO'); }}>FOUO</MenuItem>
              <MenuItem onClick={() => { this.changeState('classification', 'Secret'); }}>Secret</MenuItem>
              <MenuItem onClick={() => { this.changeState('classification', 'Top Secret'); }}>Top Secret</MenuItem>
            </Menu>
          </div>
          <div className="mdl-grid">
            <div className="mdl-cell mdl-cell--4-col">
              <div>
                <Textfield onChange={(event) => { this.changeState('title', event.target.value) }} label="Title" floatingLabel/>
              </div>
              <div>
                <Textfield onChange={(event) => { this.changeState('description', event.target.value) }} label="Description" rows={3}/>
              </div>
              <div>
                <Textfield onChange={(event) => { this.changeState('keyword_list', event.target.value) }} label="Keywords" rows={3}/>
              </div>
            </div>
            <div className="mdl-cell mdl-cell--4-col">
              <div>
                <Textfield onChange={(event) => { this.changeState('author', event.target.value) }} label="Author" floatingLabel/>
              </div>
              <div>
                <Textfield onChange={(event) => { this.changeState('url', event.target.value) }} label="URL" floatingLabel/>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Form;
