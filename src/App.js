import React, {Component} from 'react';
import ComponentList from './components/components'
import PreviewWindow from './components/preview-window'
import './App.less';

class App extends Component {
  state = {
    currentComponent: null,
    previewWindowDom: null
  }

  componentDidMount() {
    this.renderComponent('no-content');
  }

  renderComponent = (componentName = '') => {
    if (!componentName) return
    import(`./components/components/${componentName}`).then((Component) => {
      console.log(Component)
      //do something with TheComponent = Component.default
      const App = () => {
        return (
          <div>
            <Component.default callback={this.onGenerateCode.bind(this)}/>
          </div>
        )
      }
      this.setState({ currentComponent: App() });
    })
  }

  onGenerateCode(domObject) {
    this.setState({
      previewWindowDom: domObject
    })
  }

  render() {
    const { currentComponent } = this.state
    return (
      <div className="content">
        <div className="component-list">
          <ComponentList callback={(componentName) => {
            this.renderComponent(componentName)
          }}
          ></ComponentList>
        </div>
        <div className="component-param-form">
          {currentComponent}
        </div>
        <div className="preview-window">
          <PreviewWindow dom={this.state.previewWindowDom}/>
        </div>
      </div>
    );
  }
}

export default App;