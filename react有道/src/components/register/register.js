import React from 'react';
import {Icon} from 'antd';
import "./register.css"
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import Axios from 'axios';
import { message, Button } from 'antd';
message.config({
  top: 300,
  duration: 2,
  maxCount: 3,
});
class Register extends React.Component{
  constructor(props){
    super(props)
    this.state={
      user:"",
      psd:""
    }
  }
  rou(){
    this.props.history.go(-1)
  }
  user(name,e){
    let val=e.target.value;
    this.setState({
      [name]:val
    })
  }
  fn(){
    let obj={
      user:this.state.user,
      psd:this.state.psd
    }
    //console.log("obj",obj)
    Axios.post("http://127.0.0.1:82/login",obj).then((data)=>{
      console.log("data",data)
      if(data.data.s){
        localStorage.f=true;
        localStorage.token=data.data.token;
        this.props.history.push('/shopcar')
        return message.info("登录成功")
      }else{
        return message.info("用户名或密码错误")
      }
    }).catch((err)=>{
      console.log("err",err)
    })
  }
  componentDidMount () {
    
  }
  render(){
   
    console.log("this.props",this.props.imgs)
    return (
      <div className="register">
        <div className="head">
          <div className="bb">
          <a onClick={this.rou.bind(this)}><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></a>
            登录
          </div>
        </div> 
        <div className="ipts">
          <div className="iptimg">
            <img src="http://127.0.0.1:82/yysport.png"/>
          </div>
          <div className="iptt">
            <div>
              <label><i className="iconfont icon-ren icon4"></i></label>
              <input type="text" placeholder="请输入账号" onChange={this.user.bind(this,"user")} value={this.state.user}/>
            </div>
            <div>
              <label><i className="iconfont icon-mima icon4"></i></label>
              <input type="password" placeholder="请输入密码"  onChange={this.user.bind(this,"psd")} value={this.state.psd}/>
            </div>
            <div className="denglu">
              <p className="psdp"><Link to="/forget"><span className="psd">忘记密码</span></Link><Link to="/zhuce"><span className="newuser">注册新用户</span></Link></p>
              <p><button onClick={this.fn.bind(this)}>登录</button></p>
            </div>
            <div className="btom">

            </div>
          </div>
         
        </div>
      </div>
    );
  }
  
}

export default Register;
