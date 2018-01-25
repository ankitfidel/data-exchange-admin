import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal,Select, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import reqwest from 'reqwest';
import styles from './login.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';
import { config } from '../utils'
import { browserHistory, hashHistory } from 'dva/router';
const data = [];


function checkbox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
function error(msg) {
  //alert()
  const modal = Modal.error({
    content: msg
  });
}


function signup(){
hashHistory.push("/signup")
}
class Loginpage extends React.Component {

  constructor(props) {
      super(props);

      this.state= {
        errormsg:'',
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

          selectedRowKeys: [],
          cookies: cookie.loadAll()
        }
        this.handleOk = this.handleOk.bind(this)
   }



     handleOk () {
       const username = document.getElementById('username').value;
       const password = document.getElementById('password').value;
       var myDate = new Date();
             var timezone = myDate.getTimezoneOffset();
           //   alert(axios.defaults.baseURL);
           axios.post(axios.defaults.baseURL + '/dataexchange/api/authenticate', {
             credentials: 'credentials',
             username:username,
             password:password,
             timezoneOffset:timezone
         })
         .then(response => {
           const sessionid = response.data.result.session_id;
           const company_id = response.data.result.company_id;
           const user_role = response.data.result.user_role;
         //   const sidebarcolor = response.data.result.theme.sidebar_color_class;
         // const headercolor =  response.data.result.theme.header_color_class;
         //   const content1 =  response.data.result.theme.content_1;
         //   const content2 =  response.data.result.theme.content_2;

           if(response.data.status == false){
             //alert(response.data.result)
          //  var errormsg = response.data.result;
          //   alert(errormsg)
          this.setState({errormsg:response.data.result})
          //   error()
           //info()
           }else{
            // alert(response.data.result.user_role)
          const sessionid = response.data.result.session_id;
          const user_role = response.data.result.user_role;
          console.log("sessionid"+sessionid);
          cookie.save('sessionid', sessionid, { path: '/' });
          cookie.save('user_role', user_role, { path: '/' })
           hashHistory.push("/dashboard");
          console.log(JSON.stringify(response));
           }


         })
         .catch(function (error) {
           console.log(error);
         });
     }


render(){
  var { selectedRowKeys,companyId, errormsg  } = this.state;


     return (
          <div className={styles.bg}>
       <div className={styles.form}>
         <div className={styles.logo}>
           <img src="assets/login-logo.png" />
         </div>
         <form>
        <span style={{'text-align': 'center', 'text-transform' : 'capitalize','display': 'block','margin-bottom': '20px', 'color': 'red', 'font-size': '12px'}}> { this.state.errormsg } </span>
           <FormItem hasFeedback label="Username">
             <Input size='large' onPressEnter={this.handleOk} id="username" placeholder='Username' />
           </FormItem>
           <FormItem hasFeedback label="password">
            <Input size='large' type='password' id="password" onPressEnter={this.handleOk} placeholder='Password' />
           </FormItem>
           <Row>
             <Button type='primary' size='large' onClick={this.handleOk}>
               Login
             </Button>
           </Row>
           <br />
          <Button type='primary' size='large' onClick={signup}>
            Signup
          </Button>
         </form>
       </div>
       </div>
     );

}
}



export default Loginpage
