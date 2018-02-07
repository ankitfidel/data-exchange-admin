import React from 'react'
import { Icon, Badge,Avatar, Menu  } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import screenfull from 'screenfull';
import { axiosrequest } from '../../routes/axiosrequest';
const axios = require('axios');
import { browserHistory, hashHistory } from 'dva/router';

import cookie from 'react-cookies'

var username = cookie.load('username');
class BadgeBox extends React.Component {

   constructor(props) {
      super(props);
   }

  fullScreen(){
   if(screenfull.isFullscreen){
     screenfull.exit();
   }else{
     screenfull.request();
   }
 }
 loggout(){
   var cookies = cookie.remove('sessionid');
   // const username = document.getElementById('username').value;
   // const password = document.getElementById('password').value;
 axios.post(axios.defaults.baseURL + '/api/logout', {
      session_id:cookies,
  })
  .then(function (response) {
   cookie.remove('sessionid', { path: '/' });
  // alert(cookies)
  // hashHistory.push("/login");
    window.location.href = ("#/login");
  //window.location.reload()
  })
  .catch(function (error) {
    console.log(error);
  });
  //   alert("Successfully Logout");
  // window.location.href='/login'

 }
 profile(){
   hashHistory.push("/profile");
 }
render(){
  return (
 <div className={styles.badgeBox} style={{ float: 'right','marginLeft':'50px'  }}>

 <Menu mode="horizontal" style={{'background':'#fc3d66', 'zIndex': 999}}>

         <Menu.Item onClick={this.fullScreen}  className={styles.badge}><Icon style={{ 'color':'white'}} type="arrows-alt" title="Full Screen" className={styles.size}/></Menu.Item>

        <SubMenu  title={<p style={{'textTransform': 'none','color':'white'}}><Icon type="user" /><span style={{'textOverflow':'ellipsis'}}>{username} </span><Icon style={{'float': 'right','margin':'15px 20px 0 10px'}} type="down" /></p>}>
          <Menu.Item><a onClick={this.profile} className={styles.logoutbtn}>Profile</a></Menu.Item>
            <Menu.Item><a onClick={this.loggout} className={styles.logoutbtn}>Logout</a></Menu.Item>

        </SubMenu>
        </Menu>

    </div>

  )
}
}



export default BadgeBox
