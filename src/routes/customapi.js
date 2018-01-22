import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
import $ from 'jquery';
import styles from './customcommon.less';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
import reqwest from 'reqwest';


const columns = [
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


class Customapi extends React.Component {
  constructor(props) {
     super(props);
     this.state = {pictures: [],
       data: [],
          pagination: {},
          loading: false,
     };
   }

   handleTableChange = (pagination, filters, sorter) => {
      const pager = { ...this.state.pagination };
      pager.current = pagination.current;
      this.setState({
        pagination: pager,
      });
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    }
    fetch = (params = {}) => {
      console.log('params:', params);
      this.setState({ loading: true });
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        data: {
          results: 5,
          ...params,
        },
        type: 'json',
      }).then((data) => {
        const pagination = { ...this.state.pagination };
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 20;
        this.setState({
          loading: false,
          data: data.results,
          pagination,
        });
      });
    }
   componentDidMount() {
  //   this.UserList();
    this.fetch();
  fetch("https://randomuser.me/api/?results=12")
  .then(results =>{
    return results.json();
  }).then(data => {
    let pictures = data.results.map((pic,i) => {
      return(
  <Col xs={24} sm={24} md={24} lg={4} key={i.toString()}>
  <Card style={{ width: 240 }} bodyStyle={{ padding:10 }}>
    <div className="custom-image">
      <img alt="example" width="100%" src={pic.picture.large} />
    </div>
    <div className={styles.customCard}>
      <h3 className={styles.caps}>{pic.name.first} &nbsp;{pic.name.last}</h3>
      <p>{pic.gender}</p>
    </div>
  </Card>
  </Col>

      )
    })
      this.setState({pictures:pictures});
      console.log("state:", this.state.pictures)
  })

   }

  //  UserList() {
  //    $.getJSON('https://cdn.contentful.com/spaces/j6kwqi43xct3/entries?access_token=6be863b7ca36c67af0e01a22c82a3977a646bbc999b91b741ec82c93f3cc345a&content_type=announcementList')
  //      .then(({ results }) => this.setState({ persons: results }));
  //  }

   render() {


     return (
       <div id="layout-content" className="layout-content-wrapper">
      <Card> <Table columns={columns}
      rowKey={record => record.registered}
      dataSource={this.state.data}
      pagination={this.state.pagination}
      loading={this.state.loading}
      onChange={this.handleTableChange}
    />
    </Card>
         <div className="panel-list">
  <Row gutter={24}>
         { this.state.pictures }
         </Row>
         </div>
       </div>
     );
   }

}



export default Customapi
