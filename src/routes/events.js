import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal,Switch, Radio, Form,DatePicker, Select} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;

const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

function handleChange(value) {
  console.log(`selected ${value}`);
}

function handleBlur() {
  console.log('blur');
}

function handleFocus() {
  console.log('focus');
}

const columns = [{
  title: 'Date',
  dataIndex: 'date',
  key: 'date',
}, {
  title: 'host',
  dataIndex: 'host',
  key: 'host',
}, {
  title: 'severity',
  dataIndex: 'severity',
  key: 'severity',
},   {
  title: 'Description',
  dataIndex: 'description',
  key: 'description'
},
{
  title: 'duration',
  dataIndex: 'duration',
  key: 'duration'
} ,{
  title: 'ack',
  dataIndex: 'ack',
  key: 'ack',
},];

const data = [];
for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    date: '08/11/17 05:40	',
    host: <a href="#">UPSA1.p1.dcl.sensorandwireless.com</a>,
    severity: `192.168.${i}2.${i}1`,
    description: `Response time is too high on UPSA1.p1.dcl.sensorandwireless.com	`,
    duration: `-`,
    ack: `No`,
  });
}

const styles = { textAlign:'left'}

class Events extends React.Component {

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
  const { selectedRowKeys, size } = this.state;
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
       <div>

<Card noHovering="false">
<Row gutter={16}>
<Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
 <div><label>Filter:</label></div>
 <RangePicker size={size} />
</Col>
<Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
<div><label>Select option:</label></div>
<Select showSearch style={{ width: '100%'   }} placeholder="Select a person" optionFilterProp="children"
 onChange={handleChange}
 onFocus={handleFocus}
 onBlur={handleBlur}
 filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
>
 <Option value="last 5 mins">last 5 mins</Option>
 <Option value="last 15 mins">last 15 mins</Option>
 <Option value="last 30 mins">last 30 mins</Option>
 <Option value="last 1 hours">last 1 hours</Option>
 <Option value="last 3 hours">last 3 hours</Option>
 <Option value="last 6 hours">last 6 hours</Option>
 <Option value="last 12 hours">last 12 hours</Option>
 <Option value="last 1 days">last 1 days</Option>
 <Option value="last 1 weeks">last 1 weeks</Option>
 <Option value="last 2 weeks">last 2 weeks</Option>
 <Option value="last 1 months">last 1 months</Option>
 <Option value="last 3 months">last 3 months</Option>
  <Option value="last 6 months">last 6 months</Option>
   <Option value="last 1 years">last 1 years</Option>
    <Option value="last 2 years">last 2 years</Option>
    <Option value="today so far">today so far</Option>
    <Option value="this week so far">this week so far</Option>
    <Option value="this month so far">this month so far</Option>
    <Option value="yesterday">yesterday</Option>
    <Option value="previous month">previous month</Option>
</Select>
</Col>
<Col className="gutter-row" xs={24} sm={12} md={12} lg={6}>
<div><label className={events.clearhidden}>clear:</label></div>
 <Button type="primary">clear</Button>
</Col>

</Row>

         </Card>
       </div>
       <div>
<Card noHovering="false">
         <Table rowSelection={rowSelection} scroll={{ x: 1000}} columns={columns} dataSource={data} />
         </Card>
       </div>
       </div>
     );

}
}



export default Events
