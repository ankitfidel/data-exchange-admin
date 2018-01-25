import React, { PropTypes } from 'react'
import { connect } from 'dva'
import Login from './loginpage'
import Signup from './signup'
import Adminlogin from './adminlogin'


import Header from '../components/layout/header'
import Bread from '../components/layout/bread'
import Footer from '../components/layout/footer'
import CustomSider from '../components/layout/sider'
import styles from '../components/layout/main.less'
import { Spin, LocaleProvider, Switch } from 'antd'
import { classnames, config } from '../utils'
import '../components/layout/common.less'
import enUS from 'antd/lib/locale-provider/en_US';
import RightSider from '../components/layout/rightSider';
import { Layout } from 'antd';
import { BackTop } from 'antd';
import moment from 'moment';
//import 'moment/locale/en_US';
import cookie from 'react-cookies'
import { browserHistory, hashHistory } from 'dva/router';


const { Sider, Content } = Layout;
var cookies = cookie.load('sessionid');
var user_role = cookie.load('user_role');
//alert(cookies)
if(cookies==null || cookies == undefined ||cookies == ''){
  hashHistory.push("/login");
}else{
  if(user_role=='admin'){
    hashHistory.push("/dashboard");
  }
}

function App({ children, location, dispatch, app }) {

  const {
    login,signup,
    loading,
    loginButtonLoading,
    user,
    siderFold,
    siderFoldRight,
    darkTheme,
    isNavbar,
    menuPopoverVisible,
    menuPopoverVisibleRight,
    navOpenKeys,
    lock,
    SignUp,
    menuTheme,
    headerTheme
  } = app
  const loginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
    dispatch({ type: 'app/login', payload: data })

    }
  }
  const signupProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
    dispatch({ type: 'app/signup', payload: data })

    }
  }

  const adminloginProps = {
    loading,
    loginButtonLoading,
    onOk(data) {
      dispatch({ type: 'app/adminlogin', payload: data })
    }
  }

  const headerProps = {
    user,
    siderFold,siderFoldRight,
    location,
    isNavbar,
    menuPopoverVisible,
    navOpenKeys,
    switchMenuPopover() {
      dispatch({ type: 'app/switchMenuPopver' })
    },
    logout() {
      dispatch({ type: 'app/logout' })
    },
    switchSider() {
      dispatch({ type: 'app/switchSider' })
    },
    switchSiderRight() {
      dispatch({ type: 'app/switchSiderRight' })
    },
    changeLock() {
      dispatch({ type: 'app/changeLock' })
    },
    changeSignUp() {
      dispatch({ type: 'app/changeSignUp' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    },
    changeTheme(value) {
      //console.log(value)
      dispatch({ type: 'app/changeTheme' , payload: {  theme: value  }})
    },
    changeThemeHeader(value) {
      //console.log(value)
      dispatch({ type: 'app/changeThemeHeader' , payload: {  theme: value  }})
    },
    headerTheme,
    menuTheme
  }

  const siderProps = {
    siderFold,
    location,
    navOpenKeys,
    menuTheme,
    changeTheme() {
      dispatch({ type: 'app/changeTheme' })
    },
    changeOpenKeys(openKeys) {
      localStorage.setItem('navOpenKeys', JSON.stringify(openKeys))
      dispatch({
        type: 'app/handleNavOpenKeys',
        payload: {
          navOpenKeys: openKeys
        }
      })
    },
    changeLock() {
      dispatch({ type: 'app/changeLock' })
    },
    changeSignUp() {
      dispatch({ type: 'app/changeSignUp' })
    },
     changeTheme(value) {
      //console.log(value)
      dispatch({ type: 'app/changeTheme' , payload: {  theme: value  }})
    },
    headerTheme,
    menuTheme
  }



  if (SignUp) {
    return (
      <div>
        <Signup {...signupProps} />
      </div>
    )
  } else if (lock) {
    return (
      <div>
      Page Not Found
      </div>
    )

  } else if (config.needLogin) {
    if (!login) {
      return (
        <div>

          <div className={styles.spin}>
            <Login {...loginProps} />
          </div>

        </div>
      )
    }
  }

  if ((login || !config.needLogin)) {

    return (
      <LocaleProvider locale={enUS}>
      <div
        className={classnames(styles.layout, { [styles.fold]: isNavbar ? false : siderFold  }, {  [styles.withnavbar]: isNavbar  })}>
        {!isNavbar  ? <aside
            className={classnames(styles.sider , (menuTheme=="dark") ? styles.dark : menuTheme=="dark" ?  styles.light : menuTheme=="dark" )} >
           <CustomSider {...siderProps} />

          </aside>
          : ''}
        <div id="main_content" className={classnames(styles.main , (menuTheme=="dark") ? styles.dark : menuTheme=="dark" ?  styles.light : menuTheme=="dark" )}>
          <div className={styles.spin} >
            <Spin tip='Loading...' spinning={loading} size='large'>
              <Header {...headerProps} />

                <div className={styles.container}>
                  <div className={styles.content} id="spin">
                  <BackTop target={() => document.getElementById('main_content')} />
                    {children}
                  </div>
                </div>

              <Footer />
            </Spin>
          </div>

        </div>

      </div>
      </LocaleProvider>
    )
  }

}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  loginButtonLoading: PropTypes.bool,
  login: PropTypes.bool,
  lock: PropTypes.bool,
  SignUp: PropTypes.bool,
  user: PropTypes.object,
  siderFold: PropTypes.bool,
  siderFoldRight: PropTypes.bool,
  darkTheme: PropTypes.bool,
  menuTheme : PropTypes.string
}

export default connect(({ app }) => ({ app }))(App)
