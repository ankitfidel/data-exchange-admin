import React from 'react'
import {Icon, Switch, Menu, Badge} from 'antd'
import { Link } from 'dva/router'
import styles from './main.less'
import {config} from '../../utils'
//import Menus from './menu'
import {menu} from '../../utils'
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// function handleClick(){
//  console.log('click ');
//
// }
function Sider({siderFold,siderFoldRight, menuTheme,darkTheme,location, changeTheme,changeLock, navOpenKeys, changeOpenKeys}) {
  // const menusProps = {
  //   siderFold,siderFoldRight,
  //   darkTheme,
  //   location,
  //   navOpenKeys,
  //   changeOpenKeys,
  //   menuTheme

  // <Menu.Item key="Profile" style={{'overflow': 'hidden'}}>
  //    <Link  activeClassName="selected"  to="/profile"> <Icon type="user" />Profile</Link>
  // </Menu.Item>
  //
  // <Menu.Item key="Users" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/users"> <Icon type="star-o" /> Users</Link>
  // </Menu.Item>
  // <Menu.Item key="customers" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/customers"> <Icon type="tags-o" /> customers</Link>
  // </Menu.Item>
  // <Menu.Item key="Hostsgroup" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/hostsgroup">  <Icon type="database" /> Hostsgroup</Link>
  // </Menu.Item>
  // <Menu.Item key="Templates" style={{'overflow': 'hidden'}}>
  //    <Link activeClassName="selected"  to="/templates">  <Icon type="layout" /> Templates</Link>
  // </Menu.Item>
  // }
  const Sider3 = React.createClass({
    getInitialState() {
      return {theme: 'dark', current: '1'};
    },
    changeTheme(value) {
      this.setState({
        theme: value
          ? 'dark'
          : 'light'
      });
    },
    handleClick(e) {
      console.log('click ', e);
      this.setState({current: e.key});
    },
    render() {
      return (
        <div>

          <Menu
            theme={this.state.theme}
            onClick={this.handleClick}
            style={{
            width: '100%'
          }}
            defaultOpenKeys={['sub1']}
            selectedKeys={[this.state.current]}
            mode="inline">


            <Menu.Item key="dashboard" className="menulink" style={{'overflow': 'hidden'}}>
               <Link to="/dashboard" activeClassName="selected"> <Icon type="rocket" /> Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="Companies" className="menulink" style={{'overflow': 'hidden'}}>
               <Link activeClassName="selected"  to="/companies">  <Icon type="cloud-o" /> Companies</Link>
            </Menu.Item>
            <Menu.Item key="Users" className="menulink" style={{'overflow': 'hidden'}}>
               <Link activeClassName="selected"  to="/users">  <Icon type="cloud-o" /> Users</Link>
            </Menu.Item>

          </Menu>
        </div>
      );
    }
  });
  return (
<div>
<div>
<div className={styles.logo}>
<img src={config.logoSrc}/> {siderFold ? '' : <span className="logoText"></span>}
</div>

<Sider3  className={"menu_"+ menuTheme}/>



</div>
  </div>
  )
}

export default Sider
