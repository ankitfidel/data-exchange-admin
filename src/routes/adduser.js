import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal,Select, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const Option = Select.Option;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';

import { browserHistory } from 'dva/router';
const data = [];


function checkbox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
function error(msg) {
  const modal = Modal.error({
    content: msg,
  });
}
class Addusers extends React.Component {

  constructor(props) {
      super(props);
   }

   state = {
     companyId:'',
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


     componentDidMount() {
      this.fetch();

   }

   fetch = (params = {}) => {
     // console.log('params:', params);
     //  this.setState({ loading: true });
       var cookies = cookie.load('sessionid');
       axios.get(axios.defaults.baseURL + '/dataexchange/api/front/company/' + cookies,{
         responseType: 'json'
       }) .then(response => {
          let comapnyrole = response.data.result.map((pic,i) => {
            return(
       <option key={i.toString()} value={pic.company_id}>{pic.name}</option>
            )
          })
            this.setState({comapnyrole:comapnyrole});
          //  console.log("state:", this.state.comapnyrole[4].props.children)
        })
       .catch(function (error) {
         console.log(error);
       })
   }
   addusers(){
        const cookies = cookie.load('sessionid');
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const emailId = document.getElementById('emailId').value;
        const userRoleId = document.getElementById('userRoleId').value;
       const companyId = document.getElementById('selectedCompanyId').value;
//console.log(this.state.comapnyrole[4]);
    //   const isRetailer = document.getElementById('isRetailer').checked = true;
        axios.post(axios.defaults.baseURL + '/dataexchange/api/front/user', {
         session_id:cookies,
         username:username,
         password:password,
         first_name:firstName,
         last_name:lastName,
         email_id:emailId,
         user_role_id:userRoleId,
         company_id:companyId
       //  isRetailer:isRetailer
        })
        .then(function (response) {
      //   alert(JSON.stringify(response));
          if(response.data.status == false){
         error(response.data.result)
            }else{
          //    console.log(JSON. stringify(response.data.result));
            //  alert("user added")
            //  console.log(JSON.stringify(response.data.result));
            //  console.log(cookies);
          browserHistory.push("/users");
         }

        })
        .catch(function (error) {
          console.log(error);
        });
      }

render(){
  const { selectedRowKeys,companyId  } = this.state;


     return (
       <div>

<Row>
    <Col span={12} offset={6}>
<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>Add User</h2>
       <FormItem label="Username:">
           <Input placeholder="Enter Username" defaultValue="" id="username"/>
       </FormItem>
       <FormItem label="Password:">
           <Input placeholder="Enter Password" defaultValue="" id="password"/>
       </FormItem>
       <FormItem label="first Name:">
           <Input placeholder="Enter First Name" defaultValue="" id="firstName"/>
       </FormItem>
       <FormItem label="Last Name:">
           <Input placeholder="Enter Last Name" defaultValue="" id="lastName"/>
       </FormItem>
       <FormItem label="Email Id:">
           <Input placeholder="Enter Email Id" defaultValue="" id="emailId"/>
       </FormItem>


    <FormItem label="User Role:">
    <select style={{ width: 200  }} className={styles.selectopt} id="userRoleId">
   <option  className={styles.optioncus} value="3">dashboard user</option>
   <option className={styles.optioncus} value="2">dashboard admin</option>
 </select>
    </FormItem>

       <FormItem label="Company Id:">
       <select id= "selectedCompanyId" className={styles.selectopt} style= {{ width :200}}>
    { this.state.comapnyrole }
      </select>
       </FormItem>



       <FormItem>
          <Button type="primary" onClick={this.addusers}>Save</Button> &nbsp; &nbsp;
          <Button>Cancel</Button>
       </FormItem>

 </Card>
    </Col>
  </Row>

       </div>
     );

}
}



export default Addusers
