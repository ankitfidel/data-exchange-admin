import React from 'react'
import {Menu, Icon, Popover,Layout, Badge, M,Avatar,Row, Col, Button,Card, Table, Modal} from 'antd'
import {ComposedChart, CartesianGrid, LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis,Legend, Bar, Tooltip, ResponsiveContainer} from 'recharts';
//const {LineChart, Line, AreaChart, Area, Brush, XAxis, YAxis, CartesianGrid, Tooltip} = Recharts;
const {Header, Content, Footer, Sider} = Layout;
import colors from '../utils/theme'

import RightSider from '../components/layout/rightSider';
class Themes extends React.Component {

    onClick(event) {
      localStorage.clear();
      location.reload();
   }
  constructor(props) {
      super(props);

      this.state = {
         background: '#fff',

   }
 }

   setModal1Visible(modal1Visible) {
     this.setState({modal1Visible})
   };


render(){


  return (
<div>sdhgjsdfgjsg</div>
  )
}

}



export default Themes
