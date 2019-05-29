import React, { Component } from 'react';
import { Button } from 'antd'

class Button extends Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <Button type="primary">Button</Button>
      </div>
    )
  }
}

export default Button