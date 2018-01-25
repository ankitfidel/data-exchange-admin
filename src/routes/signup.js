import React, {PropTypes} from 'react'
import { Button, Row, Form, Input, Modal } from 'antd'
import { config } from '../utils'
import styles from './login.less'
import cookie from 'react-cookies'
const axios = require('axios');
const FormItem = Form.Item;
import { browserHistory, hashHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';



  function msg(msg) {
    alert(msg);
    Modal.error({
     title: 'This is an error message',
     content: 'some messages...some messages...',
   });
  }

function success(done) {

}
const signup = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {

  function signup () {
const username = document.getElementById('username').value;
const password = document.getElementById('password').value;
const emailId = document.getElementById('emailId').value;
    axios.post(axios.defaults.baseURL + '/api/admin', {
      username:username,
  	  password:password,
      user_role_id:1,
      email_id:emailId
  })
  .then(function (response) {
    if(response.data.status == true){
      success(response.data.result)
    hashHistory.push("/login")
    }else{
    //  alert("result");
      alert(response.data.result)
    //   msg(response.data.result)
    //  alert(JSON.stringify(response));

    //    error();
      }


  })
  .catch(function (error) {
    alert(JSON.stringify(error));
    console.log(error);
  //  error()
  });
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
          })(<Input size='large' id="username"  onPressEnter={signup} placeholder='Username' />)}
        </FormItem>
        <FormItem label="Password:" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your Password'
              }
            ]
          })(<Input size='large' type='password' min="8" id="password" onPressEnter={signup}  placeholder='Password' />)}
        </FormItem>
        <FormItem label="Email Id:" hasFeedback>
          {getFieldDecorator('emailId', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your User Name'
              }
            ]
          })(<Input size='large' id="emailId"  onPressEnter={signup} placeholder='emailId' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={signup} loading={loginButtonLoading}>
            signup
          </Button>
        </Row>

      </form>
    </div>
    </div>
  )
}

signup.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(signup)
