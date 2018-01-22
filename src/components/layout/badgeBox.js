import React from 'react'
import { Icon, Badge,Avatar  } from 'antd'
import { Link } from 'dva/router'
import styles from './BadgeBox.less'
import screenfull from 'screenfull';

const axios = require('axios');
import { browserHistory } from 'dva/router';

import cookie from 'react-cookies'
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
 axios.post('http://localhost:8080/dataexchange/api/logout', {
      session_id:cookies,
  })
  .then(function (response) {
   cookie.remove('sessionid');
   browserHistory.push("/login");
  })
  .catch(function (error) {
    console.log(error);
  });
     alert("Successfully Logout");
   window.location.href='/login'

 }
render(){
  return (
 <div className={styles.badgeBox} style={{ float: 'right','marginLeft':'50px'  }}>


     <Link onClick={this.fullScreen} className={styles.badge}>

          <Icon type="arrows-alt" className={styles.size}/>

      </Link>
      <Link onClick={this.loggout} className={styles.badge}>
        <Icon type="logout" title="Logout" className={styles.size}/>
       </Link>
    </div>

  )
}
}



export default BadgeBox
