import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col,Breadcrumb, Button,Card, Table, Modal, Switch, Radio, Form, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

const columnsAddress= [
 {
  title: 'Address Line 1',
  dataIndex: 'address_line1',
}, {
  title: 'Address Line 2',
  dataIndex: 'address_line2',
}, {
  title: 'City',
  dataIndex: 'city',
},
{
 title: 'State',
 dataIndex: 'state'
},
{
title: 'Country',
dataIndex: 'country',
},
{
title: 'Zip Code',
dataIndex: 'zip_code',
},
{
title: 'Address Name',
dataIndex: 'address_name',
},

{
 title: 'Action',
 dataIndex: 'id',
 render: id => <div> <a href="javascript:void(0)" onClick={() => this.addressedit(id)}><i className="fa fa-address-card" title="edit address" aria-hidden="true"></i></a> </div>
}

]
const data =[]
// <Button type="danger"   onClick={this.start}
//             disabled={!hasSelected}>Delete Company</Button>
//             <span style={{ marginLeft: 8 }}>
//             {hasSelected ? `Selected ${selectedRowKeys.length} Companies` : ''}
//           </span>

  var addresscompany = cookie.load("addresscompany")
class Address extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        addressData: [{
          address_line1:'',
          address_line2:'',
          domain:'',
          city:'',
          state:'',
          country:'',
          zip_code:'',
          address_name:'',
          company_id:'',
          id:'',
               }],
           pagination: {},
           data:[],
           addresscompany:'',
           company_name:'',
           result:[],

           loading: false,

           pagination: {},
           size: 'default',
           selectedRowKeys: [],
           cookies: cookie.loadAll(),
      };
   }



     onSelectChange = (selectedRowKeys) => {
       console.log('selectedRowKeys changed: ', selectedRowKeys);
       this.setState({ selectedRowKeys });
     }



      fetch = () => {
        // console.log('params:', params);
        //  this.setState({ loading: true });
          var cookies = cookie.load('sessionid');
          var company_id = cookie.load('addresscompany');
          console.log("company_id:" + company_id)

          axios.get(axios.defaults.baseURL + '/api/front/company/' + cookies + '/' + company_id,{
            responseType: 'json'
          }).then(response => {

              //  alert(response.data.result)
                this.setState({ company_name: response.data.result.name});
            })
          .catch(function (error) {
            console.log(error);
          });

          axios.get(axios.defaults.baseURL + '/api/front/address/company/' + cookies + '/' + company_id,{
            responseType: 'json'
          }).then(response => {
                this.setState({ addressData: response.data.result});
            //    alert(response.data.result)
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
      addaddress() {
      //  alert()
       hashHistory.push("/addaddress");
      }
      addressedit(id){
      //  console.log("company_id:" + company_id)
      //  var company_id = cookie.load('addresscompany');
      //  cookie.save('company_id', company_id);
        cookie.save('id', id);
        console.log("from cookies company_id:" + cookie.load('id'))
        hashHistory.push("/viewaddress")
      }
      address(company_id){
      //  alert(company_id)
      //  cookie.save('addresscompany', company_id);
        hashHistory.push("/addaddress")
      }
      start = () => {
   this.setState({ loading: true });
   // ajax request after empty completing
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
render(){
  const { selectedRowKeys, addressData,addresscompany, company_id } = this.state;

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
          <Breadcrumb.Item><a href="#/dashboard">Dashboard</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="#/companies">Company: {this.state.company_name} </a></Breadcrumb.Item>
        </Breadcrumb><br />
<Card noHovering="false">

<Button type="primary" onClick={this.addaddress}>Add Address</Button> &nbsp; <br /><br />
 <Table  pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 768 }} rowKey="id" columns={columnsAddress} dataSource={addressData}  />
         </Card>
       </div>
     );

}
}

export default Address
