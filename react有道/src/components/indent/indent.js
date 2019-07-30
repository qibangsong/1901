import React from 'react';
import {Icon} from 'antd';
import './indent.css'
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
class Indent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      cla:0
    }
  }
  fn(i){
    this.setState({
      cla:i
    })
  }
  rou(){
    this.props.history.go(-1)
  }
  gohome(){
    this.props.history.push("/")
  }
  componentWillMount(){
    
  }
  componentDidMount () {
    
  }
  render(){
    
    return (
      <div className="item">
       <div className="head">
          <div className="bb">
          <a onClick={this.rou.bind(this)}><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></a>
            订单页
          </div>
        </div> 
        <div className="listone">
          <div className="listtop">
            <div onClick={this.fn.bind(this,0)} className={this.state.cla==0?"act1":""}>全部</div>
            <div onClick={this.fn.bind(this,1)} className={this.state.cla==1?"act1":""}>待付款</div>
            <div onClick={this.fn.bind(this,2)} className={this.state.cla==2?"act1":""}>待发货</div>
            <div onClick={this.fn.bind(this,3)} className={this.state.cla==3?"act1":""}>待收货</div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Indent;
