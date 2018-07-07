import React, { Component } from 'react';
import { Row, Col, Menu, Icon } from 'antd';
import generateColors from '../../utils/color'
import {getFile, getStyleTemplate} from '../../utils/common'
import objectAssign from 'object-assign'
import JSZip from 'jszip'
import {createBlob} from 'blob-util'
import FileSaver from 'file-saver'
import ColorModal from './colorModal'
import './index.css'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      current: 'mail',
      colors: {
        primary: '#1890ff',
      },
      primaryColor: '#1890ff', 
      originalStyle: '',
      zip: new JSZip(),
      styleFiles: []
    }
  }
  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }
  switchTheme = (color) => {
    this.setState({
      primaryColor: color,
      colors: {
        primary: color
      }
    }, () => {
      this.submitForm()
    })
  }

  resetZip = () => {
    this.setState({
      zip: new JSZip()
    })
  }
  
  getIndexStyle = () => {
    getFile('//unpkg.com/antd/dist/antd.css')
    .then(({ data }) => {
      this.setState({
        originalStyle: getStyleTemplate(data)
      })
    })
  }

  writeNewStyle = () => {
    let {originalStyle, colors} = this.state
    let cssText = originalStyle
    Object.keys(colors).forEach(key => {
      cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
    })
    let customStyle = document.querySelector('#custom-style')
    if (customStyle) {
      customStyle.parentNode.removeChild(customStyle)
    }
    const style = document.createElement('style')
    style.setAttribute("id","custom-style")
    style.innerText = cssText
    document.head.appendChild(style)
  }
  submitForm = () => {
    let {colors, primaryColor} = this.state
    this.setState({
      colors: objectAssign({}, colors, generateColors(primaryColor))
    }, () => {
      this.writeNewStyle() 
    })
  }
  downloadZip = () => {
    this.resetZip()
    let {styleFiles, colors, originalStyle, zip, primaryColor} = this.state
    styleFiles.forEach(file => {
      
      let cssText = file.data
      let name = `${file.name}.css`
      Object.keys(colors).forEach(key => {
        cssText = cssText.replace(new RegExp('(:|\\s+)' + key, 'g'), '$1' + colors[key])
      })
      const css = createBlob([cssText], { type: 'text/css' })
      zip.file(name, css)
    })
    zip.file('antd.css', originalStyle)
    zip.generateAsync({ type: 'blob' })
    .then(blob => {
      FileSaver.saveAs(blob, `antd-${primaryColor}.zip`)
    })
  }
  getSeparatedStyles = () => {
    let excludes = [
      '_util/',
      'col/',
      'icon/',
      'row/',
      'style/',
      'version/',
      'popconfirm/'
    ]
    getFile('//unpkg.com/antd/lib/')
    .then(({ data }) => {
      return data.match(/href="[\w-]+\/"/g).map(str => str.split('"')[1])
    })
    .then(styleFiles => { 
      styleFiles = styleFiles.filter(x => {
        return excludes.indexOf(x) === -1
      })
      return Promise.all(styleFiles.map(file => {
        return getFile(`//unpkg.com/antd/lib/${file}style/index.css`)
      }))
    })
    .then(files => {
      this.setState({
        styleFiles: files.map(file => {
          let temp = file.fullurl.split('/')
          return {
            name: temp.length > 2 ? temp[temp.length - 3] : file.fullurl,
            data: getStyleTemplate(file.data)
          }
        })
      })
    })
  }

  getFontFiles = () => {

  }

  componentDidMount = () => {
    this.getIndexStyle()
    this.getSeparatedStyles()
    this.getFontFiles()
  }

  render() {
    return (
      <Row>
        <Col span={18}>
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className="custom-nav"
          >
            <Menu.Item key="mail">
              <Icon type="mail" />Navigation One
            </Menu.Item>
            <Menu.Item key="app" disabled>
              <Icon type="appstore" />Navigation Two
            </Menu.Item>
            <SubMenu title={<span><Icon type="setting" />Navigation Three - Submenu</span>}>
              <MenuItemGroup title="Item 1">
                <Menu.Item key="setting:1">Option 1</Menu.Item>
                <Menu.Item key="setting:2">Option 2</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Item 2">
                <Menu.Item key="setting:3">Option 3</Menu.Item>
                <Menu.Item key="setting:4">Option 4</Menu.Item>
              </MenuItemGroup>
            </SubMenu>
            <Menu.Item key="alipay">
              <a href="https://github.com/DuLinRain/antd-theme-online" target="_blank" rel="noopener noreferrer">github</a>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3}> 
          <ColorModal switchTheme={this.switchTheme}>
            切换主题
          </ColorModal>
        </Col>
        <Col span={3}>
          <span className="custom-btn" onClick={this.downloadZip}>下载主题</span>
        </Col>
      </Row>
    );
  }
}

export default Header