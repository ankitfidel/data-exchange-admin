import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;

const columns = [{
  title: 'Name',
  dataIndex: 'name',
  key: 'name',
  width: 170,
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Hosts Count',
  dataIndex: 'hostcount',
  key: 'hostcount',
  width: 120,
}, {
  title: 'Groupid',
  dataIndex: 'groupid',
  key: 'groupid',
  className: 'styles',
  width: 200
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'Zabbix server',
    hostcount: <Badge count={'Yes'} style={{ backgroundColor: '#87d068' }} />,
    groupid: `192.168.${i}2.${i}1`
  });
}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const styles = { textAlign:'left'}

class Hostsgroup extends React.Component {

  constructor(props) {
      super(props);

   }
   state = {
       bordered: true,
       loading: true,
       pagination: true,
       size: 'default',
       expandedRowRender:true,
       title:true,
       showHeader:true,
       footer:true,
       rowSelection: true,
       scroll: true,
       selectedRowKeys: []
     }
     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }

render(){
  const { selectedRowKeys } = this.state;
     const rowSelection = {
       selectedRowKeys,
       onChange: this.onSelectChange,
       hideDefaultSelections: true,
       selections: [{
         key: 'all-data',
         text: 'Select All Data',
         onSelect: () => {
           this.setState({
             selectedRowKeys: [...Array(46).keys()], // 0...45
           });
         },
       }, {
         key: 'odd',
         text: 'Select Odd Row',
         onSelect: (changableRowKeys) => {
           let newSelectedRowKeys = [];
           newSelectedRowKeys = changableRowKeys.filter((key, index) => {
             if (index % 2 !== 0) {
               return false;
             }
             return true;
           });
           this.setState({ selectedRowKeys: newSelectedRowKeys });
         },
       }, {
         key: 'even',
         text: 'Select Even Row',
         onSelect: (changableRowKeys) => {
           let newSelectedRowKeys = [];
           newSelectedRowKeys = changableRowKeys.filter((key, index) => {
             if (index % 2 !== 0) {
               return true;
             }
             return false;
           });
           this.setState({ selectedRowKeys: newSelectedRowKeys });
         },
       }],
       onSelection: this.onSelection,
     };
     return (
       <div>
       <Row gutter={16}>


       <Col className="gutter-row" xs={24} sm={24} md={24} lg={24}>

       <Checkbox onChange={onChange}>Hide Groups with no Hosts</Checkbox>

       </Col>

       </Row>
<Card noHovering="false">
         <Table rowSelection={rowSelection} scroll={{ x: 1000}} columns={columns} dataSource={data} />
         </Card>
       </div>
     );

}
}



export default Hostsgroup
