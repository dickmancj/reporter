import React, {Component} from 'react';

let Classification = React.createClass({
  getInitialState() {
    return {value: 'Hello'};
  },
  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  },
  render() {
    return (
        <div className="mdl-textfield mdl-js-textfield">
          <input className="mdl-textfield__input" type="text" id={this.props.id} value={this.state.value}
                 onChange={this.handleChange}/>
          <label className="mdl-textfield__label" htmlFor={this.props.id}>{this.props.title}</label>
        </div>
    );
  }
});

class Form extends Component {
  render() {
    return (
        <form>
          <Classification id="test"/>
        </form>
    );
  }
}

export default Form;
