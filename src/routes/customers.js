import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Input, Popconfirm} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;


const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    logo: `logo ${i}`,
    Name: 'John',
    ParentCustomer: `London Park no. ${i}`,
    ZabbixURLIP: `http://zabbix.do-prod1.sensorandwireless.com/api_jsonrpc.php${i}`,
    Address: `Trade And Financial Tower	 ${i}`,
    Username: `admin`,
    Password: `osh2Baishoh5Iph4`,
    SignupDate: `2017-08-08 10:49:31`,
    ExpirationDate: `2018-07-12 12:38:23`,
  });
}
const EditableCell = ({ editable, value, onChange }) => (
<div>
  {editable
    ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    : value
  }
</div>
);
class Customers extends React.Component {

  constructor(props) {
      super(props);
      this.columns = [{
        title: 'Customer logo',
        dataIndex: 'logo',
        render: (text, record) => this.renderColumns(text, record, 'logo'),
      },
      {
        title: 'Name',
        dataIndex: 'Name',
        render: (text, record) => this.renderColumns(text, record, 'Name'),
      },
      {
        title: 'Parent Customer	',
        dataIndex: 'ParentCustomer',
        render: (text, record) => this.renderColumns(text, record, 'ParentCustomer'),
      },
      {
        title: 'Zabbix URL/IP	',
        dataIndex: 'ZabbixURLIP',
        render: (text, record) => this.renderColumns(text, record, 'ZabbixURLIP'),
      },
      {
        title: 'Address',
        dataIndex: 'Address',
        render: (text, record) => this.renderColumns(text, record, 'Address'),
      },
      {
        title: 'Username',
        dataIndex: 'Username',
        render: (text, record) => this.renderColumns(text, record, 'Username'),
      },
      {
        title: 'Password',
        dataIndex: 'Password',
        render: (text, record) => this.renderColumns(text, record, 'Password'),
      },
      {
        title: 'Signup Date',
        dataIndex: 'SignupDate',
        render: (text, record) => this.renderColumns(text, record, 'SignupDate'),
      }, {
        title: 'Expiration Date',
        dataIndex: 'ExpirationDate',
        render: (text, record) => this.renderColumns(text, record, 'ExpirationDate'),
      },  {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editable } = record;
          return (
            <div className="editable-row-operations">
              {
                editable ?
                  <span>
                    <a onClick={() => this.save(record.key)}>Save</a>
                    <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                  : <a onClick={() => this.edit(record.key)}>Edit</a>
              }
            </div>
          );
        },
      }];
      this.state = { data };
      this.cacheData = data.map(item => ({ ...item }));
 }

 renderColumns(text, record, column) {
   return (
     <EditableCell
       editable={record.editable}
       value={text}
       onChange={value => this.handleChange(value, record.key, column)}
     />
   );
 }
 handleChange(value, key, column) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     target[column] = value;
     this.setState({ data: newData });
   }
 }
 edit(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     target.editable = true;
     this.setState({ data: newData });
   }
 }
 save(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     delete target.editable;
     this.setState({ data: newData });
     this.cacheData = newData.map(item => ({ ...item }));
   }
 }
 cancel(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
     delete target.editable;
     this.setState({ data: newData });
   }
 }
render(){

  return (
<div>
<Row gutter={24}>
    <Card>
      <Table bordered dataSource={this.state.data} scroll={{ x: 1600}} columns={this.columns} />
   </Card>
</Row>
</div>
  )
}

}



export default Customers
