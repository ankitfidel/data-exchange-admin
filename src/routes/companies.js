import React from 'react'
import {Menu, Icon, Popover,message, Badge, M,Avatar,Row, Breadcrumb,  Col, Button,Card, Table, Modal, Switch, Radio,Popconfirm, Form, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';


const data =[]
// <Button type="danger"   onClick={this.start}
//             disabled={!hasSelected}>Delete Company</Button>
//             <span style={{ marginLeft: 8 }}>
//             {hasSelected ? `Selected ${selectedRowKeys.length} Companies` : ''}
//           </span>
function cancel(e) {
  console.log(e);
  message.info('Company not deleted');
}
class Companies extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        tableData: [{
          name:'',
          logo:'',
          domain:'',
          website_url:'',
          support_email_id:'',
          company_id:'',
          is_retailer:'',
               }],
           pagination: {},
           data:[],
           result:[],
           loading: false,
           popover:false,
           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll()
      };
      this.start = this.start.bind(this)
   }




     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }



      fetch = (params = {}) => {
        // console.log('params:', params);
        //  this.setState({ loading: true });
          var cookies = cookie.load('sessionid');
          axios.get(axios.defaults.baseURL + '/api/front/company/' + cookies,{
            responseType: 'json'
          }).then(response => {
                this.setState({ tableData: response.data.result});
            })
          .catch(function (error) {
            console.log(error);
          });

     }

     handleTableChange = (pagination, filters, sorter) => {
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
          pagination: pager,
        });
        this.fetch({
          result: pagination.pageSize,
          page: pagination.current,
          sortField: sorter.field,
          sortOrder: sorter.order,
          ...filters,
        });
      }
      componentDidMount() {
       this.fetch();
  }
      addcompany() {
      //  alert()
       hashHistory.push("/addcompany");
      }
      companyedit(company_id){
        console.log("company_id:" + company_id)
        cookie.save('editCompanyId', company_id);
        console.log("from cookies company_id:" + cookie.load('editCompanyId'))
          hashHistory.push("/viewcompanies")

      }
      address(company_id){
        cookie.save('addresscompany', company_id);
        hashHistory.push("/address")
      }
      start(company_id) {
   this.setState({ loading: true });
   // ajax request after empty completing
   var cookies = cookie.load('sessionid');

   axios.delete(axios.defaults.baseURL + '/api/front/company/'+ cookies +'/'+company_id, {
     company_id:company_id
   })
   .then(function (response) {
      if(response.data.status == false){
      //  alert()
      error(response.data.result)
        }else{
       //   console.log(JSON.stringify(response.data.result));
         // browserHistory.push("/users");
       window.location.reload();
        }
   })
   .catch(function (error) {
     console.log(error);
   });
   setTimeout(() => {
     this.setState({
       selectedRowKeys: [],
       loading: false,
     });
   }, 1000);
 }
      onSelectChange = (selectedRowKeys) => {
          console.log('selectedRowKeys changed: ', selectedRowKeys);
          this.setState({ selectedRowKeys });
    //  alert();
        }
        handleVisibleChange = (popover) => {
           this.setState({ popover });
         }

         canceldel = () => {
           this.setState({
             popover: false,
           });
         }
render(){
  const { selectedRowKeys, tableData, company_id } = this.state;
  const rowSelection = {
       selectedRowKeys,
       onChange: this.onSelectChange,
       hideDefaultSelections: true,
       selections: [{
         key: 'all-data',
         text: 'Select All Data',
         onSelect: () => {
           this.setState({
             selectedRowKeys: [...Array(46).keys()], // 0...45
           });
         },
       }, {
         key: 'odd',
         text: 'Select Odd Row',
         onSelect: (changableRowKeys) => {
           let newSelectedRowKeys = [];
           newSelectedRowKeys = changableRowKeys.filter((key, index) => {
             if (index % 2 !== 0) {
               return false;
             }
             return true;
           });
           this.setState({ selectedRowKeys: newSelectedRowKeys });
         },
       }, {
         key: 'even',
         text: 'Select Even Row',
         onSelect: (changableRowKeys) => {
           let newSelectedRowKeys = [];
           newSelectedRowKeys = changableRowKeys.filter((key, index) => {
             if (index % 2 !== 0) {
               return true;
             }
             return false;
           });
           this.setState({ selectedRowKeys: newSelectedRowKeys });
         },
       }],
       onSelection: this.onSelection,
     };
const hasSelected = selectedRowKeys.length > 0;
     return (
       <div>
       <Breadcrumb>
          <Breadcrumb.Item><a href="#/dashboard">Dashboard  </a></Breadcrumb.Item>
        </Breadcrumb><br />
<Card noHovering="false">

<Button type="primary" onClick={this.addcompany}>Add Company</Button> &nbsp; <br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 768 }} rowKey="company_id" columns={[
   {
     title: 'Logo',
     dataIndex: 'logo',
     className: styles.logo,
     render: logo => <img src={logo} />,

   },{
   title: 'Name',
   dataIndex: 'name',
 }, {
   title: 'Domain',
   dataIndex: 'domain',
 }, {
   title: 'Website Url',
   dataIndex: 'website_url',
 },
 {
  title: 'Support Email Id',
  dataIndex: 'support_email_id'
},
{
 title: 'Is Retailer',
 dataIndex: 'is_retailer',
  render: is_retailer => <p>{is_retailer === true ? "yes" :"no"}</p>
},
{
  title: 'Action',

  dataIndex: 'company_id',
  render: company_id => <div> <Popconfirm title="Are you sure delete this company?" onConfirm={() => this.start(company_id)} onCancel={cancel} okText="Yes" cancelText="No">
    <a href="#"><Icon type="delete" /> &nbsp;Delete company</a>
  </Popconfirm>
&nbsp;&nbsp;|&nbsp;&nbsp; <a href="javascript:void(0)" onClick={() => this.companyedit(company_id)}><i className="fa fa-pencil" title="Edit Company" aria-hidden="true"></i>&nbsp; Edit</a> &nbsp;&nbsp;| &nbsp;&nbsp;<a href="javascript:void(0)" onClick={() => this.address(company_id)}><i className="fa fa-address-card" title="View address" aria-hidden="true"></i>&nbsp; Address</a></div>
}

]} dataSource={tableData}  />
         </Card>
       </div>
     );

}
}

export default Companies
