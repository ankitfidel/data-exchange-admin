import React, {PropTypes} from 'react'
import { Button, Row, Form, Input } from 'antd'
import { config } from '../utils'
import styles from './login.less'

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
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        alert("errors are here")
        return;
      }
      console.log("values:"+ JSON.stringify(values));
      alert("admin here")
      window.location.href='/dashboard_2'
    })
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
