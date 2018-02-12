import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col,Breadcrumb, Button,Card, Table, Modal, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
import reqwest from 'reqwest';
import cookie from 'react-cookies'
const axios = require('axios');
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';


const data = [];


const styles = { textAlign:'left'}
function checkbox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function error(msg) {
  const modal = Modal.error({
    content: msg
  });
}
class Viewusers extends React.Component {

  constructor(props) {
      super(props);
this.onTodoChange_username = this.onTodoChange_username.bind(this)
this.onTodoChange_password = this.onTodoChange_password.bind(this)
this.onTodoChange_first_name = this.onTodoChange_first_name.bind(this)
this.onTodoChange_last_name = this.onTodoChange_last_name.bind(this)
this.onTodoChange_email_id = this.onTodoChange_email_id.bind(this)

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
       user:'',
       selectedRowKeys: [],
username:'',
password:'',
first_name:'',
last_name:'',
email_id:'',

     }
viewUsers(){
  var cookies = cookie.load('sessionid');
  var user_id = cookie.load('user_id');
  //alert(user_id);
  axios.get(axios.defaults.baseURL + '/api/front/user/' + cookies + '/user_id/' + user_id,{
    responseType: 'json'
  }).then(response => {
    console.log(response.data.result)
  //  alert(response.data.result)
        this.setState({ user: response.data.result.first_name  });
    })
  .catch(function (error) {
    console.log(error);
  });

  axios.get(axios.defaults.baseURL + '/api/front/user/'+ cookies + '/user_id/' + user_id,{
    responseType: 'json'
  }).then(response => {
    var userdata = response.data.result;
    console.log( userdata.username)
        this.setState({username: userdata.username, email_id:userdata.email_id, password:userdata.password,first_name:userdata.first_name, last_name:userdata.last_name});
    })
  .catch(function (error) {
    console.log(error);
  });
}
updateUsers(){
//  alert("hii")

  var cookies = cookie.load('sessionid');
  const user_id = cookie.load('user_id');
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const last_name = document.getElementById('last_name').value;
  const first_name = document.getElementById('first_name').value;
  const email_id = document.getElementById('email_id').value;

  axios.put(axios.defaults.baseURL + '/api/front/user/'+user_id, {
   session_id:cookies,
   username:username,
   password:password,
   last_name:last_name,
   first_name:first_name,
   email_id:email_id,
  })
  .then(function (response) {
     if(response.data.status == false){
     //  alert()
     error(response.data.result)
       }else{
      //   console.log(JSON.stringify(response.data.result));
         hashHistory.push("/users");
       }
  })
  .catch(function (error) {
    console.log(error);
  });

}
componentDidMount(){
  this.viewUsers()

}
onTodoChange_username(value){
        this.setState({username: value});
    }

onTodoChange_password(value){
  this.setState({password: value});
}
  onTodoChange_first_name(value){
      this.setState({first_name: value });
  }
  onTodoChange_last_name(value){
    this.setState({ last_name: value });
    }
  onTodoChange_email_id(value){
      this.setState({email_id: value});
  }
  cancel(){
     hashHistory.push("/users");
  }


render(){
  document.title = "View User";
  var { selectedRowKeys, username, password, first_name,user, last_name,email_id,isRetailer } = this.state;

     return (
       <div>
       <Breadcrumb>
          <Breadcrumb.Item><a href="#/dashboard">Dashboard</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#/users">User</a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.user}</Breadcrumb.Item>
        </Breadcrumb><br />
<Row>
    <Col span={12} offset={6}>
<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>View user</h2>

   <FormItem label="Username:">
           <Input placeholder="username" value={username} id="username" onChange={e => this.onTodoChange_username(e.target.value)}/>

</FormItem>
<FormItem label="Password:">
        <Input placeholder="password" value={this.state.password} id="password" onChange={e => this.onTodoChange_password(e.target.value)}/>
    </FormItem>
    <FormItem label="First Name:">
        <Input placeholder="Enter First Name" value={this.state.first_name} id="first_name" onChange={e => this.onTodoChange_first_name(e.target.value)}/>
    </FormItem>
    <FormItem label="Last Name:">
        <Input placeholder="Enter Last Name"value={this.state.last_name} id="last_name" onChange={e => this.onTodoChange_last_name(e.target.value)}/>
    </FormItem>
    <FormItem label="E-mail:">
        <Input placeholder="Enter E-mail Id" value={this.state.email_id} id="email_id" onChange={e => this.onTodoChange_email_id(e.target.value)}/>
    </FormItem>




          <Button type="primary" onClick={this.updateUsers}>Update</Button> &nbsp; &nbsp;
          <Button onClick={this.cancel}>Back</Button>


 </Card>
    </Col>
  </Row>

       </div>
     );

}
}



export default Viewusers
