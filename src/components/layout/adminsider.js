import React from 'react'
import {Icon, Switch} from 'antd'
import styles from './main.less'
import {config} from '../../utils'
import Adminmenus from './adminmenu'

function AdminSider({siderFold, menuTheme,darkTheme,location, changeTheme,changeLock, navOpenKeys, changeOpenKeys}) {
  const AdminmenusProps = {
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys,
    menuTheme
  }
  return (
    <div className={"menu_"+ menuTheme}>
      <div className={styles.logo}>
        <img src={config.logoSrc}/> {siderFold ? '' : <span className="logoText">{config.logoText}</span>}
      </div>
      <Adminmenus {...AdminmenusProps}/>
       {!siderFold ? <div className={styles.switchtheme + " " + "menu_"+ menuTheme}>
       <Switch
              onChange={changeTheme.bind(this, menuTheme=="dark" ? "light":"dark")}
              defaultChecked={!(menuTheme=="dark")}
              checkedChildren='Dark'
              unCheckedChildren='Light' />
          <Switch
          onChange={changeLock}
          checkedChildren={<Icon type="lock" />}
          unCheckedChildren={<Icon type="unlock" />}/>
          </div>
        : ''}
    </div>
  )
}

export default AdminSider
