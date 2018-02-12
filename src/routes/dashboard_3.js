import React, {PropTypes} from 'react'
import {
  Row,
  Col,
  Card,Breadcrumb,
  Carousel,
  Switch,
  Icon,
  Menu, Dropdown,
  Button, Table
} from 'antd'
import { Label, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ReferenceArea, ResponsiveContainer } from 'recharts';
import {color} from '../utils'
import GradientCard from '../components/dashboard/gradient_card';
import SubscriptionTable from '../components/dashboard/subscription_list'
import RevenuesYear from '../components/dashboard/revenues_year'
import Expense from '../components/dashboard/expense'
import './dashboard.less'
import cookie from 'react-cookies'

const axios = require('axios');
import { axiosrequest } from './axiosrequest';
const styles = {
    textAlign: {
        textAlign: 'right'
    },

}
const columns = [{
  title: 'Name',
  dataIndex: 'name',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Age',
  dataIndex: 'age',
}, {
  title: 'Address',
  dataIndex: 'address',
}];
const datadata = [{
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
}, {
  key: '4',
  name: 'Disabled User',
  age: 99,
  address: 'Sidney No. 1 Lake Park',
}];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  getCheckboxProps: record => ({
    disabled: record.name === 'Disabled User', // Column configuration not to be checked
  }),
};
const cardStyle = {

  bodyStyle: {
    height: 150,
    color: '#fff',

    padding: 0
  }
}
const cardStyle_2 = {
  bodyStyle: {
    height: 480,
    color: '#fff'
  }
}
const cardStyle_3 = {
  bodyStyle: {
    minHeight: 510,
    color: '#fff'
  }
}
const semanticCardStyle = {
  minHeight: 548,
  color: '#fff',

  padding: 10
}

const yearMenu = (
  <Menu>
    <Menu.Item key="0">
      <a  rel="noopener noreferrer" href="#">2016</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a  rel="noopener noreferrer" href="3">2017</a>
    </Menu.Item>

  </Menu>
);

const monthMenu = (
  <Menu>
    <Menu.Item key="0">
      <a  rel="noopener noreferrer" href="#">3 Month</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a  rel="noopener noreferrer" href="#">6 Month</a>
    </Menu.Item>
    <Menu.Item key="3">
    <a  rel="noopener noreferrer" href="#">12 Month</a>
  </Menu.Item>
  </Menu>
);


const data = [
  { name: 1, cost: 4.11, impression: 100 },
  { name: 2, cost: 2.39, impression: 120 },
  { name: 3, cost: 1.37, impression: 150 },
  { name: 4, cost: 1.16, impression: 180 },
  { name: 5, cost: 2.29, impression: 200 },
  { name: 6, cost: 3, impression: 499 },
  { name: 7, cost: 0.53, impression: 50 },
  { name: 8, cost: 2.52, impression: 100 },
  { name: 9, cost: 1.79, impression: 200 },
  { name: 10, cost: 2.94, impression: 222},
  { name: 11, cost: 4.3, impression: 210 },
  { name: 12, cost: 4.41, impression: 300 },
  { name: 13, cost: 2.1, impression: 50 },
  { name: 14, cost: 8, impression: 190 },
  { name: 15, cost: 0, impression: 300 },
  { name: 16, cost: 9, impression: 400 },
  { name: 17, cost: 3, impression: 200 },
  { name: 18, cost: 2, impression: 50 },
  { name: 19, cost: 3, impression: 100 },
  { name: 20, cost: 7, impression: 100 }
];

const getAxisYDomain = (from, to, ref, offset) => {
	const refData = data.slice(from-1, to);
  let [ bottom, top ] = [ refData[0][ref], refData[0][ref] ];
  refData.forEach( d => {
  	if ( d[ref] > top ) top = d[ref];
    if ( d[ref] < bottom ) bottom = d[ref];
  });

  return [ (bottom|0) - offset, (top|0) + offset ]
};

const initialState = {
  data,
left : 'dataMin',
right : 'dataMax',
refAreaLeft : '',
refAreaRight : '',
top : 'dataMax+1',
bottom : 'dataMin-1',
top2 : 'dataMax+20',
bottom2 : 'dataMin-20',
animation : true,

};
var sessionIds = cookie.loadAll();
  console.log("yoo remove successfully"+JSON.stringify(sessionIds));
class Dashboard_3 extends React.Component {

	constructor(props) {
    super(props);
    this.state = initialState, {
    company:'',
    users:'',
    countsList:'',
  }

  }

