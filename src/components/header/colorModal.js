import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import { SketchPicker } from 'react-color'
import './colorModal.css'

class ColorModal extends Component {
  constructor(props) {
    super(props)
    this.state = { 
        visible: false,
        primaryColor: '#1890ff',
        color: '#1890ff'
    }
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      primaryColor: this.state.color
    }, () => {
        let {switchTheme = function (){}} = this.props
        switchTheme(this.state.primaryColor)
    });
  }

  handleReset = (e) => {
    e && e.stopPropagation()
    this.setState({
      visible: false,
      color: '#1890ff',
      primaryColor: '#1890ff' 
    }, () => {
        let {switchTheme = function (){}} = this.props
        switchTheme(this.state.primaryColor)
    });
    
  }
  handleCancel = (e) => {
    e && e.stopPropagation()
    this.setState({
        visible: false,
        color: this.primaryColor
    });
  }

  handleChangeComplete = ({hex}) => {
    this.setState({
      color: hex
    })
  }

  render() {
    let {color} = this.state
    return (
      <React.Fragment>
        <span className="custom-btn" onClick={this.showModal}>
            {this.props.children}
        </span>
        <Modal
          title="选择主题基色"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width="400px"
          footer={[
            <Button key="back" onClick={this.handleReset}>重置</Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              确定
            </Button>,
          ]}
        >
          <SketchPicker className="center" width="240px" color={ color } onChangeComplete={ this.handleChangeComplete }/>
        </Modal>
      </React.Fragment>
    );
  }
}
export default ColorModal