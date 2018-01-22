import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Tabs } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import reqwest from 'reqwest';

const triggersdata = [{
  key: '1',
  name: 'John Brown',
  age: 32,
  address: 'New York No. 1 Lake Park',
}];
const triggerscolumns = [{
  title: 'Name',
  dataIndex: 'name',
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
class Devicedetails extends React.Component {

  constructor(props) {
      super(props);

   }
   state = {
       bordered: true,
       pagination: true,
       size: 'default',
       expandedRowRender:true,
       title:true,
       showHeader:true,
       footer:true,
       rowSelection: true,
       scroll: true,
       selectedRowKeys: [],
       hostss:[],
       loading: false,
     }

     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }

     handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
          key:i,
        });
        this.fetch({
          results: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
componentWillMount(){




}
     componentDidMount() {
    //

    fetch("https://randomuser.me/api/?results=10")
    .then(results =>{
      return results.json();
    }).then(data => {
//alert("fetching");
  //  this.fetchtable();
      let hostss = data.results.map((pic,i,demo) => {
  //    const jsObj = [];

    // for (var i = 1; i <= 12; i++) {
    //     jsObj['key' + i] = 'example ' + 1;
    // }
        //  const i = 0;
      //  alert("demoo table")
      const hostsdetailstables = [
        {
          title: 'Images',
          dataIndex: 'picture',
          render: picture => <img src={picture.thumbnail} />,
        },{
        title: 'Name',
        dataIndex: 'name',
        sorter: true,
        render: name => `${name.title}. ${name.first} ${name.last}`,
        width: '20%',
      }, {
        title: 'Gender',
        dataIndex: 'gender',
        filters: [
          { text: 'Male', value: 'male' },
          { text: 'Female', value: 'female' },
        ],
        width: '20%',
      }, {
        title: 'Contact no.',
        dataIndex: 'phone',
      },

      {
        title: 'E-mail',
        dataIndex: 'email',
      }];
        return(


        <TabPane tab={<span><Icon type="clock-circle" /> {pic.email}</span>} key={i}>
        <Card noHovering="false" bodyStyle={{ padding: 0 }}>
        <Table columns={pic.hostsdetailstables}
       rowKey={record => record.registered}
       dataSource={this.state.data}
       pagination={this.state.pagination}
       loading={this.state.loading}
       onChange={this.handleTableChange}
       />
                 </Card>
        </TabPane>
        )
      });

        this.setState({hostss:hostss});
        console.log("state:", this.state.hostss)
    })

     }

render(){
  //
  const styles = {
      textAlign: {
          textAlign: 'right'
      },

  }
     return (
       <div>
       <Row  gutter={24} justify="space-around" align="middle">
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       <Col lg={6} md={6}>
       <Card style={{ padding: '0' }}>
         <Col span={12}>Status</Col>
          <Col style={styles.textAlign} span={12}><span>Monitored</span>
        </Col>
       </Card>
       </Col>
       </Row>
       <Row><Card bodyStyle={{ padding: 0 }}>
 <Table columns={triggerscolumns} dataSource={triggersdata} size="middle" /></Card>
       </Row>
       <Row>
       <Card>
<Tabs defaultActiveKey="1+1" style={{ height: "100%" }} >
{this.state.hostss}
</Tabs>
</Card>
         </Row>
       </div>
     );

}
}



export default Devicedetails;
