import React from 'react'
import {Menu, Icon,Switch} from 'antd'
import {Link} from 'dva/router'
import {menu} from '../../utils'
import find from 'lodash/find';

const topMenus = menu.map(item => item.key)
const getMenus = function (menuArray, siderFold, parentPath) {
  parentPath = parentPath || '/'
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu
          key={item.key}
          title={<span> {
          item.icon
            ? <Icon type={item.icon}/>
            : ''
        }
        {
          siderFold && topMenus.indexOf(item.key) >= 0
            ? ''
            : item.name
        } </span>}>
          {getMenus(item.child, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      )
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon
              ? <Icon type={item.icon}/>
              : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0
              ? ''
              : item.name}
          </Link>
        </Menu.Item>
      )
    }
  })
}

function Menus({
  siderFold,
  darkTheme,
  menuTheme,
  location,
  isNavbar,
  handleClickNavMenu,
  navOpenKeys,
  changeSignUp,
  changeOpenKeys
}) {
  const menuItems = getMenus(menu, siderFold)
  const onOpenChange = (openKeys) => {
    const latestOpenKey = find(openKeys,key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = find(navOpenKeys,key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = []
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  const getAncestorKeys = (key) => {
    const map = {
      navigation2: ['navigation']
    }
    return map[key] || []
  }
  // When the menu bar is stuck, the open keys can not be manipulated
  let menuProps = !siderFold
    ? {
      onOpenChange,
      openKeys: navOpenKeys
    }
    : {}

  return (
     <div>

    <Menu
      theme={menuTheme ? menuTheme:"dark"} mode={siderFold  ? 'vertical': 'inline'} onClick={handleClickNavMenu}

      style={{
      width: '100%'
    }}
      defaultOpenKeys={['sub1']}
      mode="inline">


      <Menu.Item key="dashboard" className="menulink" style={{'overflow': 'hidden'}}>
         <Link to="/dashboard" activeClassName="selected"> <Icon type="home" /> Dashboard</Link>
      </Menu.Item>
      <Menu.Item key="Companies" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/companies">  <i class="fa fa-building-o"></i> Companies</Link>
      </Menu.Item>
      <Menu.Item key="Users" className="menulink" style={{'overflow': 'hidden'}}>
         <Link activeClassName="selected"  to="/users">  <i class="fa fa-users"></i> Users</Link>
      </Menu.Item>




    </Menu>
    </div>
  )
}

export default Menus
