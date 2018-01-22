import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;



class Header extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',

   }
 }
   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };


render(){

  const COLOR = 'red'

  const tablescolumns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'age', key: 'age' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:void(0)" onClick={() => this.setModal1Visible(true)}>View Graph</a> },
];

const tbalesdata = [
  { key: 1, name: 'John Brown', age: 32, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 2, name: 'Jim Green', age: 42, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
  { key: 3, name: 'Joe Black', age: 32, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];

   const { showing } = this.state;
   const data = [
      {name: 'Page A', uv: 4000, pv: 9000},
      {name: 'Page B', uv: 3000, pv: 7222},
      {name: 'Page C', uv: 2000, pv: 6222},
      {name: 'Page D', uv: 1223, pv: 5400},
      {name: 'Page E', uv: 1890, pv: 3200},
      {name: 'Page F', uv: 2390, pv: 2500},
      {name: 'Page G', uv: 3490, pv: 1209},  {name: 'Page A', uv: 4000, pv: 9000},
        {name: 'Page B', uv: 3000, pv: 7222},
        {name: 'Page C', uv: 2000, pv: 6222},
        {name: 'Page D', uv: 1223, pv: 5400},
        {name: 'Page E', uv: 1890, pv: 3200},
        {name: 'Page F', uv: 2390, pv: 2500},
        {name: 'Page G', uv: 3490, pv: 1209},  {name: 'Page A', uv: 4000, pv: 9000},
          {name: 'Page B', uv: 3000, pv: 7222},
          {name: 'Page C', uv: 2000, pv: 6222},
          {name: 'Page D', uv: 1223, pv: 5400},
          {name: 'Page E', uv: 1890, pv: 3200},
          {name: 'Page F', uv: 2390, pv: 2500},
          {name: 'Page G', uv: 3490, pv: 1209},
];
const data1 =  [{name: 'Page A', uv: 590, pv: 800, amt: 1400},
              {name: 'Page B', uv: 868, pv: 967, amt: 1506},
              {name: 'Page C', uv: 1397, pv: 1098, amt: 989},
              {name: 'Page D', uv: 1480, pv: 1200, amt: 1228},
              {name: 'Page E', uv: 1520, pv: 1108, amt: 1100},
              {name: 'Page F', uv: 1400, pv: 680, amt: 1700}];
  return (

    <div>
    <div>
    <Row>

    </Row>
</div>
<div >jkgasgashgdhasd</div>
    <Modal
      okText="OK"
      cancelText="Cancel"
      title="20px to Top" width={'80%'}
      style={{
      top: 20
    }}
      visible={this.state.modal1Visible}
      onOk={() => this.setModal1Visible(false)}
      onCancel={() => this.setModal1Visible(false)}>
      <div>
       <Col xs={24} md={24} lg={24}>
       <div>
       <ResponsiveContainer width={'100%'} height={300}>
       <ComposedChart width={600} height={400} data={data}
               margin={{top: 20, right: 80, bottom: 20, left: 20}}>
             <XAxis dataKey="name" label="Pages"/>
             <YAxis label="Index"/>
             <Tooltip/>
             <Legend/>
             <CartesianGrid stroke='#f5f5f5'/>
             <Area type='monotone' dataKey='amt' fill='#8884d8' stroke='#8884d8'/>
             <Bar dataKey='pv' barSize={20} fill='#58aadd'/>
             <Line type='monotone' dataKey='uv' stroke='#ff7300'/>
          </ComposedChart>
       </ResponsiveContainer>
      </div>
       </Col>
      </div>
    </Modal>
    <Card>
    <Table columns={tablescolumns} expandedRowRender={record => <div>This is Details Content. </div>} dataSource={tbalesdata} />
    </Card>
    <div>
                   <Button type="primary" onClick={() => this.setState({ showing: !showing })}>Click to line chart</Button>
                   { showing
                       ? <div>
                       <Card>
                        <Col xs={24} md={24} lg={24}>
                        <div>
                        <ResponsiveContainer width={'100%'} height={300}>
                        <LineChart width={500} height={300} data={data} syncId="anyId"
                              margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                          <XAxis dataKey="name"/>
                          <YAxis/>
                          <CartesianGrid strokeDasharray="1 1"/>
                          <Tooltip/>
                          <Line type='monotone' dataKey='pv' stroke='#82ca9d' fill='#82ca9d' />
                          <Brush />
                        </LineChart>
                        </ResponsiveContainer>
                       </div>
                        </Col>
                       </Card>
                       </div>
                       : null
                   }
               </div>

    </div>
  )
}

}



export default Header
