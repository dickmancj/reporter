import React, {Component} from 'react';
import { Textfield, Menu, MenuItem, Button } from 'react-mdl';

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      classification: 'Classification...'
    };
    this.changeTitle = this.changeTitle.bind(this);
    this.changeClassification = this.changeClassification.bind(this);
  }

  changeTitle(value) {
    this.setState({title: value}, () => {
      // callback after state changes
      console.log(this.state.title);
    });
  }

  changeClassification(value) {
    this.setState({classification: value}, () => {
      // callback after state changes
      console.log(this.state.classification);
    });
  }

  render() {
    return (
        <form>
          <Textfield onChange={(event) => { this.changeTitle(event.target.value) }} label="Title" floatingLabel/>
          <div>
            <Button ripple id="classificationBtn" onClick={(event) => { event.preventDefault(); }}>{this.state.classification}</Button>
            <Menu target="classificationBtn">
              <MenuItem onClick={() => { this.changeClassification('Unclassified'); }}>Unclassified</MenuItem>
              <MenuItem onClick={() => { this.changeClassification('FOUO'); }}>FOUO</MenuItem>
              <MenuItem onClick={() => { this.changeClassification('Secret'); }}>Secret</MenuItem>
              <MenuItem onClick={() => { this.changeClassification('Top Secret'); }}>Top Secret</MenuItem>
            </Menu>
          </div>
        </form>
    );
  }
}

export default Form;
