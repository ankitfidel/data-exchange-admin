import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;
import colors from '../utils/theme'

import RightSider from '../components/layout/rightSider';
const style={
    profileHeader:{
         background: 'url(./assets/2.jpg) no-repeat',

        width: '100%',
        backgroundSize: 'cover',
        height: '250px',
    }
}
class Profile extends React.Component {

    onClick(event) {
      localStorage.clear();
      location.reload();
   }
  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',
         profile:[]

   }
 }

   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };


   componentDidMount() {
  //   this.UserList();
  fetch("https://randomuser.me/api/?results=10")
  .then(results =>{
    return results.json();
  }).then(data => {

    let profile = data.results.map((pic,i,demo) => {
    //const jsObj = [];

// for (var i = 1; i <= 12; i++) {
//     jsObj['key' + i] = 'example ' + 1;
// }
 //const val= Object.values(pic)[0];
      return(

  <div className="profile" key={i.toString()}>

      <div className="" style={style.profileHeader}><img style={{width: '100%',objectFit: 'cover',objectPosition: '50% 50%',height: '100%' }}src={pic.picture.large} /></div>
      <div className="profileInfo">
        <div>
          <p>Name: {pic.name.first} &nbsp;{pic.name.last}</p>
          </div>
        <div>
          <p><span>Dashboard Username:</span>&nbsp; &nbsp; {pic.login.username}</p>
          <p><span>dashboard Password:</span>&nbsp; &nbsp; {pic.login.password}</p>
          <p><b>{pic.email}</b></p>
          <p><b>{pic.phone}</b></p>
        </div>
          <div>
        </div>
      </div>
  </div>
      )
    });

      this.setState({profile:profile});
      console.log("state:", this.state.profile)
  })

   }
render(){


  return (
<div>
<Row gutter={24}>
    <Col  span={12} offset={6} className="infoCol" key="key12">
      {this.state.profile}
    </Col>


</Row>
</div>
  )
}

}



export default Profile
