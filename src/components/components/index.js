import React, {Component} from 'react';
import {Button} from 'antd'

class ComponentList extends Component {
  state = {
    list: [
      'no-content',
      'button'
    ]
  }

  componentDidMount() {
  }

  emit(componentName) {
    const callback = this.props.callback
    callback && callback(componentName)
  }

  render() {
    return (
      <div>
        {this.state.list.map((item, index) => (
          <div key={index}>
            <Button type="primary" onClick={() => {
              this.emit(item)}
            }>{item}</Button>
          </div>))
        }
      </div>
    )
  }
}

export default ComponentList