  zoom(){
  	let { refAreaLeft, refAreaRight, data } = this.state;

		if ( refAreaLeft === refAreaRight || refAreaRight === '' ) {
    	this.setState( () => ({
      	refAreaLeft : '',
        refAreaRight : ''
      }) );
    	return;
    }

		// xAxis domain
	  if ( refAreaLeft > refAreaRight )
    		[ refAreaLeft, refAreaRight ] = [ refAreaRight, refAreaLeft ];

		// yAxis domain
    const [ bottom, top ] = getAxisYDomain( refAreaLeft, refAreaRight, 'cost', 1 );
    const [ bottom2, top2 ] = getAxisYDomain( refAreaLeft, refAreaRight, 'impression', 50 );

    this.setState( () => ({
      refAreaLeft : '',
      refAreaRight : '',
    	data : data.slice(),
      left : refAreaLeft,
      right : refAreaRight,
      bottom, top, bottom2, top2
    } ) );
  };

	zoomOut() {
  	const { data } = this.state;
  	this.setState( () => ({
      data : data.slice(),
      refAreaLeft : '',
      refAreaRight : '',
      left : 'dataMin',
      right : 'dataMax',
      top : 'dataMax+1',
      bottom : 'dataMin',
      top2 : 'dataMax+50',
      bottom: 'dataMin+50'
    }) );
  }
  // countsList = (params = {}) => {
  //
  // }

  componentDidMount(){
    var cookies = cookie.load('sessionid');
  //  alert()
    axios.get(axios.defaults.baseURL + '/api/front/dashboard/count/' + cookies ,{
      responseType: 'json'
    }).then(response => {
    //  alert( response.data.result)
    var counts = response.data.result;
  //  alert(response.data.result)
          this.setState({company: response.data.result.company,users: response.data.result.users, loading:false});
      })
    .catch(function (error) {
      console.log(error);
    });
  }
  render() {
    const { data, barIndex, left, right, refAreaLeft, refAreaRight, top, bottom,users,company, countsList, top2, bottom2 } = this.state;
document.title = "Dashboard";
    return (
      <div className="dashboard-3">
      <Breadcrumb>
         <Breadcrumb.Item><a href="#/dashboard">Dashboard</a></Breadcrumb.Item>
       </Breadcrumb><br />
      <Row gutter={32} justify="space-around" align="middle">
      <Col lg={8} md={8}>

      <Card className="bleedblue" noHovering="false" style={{ padding: '30px' }}>

        <Col span={12}>

        <i className="fa fa-building-o fa-5x text-primary"></i></Col>
       <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.company}</span><br />
       <span className="text-primary" style={{ fontSize: 20 }}>No. of Companies </span>

       </Col>
      </Card>

      </Col>
      <Col lg={8} md={8}>

      <Card className="bleedblue" noHovering="false" style={{ padding: '30px' }}>
        <Col span={12}><i className="fa fa-users fa-5x text-primary"></i></Col>
      <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>{this.state.users}</span><br />
      <span style={{ fontSize: 20 }} className="text-primary">No. of Users </span></Col>
      </Card>
      </Col>

      <Col lg={8} md={8}>

      <Card className="bleedblue" noHovering="false" style={{ padding: '30px' }}>
        <Col span={12}><i className="fa fa-usd fa-5x text-primary"></i></Col>
      <Col style={styles.textAlign} span={12}><span className="text-primary" style={{ fontSize: 32 }}>3200</span><br />
      <span style={{ fontSize: 20 }} className="text-primary">Total Sales </span></Col>
      </Card>
      </Col>
      </Row>
        <Row gutter={24}>
          <Col xs={24} sm={24} md={24} lg={24}>

            <Card title="Sales Overview" style={{'overflow':'hidden'}}>
            <div>
             <ResponsiveContainer width={'100%'} height={350}>
            <LineChart
                     width={800}
                     data={data}
                     onMouseDown = { (e) => this.setState({refAreaLeft:e.activeLabel}) }
                     onMouseMove = { (e) => this.state.refAreaLeft && this.setState({refAreaRight:e.activeLabel}) }
                     onMouseUp = { this.zoom.bind( this ) }
                   >
                     <CartesianGrid strokeDasharray="3 3"/>
                     <XAxis
                       allowDataOverflow={true}
                       dataKey="name"
                       domain={[left, right]}
                       type="number"
                     />
                     <YAxis
                       allowDataOverflow={true}
                       domain={[bottom, top]}
                       type="number"
                       yAxisId="1"
                      />
                     <YAxis
                       orientation="right"
                       allowDataOverflow={true}
                       domain={[bottom2, top2]}
                       type="number"
                       yAxisId="2"
                      />
                     <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#fff' }}/>
                     <Line yAxisId="1" type='natural' dataKey='cost' stroke='#8884d8' animationDuration={300}/>
                     <Line yAxisId="2" type='natural' dataKey='impression' stroke='#82ca9d' animationDuration={300}/>

                     {
                      (refAreaLeft && refAreaRight) ? (
                       <ReferenceArea yAxisId="1" x1={refAreaLeft} x2={refAreaRight}  strokeOpacity={0.3} /> ) : null

                     }

                   </LineChart>
                   </ResponsiveContainer>
            </div>
            </Card>
  </Col>


        </Row>



      </div>
    );
  }
}


export default Dashboard_3
