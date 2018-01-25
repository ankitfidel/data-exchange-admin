import React, {PropTypes} from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
import reqwest from 'reqwest';

const axios = require('axios');
import cookie from 'react-cookies'
import { axiosrequest } from './axiosrequest';

import { browserHistory, hashHistory } from 'dva/router';
const data = [];


const styles = { textAlign:'left'}

function error(msg) {
  const modal = Modal.error({
    content: msg,
  });
}

class Adduseraddress extends React.Component {

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
        this.adduseraddressbtn = this.adduseraddressbtn.bind(this);

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

     adduseraddressbtn(){
  const user_id = cookie.load('user_id');
  //  const company_id = cookie.load('company_id');

       const cookies = cookie.load('sessionid');
       const address_line1 = document.getElementById('address_line1').value;
       const address_line2 = document.getElementById('address_line2').value;
       const city = document.getElementById('city').value;
       const state = document.getElementById('state').value;
       const country = document.getElementById('country').value;
       const zip_code = document.getElementById('zip_code').value;
       const address_name = document.getElementById('address_name').value;

       axios.post(axios.defaults.baseURL + '/api/front/address/user', {
        session_id:cookies,
        address_line1:address_line1,
        address_line2:address_line2,
        city:city,
        state:state,
        country:country,
        zip_code:zip_code,
        address_name:address_name,
        user_id:user_id,
       })
       .then(function (response) {
          if(response.data.status == false){
          //  alert()
          error(response.data.result)
            }else{
              console.log(JSON.stringify(response.data.result));
              hashHistory.push("/useraddress");
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

<Row>
    <Col span={12} offset={6}>

<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>Add user address</h2>
<Form>
<FormItem label="address_line1:">
    <Input placeholder="Enter name" defaultValue="" id="address_line1"/>
</FormItem>
<FormItem label="address_line2:">
    <Input placeholder="Enter address_line2" defaultValue="" id="address_line2"/>
</FormItem>
<FormItem label="city:">
    <Input placeholder="Enter city" defaultValue="" id="city"/>
</FormItem>
<FormItem label="state:">
    <Input placeholder="Enter state" defaultValue="" id="state"/>
</FormItem>
<FormItem label="country:">
    <Input placeholder="Enter country" defaultValue="" id="country"/>
</FormItem>
<FormItem label="zip_code:">
    <Input placeholder="Enter zip_code" defaultValue="" id="zip_code"/>
</FormItem>
<FormItem label="address_name:">
    <Input placeholder="Enter address_name" defaultValue="" id="address_name"/>
</FormItem>

       <FormItem>
          <Button type="primary" onClick={this.adduseraddressbtn}>Save</Button> &nbsp; &nbsp;
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

export default Adduseraddress
