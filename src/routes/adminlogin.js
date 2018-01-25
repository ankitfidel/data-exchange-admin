import React, {PropTypes} from 'react'
import { Button, Row, Form, Input } from 'antd'
import { config } from '../utils'
import styles from './login.less'
import cookie from 'react-cookies'
const axios = require('axios');
import { browserHistory } from 'dva/router';
import { axiosrequest } from './axiosrequest';

const FormItem = Form.Item

const adminlogin = ({
  loginButtonLoading,
  onOk,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll
  }
}) => {
  function handleOks () {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
        axios.post('http://localhost:8080/dataexchange/api/authenticate', {
          credentials: 'credentials',
          username:username,
          password:password
      })
      .then(function (response) {
        const sessionid = response.data.result.sessionId;
        if(response.data.result.userRole!="admin"){
            //browserHistory.push("/dashboard");
            console.log("sessionid"+sessionid);
            cookie.save('sessionid', sessionid, { path: '/' })
          //  alert("userRole is not admin");
        }else{
          //  alert("userRole is admvfsvfvsghdvfhsin");
            console.log("sessionid"+JSON.stringify(response.data.result));
            cookie.save('sessionid', sessionid, { path: '/' })
          //  browserHistory.push("/dashboard");
        }

      })
      .catch(function (error) {
        console.log(error);
        alert("errors")
      });
  }

  return (
    <div className={styles.form}>
      <div className={styles.logo}>
        <img src={config.logoSrc} />
        <span> Admin login</span>
      </div>
      <form>
        <FormItem hasFeedback>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your User Name'
              }
            ]
          })(<Input size='large' onPressEnter={handleOks} placeholder='Username' />)}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please Enter Your Password'
              }
            ]
          })(<Input size='large' type='password' onPressEnter={handleOks} placeholder='Password' />)}
        </FormItem>
        <Row>
          <Button type='primary' size='large' onClick={handleOks} loading={loginButtonLoading}>
            Login
          </Button>
        </Row>
        <p>
          <span>User Name：guest</span>
          <span>Password：guest</span>
        </p>
      </form>
    </div>
  )
}

adminlogin.propTypes = {
  form: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  onOk: PropTypes.func
}

export default Form.create()(adminlogin)
