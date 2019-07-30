import React from 'react';
import {Icon} from 'antd';
import Axios from 'axios';
import { message, Button } from 'antd';

// import "./register.css"
class Forget extends React.Component{
  constructor(props){
    super(props)
    this.state={
      phone:"",
      img:"",
      code:"",
      psd:"",
      nextpsd:"",
      obj:{},
      imgcode:"",//图片验证码的对应值
      codeimg:"",//验证码图片
      phonecode:"",//手机号验证码
    }
  }
  setname(name,e){//获取表单内容
    //console.log("eeeeeee",e.target.value);
    this.setState({
      [name]:e.target.value
    },()=>{
    //console.log("this.state:",this.state)
    })
  }
  getcode(){//获取验证码
    let phone=this.state.phone;
    var myreg=/^[1][3,4,5,7,8，9][0-9]{9}$/;
    if(myreg.test(phone)){
      console.log("满足条件");
      let code=this.state.imgcode;
      let usercode=this.state.img;
      let self=this;
      if(code==usercode){
        console.log("1111111111","发送验证码");
        Axios.post("http://127.0.0.1:82/sendphone",{phone:this.state.phone}).then((data)=>{
          console.log("向用户发送验证码成功",data.data.str)
          self.setState({
            phonecode:data.data.str
          },()=>{
            console.log("2222222",self.state.phonecode);
          })
        }).catch((err)=>{
          console.log("err",err)
        })
  
      }else{
        return message.info("验证码错误，请重新输入")
      }
    }else{
      console.log("手机号格式错误，请重新输入");
      return message.info('请输入有效的手机号'); 
    }
   
  }
  getimg(){//获取图片验证码
    let self=this;
    Axios.get("http://127.0.0.1:82/getcode").then((data)=>{
      console.log("dataimg",data);
      self.setState({
        codeimg:data.data.img,
        imgcode:data.data.code
      },()=>{
        console.log("aaaaaaaa",this.state)
      })
    }).catch((err)=>{
      console.log("err:",err)
    })
  }
  componentWillMount(){
    let self=this;
    Axios.get("http://127.0.0.1:82/getcode").then((data)=>{
      console.log("dataimg",data);
      self.setState({
        codeimg:data.data.img,
        imgcode:data.data.code
      },()=>{
        console.log("aaaaaaaa",this.state)
      })
    }).catch((err)=>{
      console.log("err:",err)
    })
  }
  xiugai(){
    console.log("this.state",this.state);
    let obj={
      phone:this.state.phone,
      psd:this.state.psd
    }
    Axios.post("http://127.0.0.1:82/updata",obj).then((data)=>{
      console.log("修改成功",data);
      if(data.data.s){
        return message.info('修改成功');
        this.props.history.push("/register")
      }else{
        return message.info('修改失败'); 
      }
    }).catch(err=>{
      console.log("修改失败",err);
    })
  }
  rou(){
    this.props.history.go(-1)
  }
  render(){
   
    console.log("this.props",this.props.imgs)
    return (
      <div className="forget">
        <div className="head">
          <div className="bb">
          <a onClick={this.rou.bind(this)}><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></a>
            找回密码
          </div>
        </div> 
        <div className="form1">
        <div className="ipt0">
            <span>手机号码</span>
            <input type="tel" placeholder="请填写手机号码" defaultValue={this.state.phone} onChange={this.setname.bind(this,"phone")}/>
          </div>
          <div className="ipt0">
            <span>图片验证</span>
            <input type="text" placeholder="请输入图片验证码" className="tu1" defaultValue={this.state.img} onChange={this.setname.bind(this,"img")}/>
            <img src={"http://127.0.0.1:82"+this.state.codeimg} onClick={this.getimg.bind(this)}/>
          </div>
          <div className="ipt0">
            <span>短信验证码</span>
            <input type="text" placeholder="请输入验证码" className="tu1" defaultValue={this.state.code} onChange={this.setname.bind(this,"code")}/>
            <button type="primary" onClick={this.getcode.bind(this) }>获取验证码</button>
          </div>
          <div className="ipt0">
            <span>输入密码</span>
            <input type="psd" placeholder="请输入密码" defaultValue={this.state.psd} onChange={this.setname.bind(this,"psd")}/>
          </div>
          <div className="ipt0">
            <span>确认密码</span>
            <input type="psd" placeholder="请确认密码" defaultValue={this.state.nextpsd} onChange={this.setname.bind(this,"nextpsd")}/>
          </div>
        </div>
        <div className="now">
          <button onClick={this.xiugai.bind(this)} type="primary" >确认修改</button>
        </div>
      </div>
    );
  }
  
}

export default Forget;
