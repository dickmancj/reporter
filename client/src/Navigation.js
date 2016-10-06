import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import { browserHistory } from 'react-router'
import {Tabs, Tab} from 'material-ui/Tabs';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.path
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
    browserHistory.push(value);
  };

  render() {
    return (
        <Tabs
            value={this.state.value}
            onChange={this.handleChange}
        >
          <Tab
              icon={<FontIcon className="material-icons">insert_drive_file</FontIcon>}
              label="ADD REPORT"
              value="/"
          />
          <Tab
              icon={<FontIcon className="material-icons">search</FontIcon>}
              label="SEARCH"
              value="/search"
          />
        </Tabs>
    );
  }
}