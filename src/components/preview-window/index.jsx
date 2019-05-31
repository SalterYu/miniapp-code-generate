import React, { Component } from 'react';
class PreviewWindow extends Component {
  render() {
    return (
      <div>
        {this.props.dom}
      </div>
    )
  }
}

export default PreviewWindow