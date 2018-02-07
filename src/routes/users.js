import React from 'react'
import {Menu, Icon, Popover,Layout, Badge,message,Breadcrumb, M,Avatar,Row, Col,Popconfirm, Button,Card, Table, Modal, Input} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;
const axios = require('axios');
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';
// <Button type="danger"   onClick={this.start}
//         disabled={!hasSelected}>Delete Company</Button>
//         <span style={{ marginLeft: 8 }}>
//         {hasSelected ? `Selected ${selectedRowKeys.length} Companies` : ''}
//       </span>
function cancel(e) {
  console.log(e);
  message.info('User not deleted');
}
const data = []
for (let i = 0; i < 100; i++) {
  data.push({
    key: i.toString(),
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
  });
}
const EditableCell = ({ editable, value, onChange }) => (
<div>
  {editable
    ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
    : value
  }
</div>
);
class Users extends React.Component {

  constructor(props) {
      super(props);

      this.state = { data,
        userslist: [{
          username:'',
          password:'',
          first_name:'',
          last_name:'',
          user_role:'',
          email_id:'',
          user_id:''
               }]
              };
      this.cacheData = data.map(item => ({ ...item }));
 }


 renderColumns(text, record, column) {
   return (
     <EditableCell
       editable={record.editable}
       value={text}
       onChange={value => this.handleChange(value, record.key, column)}
     />
   );
 }
 onSelectChange = (selectedRowKeys) => {
   console.log('selectedRowKeys changed: ', selectedRowKeys);
   this.setState({ selectedRowKeys });
 }


 useredit(user_id){
  // console.log("user_id:" + user_id)
   cookie.save('user_id', user_id);
   console.log("from cookies user_id:" + cookie.load('user_id'))
   hashHistory.push("/viewusers")
 }
 useraddressedit(user_id){
  // console.log("user_id:" + user_id)
   cookie.save('user_id', user_id);
   console.log("from cookies user_id:" + cookie.load('user_id'))
   hashHistory.push("/useraddress")
 }
  users = (params = {}) => {
    // console.log('params:', params);
    //  this.setState({ loading: true });
      var cookies = cookie.load('sessionid');
      axios.get(axios.defaults.baseURL + '/api/front/user/' + cookies,{
        responseType: 'json'
      }).then(response => {
            this.setState({ userslist: response.data.result});
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
    this.users({
      result: pagination.pageSize,
      page: pagination.current,
      sortField: sorter.field,
      sortOrder: sorter.order,
      ...filters,
    });
  }
  componentDidMount() {
   this.users();
}
adduser() {
//  alert()
 hashHistory.push("/adduser");
}
start(user_id) {
this.setState({ loading: true });
// ajax request after empty completing
var cookies = cookie.load('sessionid');

axios.delete(axios.defaults.baseURL + '/api/front/user/'+ cookies +'/'+user_id, {
user_id:user_id
})
.then(function (response) {
if(response.data.status == false){
error(response.data.result)
  }else{
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
 handleChange(value, key, column) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     target[column] = value;
     this.setState({ data: newData });
   }
 }
 edit(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     target.editable = true;
     this.setState({ data: newData });
   }
 }
 save(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     delete target.editable;
     this.setState({ data: newData });
     this.cacheData = newData.map(item => ({ ...item }));
   }
 }
 cancel(key) {
   const newData = [...this.state.data];
   const target = newData.filter(item => key === item.key)[0];
   if (target) {
     Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
     delete target.editable;
     this.setState({ data: newData });
   }
 }
render(){
  const { selectedRowKeys, userslist, user_id } = this.state;
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
//const hasSelected = selectedRowKeys.length > 0;
  return (
    <div>
    <Breadcrumb>
       <Breadcrumb.Item><a href="#/dashboard">Dashboard  </a></Breadcrumb.Item>
     </Breadcrumb><br />
 <Card noHovering="false">

 <Button type="primary" onClick={this.adduser}>Add User</Button> <br /><br />
 <Table pagination={{ pageSize: 10,  showSizeChanger:true }} scroll={{ x: 768 }} rowKey="user_id" columns={[
 {
 title: 'Username',
 dataIndex: 'username',
 },{
 title: 'First Name',
 dataIndex: 'first_name',
 },
 {
 title: 'Last Name',
 dataIndex: 'last_name'
},
{
title: 'User Role Name',
dataIndex: 'user_role'
},
{
title: 'Email Id',
dataIndex: 'email_id'
},
{
title: 'Action',
dataIndex: 'user_id',
render: user_id => <div>  <Popconfirm title="Are you sure delete this user?" onConfirm={() => this.start(user_id)} onCancel={cancel} okText="Yes" cancelText="No">
  <a href="#"><Icon type="delete" /> &nbsp;Delete user</a>
</Popconfirm> &nbsp;&nbsp;|&nbsp;&nbsp; <a href="javascript:void(0)" onClick={() => this.useredit(user_id)}><i className="fa fa-pencil"></i>&nbsp; Edit</a>&nbsp;&nbsp; |&nbsp;&nbsp; <a href="javascript:void(0)" onClick={() => this.useraddressedit(user_id)}> <i className="fa fa-address-card" title="View address" aria-hidden="true"></i>&nbsp; Address</a> </div>
}
 ]} dataSource={userslist}  />
      </Card>
    </div>
  )
}

}



export default Users
