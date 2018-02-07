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

import { browserHistory, hashHistory } from 'dva/router';
const data = [];


function checkbox(e) {
  console.log(`checked = ${e.target.checked}`);
}
function handleChange(value) {
  console.log(`selected ${value}`);
}
function error(msg) {
  const modal = Modal.error({
    content: msg
  });
}
class Viewdevices extends React.Component {

  constructor(props) {
      super(props);
      this.onTodoChange_device_name = this.onTodoChange_device_name.bind(this)
      this.onTodoChange_device_port = this.onTodoChange_device_port.bind(this)
      this.onTodoChange_device_ip = this.onTodoChange_device_ip.bind(this)
      this.onTodoChange_group_id = this.onTodoChange_group_id.bind(this)
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
       selectedRowKeys: [],
       cookies: cookie.loadAll()
     }


     componentDidMount() {
    //  this.fetchcompany();
    var cookies = cookie.load('sessionid');
    var company_id = cookie.load('company_id');
    axios.get(axios.defaults.baseURL + '/dataexchange/api/front/group/' + cookies + '/company/' + company_id,{
      responseType: 'json'
    }) .then(response => {
       let grouplist = response.data.result.map((group,i) => {
         return(
    <option key={i.toString()} value={group.id}>{group.name}</option>
         )
       })
         this.setState({grouplist:grouplist});
       //  console.log("state:", this.state.grouplist[4].props.children)
     })
    .catch(function (error) {
      console.log(error);
    })


    var cookies = cookie.load('sessionid');
    var device_id = cookie.load('deviceid');
  //  alert("device_id"+device_id)
    axios.get(axios.defaults.baseURL + '/dataexchange/api/front/device/' + cookies +'/'+ device_id,{
      responseType: 'json'
    }).then(response => {
      var companydata = response.data.result;
      console.log( "device edit"+ JSON.stringify(response.data.result))
          this.setState({device_name: companydata.device_name, device_ip:companydata.device_ip, device_port:companydata.device_port});
      })
    .catch(function (error) {
      console.log(error);
    });
   }

   // fetchcompany = (params = {}) => {
   //   // console.log('params:', params);
   //   //  this.setState({ loading: true });
   //     var cookies = cookie.load('sessionid');
   //     axios.get('http://localhost:8080/dataexchange/api/front/company/' + cookies,{
   //       responseType: 'json'
   //     }) .then(response => {
   //        let grouplist = response.data.result.map((pic,i) => {
   //          return(
   //     <option id="companyId" key={i.toString()} value={pic.company_id}>{pic.name}</option>
   //          )
   //        })
   //          this.setState({grouplist:grouplist});
   //          console.log("state:", this.state.grouplist)
   //      })
   //     .catch(function (error) {
   //       console.log(error);
   //     })
   //
   // <FormItem label="devicekey:">
    //     <Input placeholder="devicekey" defaultValue="" id="devicekey"/>
    // </FormItem>
   //
   //
   // }
   cancelDevices(){
      hashHistory.push("/devices");
   }
   updatedevices(){
        const cookies = cookie.load('sessionid');
        var device_id = cookie.load('deviceid');
        const devicename = document.getElementById('devicename').value;
        const port = document.getElementById('port').value;
        const ip = document.getElementById('ip').value;
        const groupid = document.getElementById('selectedGroupId').value;
       // const isRetailer = document.getElementById('isRetailer').checked = true;
        axios.put(axios.defaults.baseURL + '/dataexchange/api/front/device/'+ device_id, {
         session_id:cookies,
         device_name:devicename,
         device_port:port,
         is_connected:false,
         group_id:groupid,
         device_ip:ip,
      //   company_id:companyId
       //  isRetailer:isRetailer
        })
        .then(function (response) {
           if(response.data.status == false){
             //alert()
           error(response.data.result)
         }
         if(response.data.status == true){
               console.log(JSON.stringify(response.data.result));
               hashHistory.push("#/devices");
             }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      onTodoChange_device_name(value){
        this.setState({device_name: value});
      }
      onTodoChange_device_port(value){
        this.setState({device_port: value});
      }
      onTodoChange_device_ip(value){
        this.setState({device_ip: value});
      }
      onTodoChange_group_id(value){
        this.setState({group_id: value});
      }

render(){
  const { selectedRowKeys,companyId, device_ip, device_name, device_port  } = this.state;


     return (
       <div>

<Row>
    <Col span={12} offset={6} xs={24} sm={24} md={12}>
<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>View Device</h2>

       <FormItem label="Device Name:">
           <Input placeholder="Enter device Name.." value={this.state.device_name} id="devicename" onChange={e => this.onTodoChange_device_name(e.target.value)}/>
       </FormItem>
       <FormItem label="Port:">
           <Input placeholder="Enter Port.."  value={this.state.device_port} id="port"  onChange={e => this.onTodoChange_device_port(e.target.value)}/>
       </FormItem>
       <FormItem label="IP:">
           <Input placeholder="ip"  value={this.state.device_ip} id="ip" onChange={e => this.onTodoChange_device_ip(e.target.value)}/>
       </FormItem>
       <FormItem label="Select Groups:">
       <select id= "selectedGroupId" className={styles.selectopt} style= {{ width :200}}  onChange={e => this.onTodoChange_group_id(e.target.value)}>
    { this.state.grouplist }
      </select>
       </FormItem>




       <FormItem>
          <Button type="primary" onClick={this.updatedevices}>Save</Button> &nbsp; &nbsp;
          <Button onClick={this.cancelDevices}>Back</Button>
       </FormItem>

 </Card>
    </Col>
  </Row>

       </div>
     );

}
}



export default Viewdevices
