import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Breadcrumb, Col, Button,Card, Table, Modal, Switch, Radio, Form, Input, Checkbox } from 'antd'
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
class ViewCompanies extends React.Component {

  constructor(props) {
      super(props);
this.onTodoChange_companyName = this.onTodoChange_companyName.bind(this)
this.onTodoChange_domain = this.onTodoChange_domain.bind(this)
this.onTodoChange_website_url = this.onTodoChange_website_url.bind(this)
this.onTodoChange_support_email_id = this.onTodoChange_support_email_id.bind(this)
this.onTodoChange_logo = this.onTodoChange_logo.bind(this)
this.onTodoChange_isRetailer = this.onTodoChange_isRetailer.bind(this)

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
       company_name:'',
       scroll: true,
       selectedRowKeys: [],
companyName:'',
domain:'',
website_url:'',
support_email_id:'',
logo:'',
is_retailer:''

     }
viewCompany(){
  var cookies = cookie.load('sessionid');
  var company_id = cookie.load('editCompanyId');
//  alert(company_id);
axios.get(axios.defaults.baseURL + '/api/front/company/' + cookies + '/' + company_id,{
  responseType: 'json'
}).then(response => {

    //  alert(response.data.result)
      this.setState({ company_name: response.data.result.name});
  })
.catch(function (error) {
  console.log(error);
});

  axios.get(axios.defaults.baseURL + '/api/front/company/' + cookies +'/'+ company_id,{
    responseType: 'json'
  }).then(response => {
    var companydata = response.data.result;
    console.log( companydata.name)
        this.setState({companyName: companydata.name, logo:companydata.logo, domain:companydata.domain,website_url:companydata.website_url, support_email_id:companydata.support_email_id, is_retailer:companydata.is_retailer});
    })
  .catch(function (error) {
    console.log(error);
  });
}
updateCompany(){
  const cookies = cookie.load('sessionid');
  const editCompanyId = cookie.load('editCompanyId');
  const name = document.getElementById('companyName').value;
  const domain = document.getElementById('domain').value;
  const supportEmailId = document.getElementById('support_email_id').value;
  const websiteUrl = document.getElementById('website_url').value;
  const logo = document.getElementById('logo').value;
  const isRetailer = document.getElementById('isRetailer').checked;

  axios.put(axios.defaults.baseURL + '/api/front/company/'+editCompanyId, {
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
componentDidMount(){
  this.viewCompany()
}
onTodoChange_companyName(value){
        this.setState({companyName: value});
    }

onTodoChange_domain(value){
  this.setState({domain: value});
}
  onTodoChange_website_url(value){
      this.setState({website_url: value });
  }
  onTodoChange_support_email_id(value){
    this.setState({ support_email_id: value });
    }
  onTodoChange_logo(value){
      this.setState({logo: value});
  }
  onTodoChange_isRetailer(event){
  //    this.setState({isRetailer: !value});
  //console.log('handleChange',+ this.state.is_retailer.checked); // Never gets logged
  console.log(event);
  this.setState({is_retailer: event})
  }
  cancel(){
     hashHistory.push("/companies");
  }

render(){
  document.title = "View Companies";
  var { selectedRowKeys, companyName, domain,company_name, website_url, support_email_id,logo,isRetailer } = this.state;

     return (
       <div>
       <Breadcrumb>
          <Breadcrumb.Item><a href="#/dashboard">Dashboard</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#/companies">Company </a></Breadcrumb.Item>
          <Breadcrumb.Item>{this.state.company_name}</Breadcrumb.Item>
        </Breadcrumb><br />
<Row>
    <Col span={12} offset={6}>
<Card noHovering="false">
<h2 style={{textAlign: 'center'}}>View Company</h2>

   <FormItem label="companyName:">
           <Input placeholder="companyName" value={companyName} id="companyName" onChange={e => this.onTodoChange_companyName(e.target.value)}/>

</FormItem>
<FormItem label="domain:">
        <Input placeholder="domain" value={this.state.domain} id="domain" onChange={e => this.onTodoChange_domain(e.target.value)}/>
    </FormItem>
    <FormItem label="website_url:">
        <Input placeholder="website_url" value={this.state.website_url} id="website_url" onChange={e => this.onTodoChange_website_url(e.target.value)}/>
    </FormItem>
    <FormItem label="support_email_id:">
        <Input placeholder="support_email_id"value={this.state.support_email_id} id="support_email_id" onChange={e => this.onTodoChange_support_email_id(e.target.value)}/>
    </FormItem>
    <FormItem label="logo:">
        <Input placeholder="logo" value={this.state.logo} id="logo" onChange={e => this.onTodoChange(e.target.value)}/>
    </FormItem>

    <FormItem>
    <input type="checkbox" id="isRetailer" onChange={e => this.onTodoChange_isRetailer(e.target.checked)} checked={this.state.is_retailer} />Is Reseller

    </FormItem>


          <Button type="primary" onClick={this.updateCompany}>Update</Button> &nbsp; &nbsp;
          <Button  onClick={this.cancel}>Back</Button>


 </Card>
    </Col>
  </Row>

       </div>
     );

}
}



export default ViewCompanies
