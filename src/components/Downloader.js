import React, {Component} from 'react';
import FontIcon from 'material-ui/FontIcon';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import fileDownload from 'react-file-download';

export default class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.path
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    fileDownload(window.atob(this.props.content.report_content._content), this.props.content.report_content._name);
  }

  render() {
    return (
      <FloatingActionButton onClick={this.handleClick}>
        <FontIcon className="material-icons">cloud_download</FontIcon>
      </FloatingActionButton>
    );
  }
}
