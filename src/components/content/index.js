import React, { Component } from 'react';
import { Row, Col, Table, Icon, Divider, Steps  } from 'antd';
import NormalLoginForm from './loginform'
import ButtonSize from './buttonSize'
import DatePickerDemo from './datepickerdemo'
const Step = Steps.Step;
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  render: text => <a href="javascript:;">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
  key: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
  key: 'address',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="javascript:;">Action 一 {record.name}</a>
      <Divider type="vertical" />
      <a href="javascript:;">Delete</a>
      <Divider type="vertical" />
      <a href="javascript:;" className="ant-dropdown-link">
        More actions <Icon type="down" />
      </a>
    </span>
  ),
}];

const data = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}, {
  key: '2',
  name: 'Jim Green',
  age: 42,
  address: 'London No. 1 Lake Park',
}, {
  key: '3',
  name: 'Joe Black',
  age: 32,
  address: 'Sidney No. 1 Lake Park',
}];

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: {
    style: {
      color: '#f50',
    },
    label: <strong>100°C</strong>,
  },
};
class Content extends Component {
    render () {
        return (
          <React.Fragment>
            <Row gutter={16}>
              <Col span={6}>
                <NormalLoginForm/>
              </Col>
              <Col span={6}>
                <ButtonSize/>
              </Col>
              <Col span={6}>
                <Steps direction="vertical" current={1}>
                  <Step title="Finished" description="This is a description." />
                  <Step title="In Progress" description="This is a description." />
                  <Step title="Waiting" description="This is a description." />
                </Steps>
              </Col>
              <Col span={6}>
                <DatePickerDemo/>
              </Col>
            </Row>
            <Row>
              <Table columns={columns} dataSource={data} />
            </Row>
          </React.Fragment> 
        )
    }
}
export default Content