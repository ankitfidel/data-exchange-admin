import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;

const columns = [{
  title: 'Template Name',
  dataIndex: 'templatename',
  key: 'templatename',
  width: 170,
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Applications',
  dataIndex: 'application',
  key: 'application',
  width: 120,
}, {
  title: 'Items',
  dataIndex: 'items',
  key: 'items',
  width: 200
},
{
  title: 'Triggers',
  dataIndex: 'trigers',
  key: 'trigers',
  width: 200
},
{
  title: 'Graphs',
  dataIndex: 'graphs',
  key: 'graphs',
  className: 'styles',
  width: 200
},
{
  title: 'Linked To',
  dataIndex: 'linked',
  key: 'linked',
  width: 200
}];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    templatename: 'Template SNMP Generic',
    application: <a href="">	Applications 1</a>,
    items: `Items 5`,
    trigers: `Triggers 0`,
    graphs: `Graphs 0`,
    linked: `Template SNMP Device`
  });
}
function onChange(e) {
  console.log(`checked = ${e.target.checked}`);
}

const styles = { textAlign:'left'}

class Templates extends React.Component {

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


       <Col className="gutter-row" span={6}>
       <div>
       <Checkbox onChange={onChange}>Hide Templates with no Hosts linked</Checkbox></div>

       </Col>

       </Row>
<Card noHovering="false">
         <Table rowSelection={rowSelection} scroll={{ x: 1000}} columns={columns} dataSource={data} />
         </Card>
       </div>
     );

}
}



export default Templates
