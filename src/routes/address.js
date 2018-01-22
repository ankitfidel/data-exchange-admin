import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal, Switch, Radio, Form, Pagination } from 'antd'
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const FormItem = Form.Item;
import reqwest from 'reqwest';
import styles from './common.less'
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';


const data =[]
// <Button type="danger"   onClick={this.start}
//             disabled={!hasSelected}>Delete Company</Button>
//             <span style={{ marginLeft: 8 }}>
//             {hasSelected ? `Selected ${selectedRowKeys.length} Companies` : ''}
//           </span>

class Address extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        addressData: [{
          addressLine1:'',
          addressLine2:'',
          domain:'',
          city:'',
          state:'',
          country:'',
          zipCode:'',
          addressName:'',
          company_id:'',
          id:'',
               }],
           pagination: {},
           data:[],
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



      fetch = (params = {}) => {
        // console.log('params:', params);
        //  this.setState({ loading: true });
          var cookies = cookie.load('sessionid');
          var company_id = cookie.load('addresscompany');
          console.log("company_id:" + company_id)

          axios.get(axios.defaults.baseURL + '/dataexchange/api/front/address/company/' + cookies + '/' + company_id,{
            responseType: 'json'
          }).then(response => {
                this.setState({ addressData: response.data.result});
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
       browserHistory.push("/addaddress");
      }
      addressedit(id){
      //  console.log("company_id:" + company_id)
      //  var company_id = cookie.load('addresscompany');
      //  cookie.save('company_id', company_id);
        cookie.save('id', id);
        console.log("from cookies company_id:" + cookie.load('id'))
        browserHistory.push("/viewaddress")
      }
      address(company_id){
        alert(company_id)
      //  cookie.save('addresscompany', company_id);
        browserHistory.push("/addaddress")
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
  const { selectedRowKeys, addressData, company_id } = this.state;
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
<Card noHovering="false">

<Button type="primary" onClick={this.addaddress}>Add Address</Button> &nbsp; <br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true}} scroll={{ x: 768 }} rowKey="id" rowSelection={rowSelection} columns={[
  {
   title: 'address_line1',
   dataIndex: 'addressLine1',
 }, {
   title: 'address_line2',
   dataIndex: 'addressLine2',
 }, {
   title: 'city',
   dataIndex: 'city',
 },
 {
  title: 'state',
  dataIndex: 'state'
},
{
 title: 'country',
 dataIndex: 'country',
},
{
 title: 'zip_code',
 dataIndex: 'zipCode',
},
{
 title: 'address_name',
 dataIndex: 'addressName',
},

{
  title: 'Action',
  dataIndex: 'id',
  render: id => <div> <a href="javascript:void(0)" onClick={() => this.addressedit(id)}><i className="fa fa-address-card" title="edit address" aria-hidden="true"></i></a> </div>
}

]} dataSource={addressData}  />
         </Card>
       </div>
     );

}
}

export default Address
