import React from 'react'
import {Menu, Icon, Popover, Badge, M,Avatar} from 'antd'
import styles from './main.less'
import Menus from './menu'
import { Layout,Button } from 'antd';
import BadgeBox from './badgeBox';
const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup;
const { Sider } = Layout;
import cookie from 'react-cookies'

const style={
  avatarBadge:{
      marginTop:10,
      padding:0,
      backgroundColor:'black'
  }
}
class Header extends React.Component {


  constructor(props) {
      super(props);

      this.state = {
         headerColor: localStorage.getItem('berrAdminHeaderColor') ,
         headerBackColor: localStorage.getItem('berrAdminHeaderBackColor')
      }
   }



  handleClickMenu = e => e.key === 'logout' && logout()


render(){
  return (
    <div className={styles.header  + " " + this.props.headerTheme}  >

    {this.props.isNavbar
      ? <Popover
          placement='bottomLeft'
          onVisibleChange={this.props.switchMenuPopover}
          visible={this.props.menuPopoverVisible}
          overlayClassName={styles.popovermenu + " menu_"+ this.props.menuTheme }
          trigger='click'
          content={<Menus  location={this.props.location}  navOpenKeys={this.props.navOpenKeys} changeOpenKeys={this.props.changeOpenKeys} />}>
          <div className={styles.siderbutton}>
            <Icon type='bars'/>
          </div>
        </Popover>
      : null}

      <Menu className={'header-menu'} mode='horizontal'  onClick={this.props.handleClickMenu}>
        <BadgeBox pr={this.props}   />
      </Menu>
    </div>
  )
}
}



export default Header
