import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Input, Checkbox } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
const InputGroup = Input.Group;
import reqwest from 'reqwest';
import cookie from 'react-cookies'
const axios = require('axios');
import { browserHistory , hashHistory} from 'dva/router';
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
class ViewuserAddress extends React.Component {

  constructor(props) {
      super(props);

      this.updateCompany = this.updateCompany.bind(this)
this.onTodoChange_address_line1 = this.onTodoChange_address_line1.bind(this)
this.onTodoChange_address_line2 = this.onTodoChange_address_line2.bind(this)
this.onTodoChange_city = this.onTodoChange_city.bind(this)
this.onTodoChange_state = this.onTodoChange_state.bind(this)
this.onTodoChange_country = this.onTodoChange_country.bind(this)
this.onTodoChange_zip_code = this.onTodoChange_zip_code.bind(this)
this.onTodoChange_address_name = this.onTodoChange_address_name.bind(this)
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
      address_line1:'',
      address_line2:'',
      city:'',
      state:'',
      country:'',
      zip_code:'',
      address_name:''

     }
viewCompany(){
  var cookies = cookie.load('sessionid');
  var company_id = cookie.load('company_id');
  var id = cookie.load('id');

  axios.get(axios.defaults.baseURL + '/api/front/address/'+ cookies +'/'+ id,{
    responseType: 'json'
  }).then(response => {
    var companydata = response.data.result;
    console.log( companydata)
        this.setState({address_line1: companydata.address_line1, country:companydata.country, address_line2:companydata.address_line2,city:companydata.city, state:companydata.state,zip_code:companydata.zip_code, address_name:companydata.address_name});
    })
  .catch(function (error) {
    console.log(error);
  });
}
updateCompany(){
  const cookies = cookie.load('sessionid');
  var id = cookie.load('id');
  const company_id = cookie.load('company_id');
  const addressLine1 = document.getElementById('address_line1').value;
  const address_line2 = document.getElementById('address_line2').value;
  const supportEmailId = document.getElementById('state').value;
  const websiteUrl = document.getElementById('city').value;
  const country = document.getElementById('country').value;
  const zip_code = document.getElementById('zip_code').value;
  const address_name = document.getElementById('address_name').value;
console.log(cookies)
  axios.put(axios.defaults.baseURL + '/api/front/address/'+id, {
   session_id:cookies,
   address_line1:addressLine1,
   address_line2:address_line2,
   state:supportEmailId,
   city:websiteUrl,
   country:country,
   zip_code:zip_code,
   address_name:address_name
  })

  .then(function (response) {
     if(response.data.status == false){
     error(response.data.result)
       }else{
         console.log(JSON.stringify(response.data.result));
      //   window.location.href= "/"
         hashHistory.push("/useraddress")
       }
  })
  .catch(function (error) {
    console.log(error);
  });

}
componentDidMount(){
  this.viewCompany()
}
onTodoChange_address_line1(value){
        this.setState({address_line1: value});
    }

onTodoChange_address_line2(value){
  this.setState({address_line2: value});
}
  onTodoChange_city(value){
      this.setState({city: value });
  }
  onTodoChange_state(value){
    this.setState({ state: value });
    }
  onTodoChange_country(value){
      this.setState({country: value});
  }
  onTodoChange_zip_code(value){
      this.setState({zip_code: value});
  }
  onTodoChange_address_name(value){
      this.setState({address_name: value});
  }
  cancel(){
     hashHistory.push("/useraddress");
  }
render(){
  var { selectedRowKeys, address_line1, address_line2, city, state,country,address_name,zip_code } = this.state;

     return (
       <div>

<Row>
    <Col span={12} offset={6}>
<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>View Company</h2>

   <FormItem label="address_line1:">
           <Input placeholder="address_line1" value={address_line1} id="address_line1" onChange={e => this.onTodoChange_address_line1(e.target.value)}/>

</FormItem>
<FormItem label="address_line2:">
        <Input placeholder="address_line2" value={this.state.address_line2} id="address_line2" onChange={e => this.onTodoChange_address_line2(e.target.value)}/>
    </FormItem>
    <FormItem label="city:">
        <Input placeholder="city" value={this.state.city} id="city" onChange={e => this.onTodoChange_city(e.target.value)}/>
    </FormItem>
    <FormItem label="state:">
        <Input placeholder="state"value={this.state.state} id="state" onChange={e => this.onTodoChange_state(e.target.value)}/>
    </FormItem>
    <FormItem label="country:">
        <Input placeholder="country" value={this.state.country} id="country" onChange={e => this.onTodoChange_country(e.target.value)}/>
    </FormItem>
    <FormItem label="zip_code:">
        <Input placeholder="zip_code" value={this.state.zip_code} id="zip_code" onChange={e => this.onTodoChange_zip_code(e.target.value)}/>
    </FormItem>
    <FormItem label="address_name:">
        <Input placeholder="address_name" value={this.state.address_name} id="address_name" onChange={e => this.onTodoChange_address_name(e.target.value)}/>
    </FormItem>


          <Button type="primary" onClick={this.updateCompany}>Update</Button> &nbsp; &nbsp;
          <Button onClick={this.cancel}>Back</Button>


 </Card>
    </Col>
  </Row>

       </div>
     );

}
}



export default ViewuserAddress
