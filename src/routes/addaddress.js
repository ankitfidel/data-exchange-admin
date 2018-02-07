import React, {PropTypes} from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Breadcrumb, Button,Card, Table, Modal, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
import reqwest from 'reqwest';

import { axiosrequest } from './axiosrequest';
const axios = require('axios');
import cookie from 'react-cookies'

import { browserHistory, hashHistory } from 'dva/router';
const data = [];


const styles = { textAlign:'left'}

function error(msg) {
  const modal = Modal.error({
    content: msg,
  });
}

class Addaddress extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          visible: false ,
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
          isRetailer:'',

          selectedRowKeys: [],
          cookies: cookie.loadAll()
        }
        this.addaddress = this.addaddress.bind(this);

   }



     // axios.post('/user', {
     //     firstName: 'Fred',
     //     lastName: 'Flintstone'
     //   })

     //   .then(function (response) {
     //     console.log(response);
     //   })
     //   .catch(function (error) {
     //     console.log(error);
     //   });

     addaddress(){
  const company_id = cookie.load('company_id');
       const cookies = cookie.load('sessionid');
       const address_line1 = document.getElementById('address_line1').value;
       const address_line2 = document.getElementById('address_line2').value;
       const city = document.getElementById('city').value;
       const state = document.getElementById('state').value;
       const country = document.getElementById('country').value;
       const zip_code = document.getElementById('zip_code').value;
       const address_name = document.getElementById('address_name').value;

       axios.post(axios.defaults.baseURL + '/api/front/address/company', {
        session_id:cookies,
        address_line1:address_line1,
        address_line2:address_line2,
        city:city,
        state:state,
        country:country,
        zip_code:zip_code,
        address_name:address_name,
        company_id:company_id
       })
       .then(function (response) {
          if(response.data.status == false){
          //  alert()
          error(response.data.result)
            }else{
              console.log(JSON.stringify(response.data.result));
              hashHistory.push("/address");
            }
       })
       .catch(function (error) {
         console.log(error);
       });


     }
     cancel(){
        hashHistory.push("/useraddress");
     }

render(){
  const { selectedRowKeys } = this.state;
     return (
       <div>
       <Breadcrumb>
          <Breadcrumb.Item><a href="#/dashboard">Dashboard</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#/address"> Address </a></Breadcrumb.Item>
        </Breadcrumb><br />
<Row>
    <Col span={12} offset={6}>

<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>Add Address</h2>
<Form>
<FormItem label="Address Line 1:">
    <Input placeholder="Enter Address Line1" defaultValue="" id="address_line1"/>
</FormItem>
<FormItem label="Address Line 2:">
    <Input placeholder="Enter Address Line 2" defaultValue="" id="address_line2"/>
</FormItem>
<FormItem label="City:">
    <Input placeholder="Enter City" defaultValue="" id="city"/>
</FormItem>
<FormItem label="State:">
    <Input placeholder="Enter State" defaultValue="" id="state"/>
</FormItem>
<FormItem label="Country:">
    <Input placeholder="Enter Country" defaultValue="" id="country"/>
</FormItem>
<FormItem label="Zip Code:">
    <Input placeholder="Enter Zip Code" defaultValue="" id="zip_code"/>
</FormItem>
<FormItem label="Address Name:">
    <Input placeholder="Enter Address Name" defaultValue="" id="address_name"/>
</FormItem>

       <FormItem>
          <Button type="primary" onClick={this.addaddress}>Save</Button> &nbsp; &nbsp;
          <Button onClick={this.cancel}>Back</Button>
       </FormItem>
</Form>
 </Card>
    </Col>
  </Row>

       </div>
     );

}
}

export default Addaddress
