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

class Addcompany extends React.Component {

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
        this.addcompany = this.addcompany.bind(this);

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

     addcompany(){


       const cookies = cookie.load('sessionid');
       const name = document.getElementById('name').value;
       const domain = document.getElementById('domain').value;
       const supportEmailId = document.getElementById('supportEmailId').value;
       const websiteUrl = document.getElementById('websiteUrl').value;
       const logo = document.getElementById('logo').value;
       const isRetailer = document.getElementById('isRetailer').checked;

       axios.post(axios.defaults.baseURL + '/api/front/company', {
        session_id:cookies,
        name:name,
        domain:domain,
        support_email_id:supportEmailId,
        website_url:websiteUrl,
        logo:logo,
        is_retailer:isRetailer
       })
       .then(function (response) {
          if(response.data.status == false){
          //  alert()
          error(response.data.result)
            }else{
              console.log(JSON.stringify(response.data.result));
              hashHistory.push("/companies");
            }
       })
       .catch(function (error) {
         console.log(error);
       });


     }


render(){
  const { selectedRowKeys } = this.state;
     return (
       <div>
       <Breadcrumb>
          <Breadcrumb.Item><a href="#/dashboard">Dashboard</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#/companies"> Company </a></Breadcrumb.Item>
        </Breadcrumb><br />
<Row>
    <Col span={12} offset={6}>

<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>Add Company</h2>
<Form>
<FormItem label="Name:">
    <Input placeholder="Enter name" defaultValue="" id="name"/>
</FormItem>
<FormItem label="Domain:">
    <Input placeholder="Enter Domain" defaultValue="" id="domain"/>
</FormItem>
<FormItem label="Support Email Id:">
    <Input placeholder="Enter Support Email Id" defaultValue="" id="supportEmailId"/>
</FormItem>
<FormItem label="Website Url:">
    <Input placeholder="Enter Website Url" defaultValue="" id="websiteUrl"/>
</FormItem>
<FormItem label="Logo:">
    <Input placeholder="Enter Logo Url" defaultValue="" id="logo"/>
</FormItem>
<FormItem>
    <label>   <input type="checkbox" id="isRetailer" value="is Retailer" /> is Retailer</label>
</FormItem>
       <FormItem>
          <Button type="primary" onClick={this.addcompany}>Save</Button> &nbsp; &nbsp;
          <Button>Cancel</Button>
       </FormItem>
</Form>
 </Card>
    </Col>
  </Row>

       </div>
     );

}
}

export default Addcompany
