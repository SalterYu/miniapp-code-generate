import React, {Component, createElement} from 'react';
import {Form, Icon, Input, Button} from 'antd';

class NoContent extends Component {
  state = {
    imgSrc: '',
    top: "",
    imgWidth: "",
    imgHeight: "",
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { imgSrc } = values
        const code = `
          <block>
            <image src="${imgSrc || ''}"></image>
          </block>
        `
        const domObject = this._createDomObject(values)
        this.emitOnGenerateCode(domObject)
        console.log(code)
      }
    });
  };

  _createDomObject(values) {
    const { imgSrc, imgWidth, imgHeight } = values
    const astDom = {
      tag: 'div',
      attr: null,
      children: [{
        tag: 'img',
        attr: {
          style: {
            width: `${imgWidth}px`,
            height: `${imgHeight}px`
          },
          src: imgSrc
        },
        children: null
      }]
    }


    const createReactDom = (ast, key) => {
      if (!ast) return null
      if (typeof ast !== "object") return ast
      if (ast.children && Array.isArray(ast.children)) {
        console.log(ast)
        return createElement(ast.tag, ast.attr, ast.children.map((child, index) => {
          let _attr = child.attr || {}
          return createReactDom(child, _attr.key || index )
        }))
      } else {
        let _attr = ast.attr || {}
        return createElement(ast.tag, Object.assign({}, {key}, ast.attr), createReactDom(ast.children))
      }
    }

    return createReactDom(astDom)

    // return createElement(
    //   'div', null, [
    //     createElement('img', { src: "https://img3.tuhu.org/activity/image/FncbDqSrUzsras9jzZYzv0pl_faQ_w200_h200.png@100Q.png", key: 1 }, null),
    //     createElement('img', { src: "https://img3.tuhu.org/activity/image/FncbDqSrUzsras9jzZYzv0pl_faQ_w200_h200.png@100Q.png", key: 2 }, null)
    //   ])
  }

  emitOnGenerateCode(domObject) {
    const callback = this.props.callback
    callback && callback(domObject)
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form onSubmit={this.handleSubmit} className="form">
          <Form.Item label="imgSrc">
            {
              getFieldDecorator('imgSrc')(
                <Input
                  prefix={<Icon type="heart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="imgSrc"
                />
              )
            }
          </Form.Item>
          <Form.Item label="top">
            {
              getFieldDecorator('top')(
                <Input
                  prefix={<Icon type="heart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="top"
                />
              )
            }
          </Form.Item>
          <Form.Item label="imgWidth">
            {
              getFieldDecorator('imgWidth')(
                <Input
                  prefix={<Icon type="heart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="imgWidth"
                />
              )
            }
          </Form.Item>
          <Form.Item label="imgHeight">
            {
              getFieldDecorator('imgHeight')(
                <Input
                  prefix={<Icon type="heart" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="imgHeight"
                />
              )
            }
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">代码生成</Button>
          </Form.Item>
        </Form>

      </div>
    )
  }
}

const NoContentForm = Form.create({ name: 'no-content' })(NoContent);


export default NoContentForm