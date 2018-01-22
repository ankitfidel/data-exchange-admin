import React, {PropTypes} from 'react'
import { Button, Row, Form, Input, Modal } from 'antd'
import { config } from '../utils'
import styles from './login.less'
import cookie from 'react-cookies'
const axios = require('axios');
const FormItem = Form.Item;
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';


function msg(msg) {
  alert(msg);
  Modal.error({
   title: 'This is an error message',
   content: 'some messages...some messages...',
 });
}


const login = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {

  function handleOk () {
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
var myDate = new Date();
      var timezone = myDate.getTimezoneOffset();
    axios.post(axios.defaults.baseURL + '/dataexchange/api/authenticate', {
      username:username,
  	  password:password,
      timezoneOffset:timezone
  })
  .then(function (response) {
    if(response.data.status == false){
      msg(response.data.result)
    }else{
      alert(response.data.result.user_role)
      const sessionid = response.data.result.session_id;
      const user_role = response.data.result.user_role;
      console.log("sessionid"+sessionid);
      cookie.save('sessionid', sessionid, { path: '/' })
      cookie.save('user_role', user_role, { path: '/' })
      window.location.href='/dashboard'
      console.log(JSON.stringify(response));
    }

  })
  .catch(function (error) {
    console.log(error);
    alert("errors")
  });
  }
 function signup(){
browserHistory.push("/signup")
 }
  return (
    <div className={styles.bg}>
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src="../assets/login-logo.png" />
      </div>
      <form>
        <FormItem label="Username:" hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your User Name'
              }
            ]
          })(<Input size='large' id="username"  onPressEnter={handleOk} placeholder='Username' />)}
        </FormItem>
        <FormItem label="Password:" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your Password'
              }
            ]
          })(<Input size='large' type='password' id="password" onPressEnter={handleOk}  placeholder='Password' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOk} loading={loginButtonLoading}>
            Login
          </Button>
          <br />   <br />
          <Button type='primary' size='large' onClick={signup} loading={loginButtonLoading}>
            Signup
          </Button>
        </Row>

      </form>
    </div>
    </div>
  )
}

login.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(login)
