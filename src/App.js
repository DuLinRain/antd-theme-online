import React, { Component } from 'react';
import './App.css';
import { Icon } from 'antd';
import Header from './components/header/index'
import Sider from './components/sider/index'
import Content from './components/content/index'
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      expand: true
    }
  }
  
  changeExpand = () => {
    let {expand} = this.state
    this.setState({
      expand: !expand
    })
  }
  render() {
    
    let {expand = true} = this.state
    return (
      <div className="App">
        <div className="header">
          <Header/>
        </div>
        <div className="container">
          <div className={expand ? 'sider expand' : 'sider collapse'}>
            <Sider/>
            <div className='expander-arrow-wrapper'>
              <Icon type={expand ? "caret-left" : "caret-right"} className="expander-arrow" onClick={this.changeExpand}/>
            </div>
          </div>
          <div className="content">
            <Content/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
