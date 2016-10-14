import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';

export default class Navigation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.path
    };
  }


  render() {
    return (
      <FloatingActionButton>
        <FontIcon className="material-icons">cloud_download</FontIcon>
      </FloatingActionButton>
    );
  }
}