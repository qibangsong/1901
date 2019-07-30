import React from 'react';
import {Icon} from 'antd';
import "./zhuce.css";
import { DatePicker } from 'antd';
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import moment from 'moment';
import Axios from 'axios';
import { message, Button } from 'antd';
import { clearInterval } from 'timers';

message.config({
  top: 300,
  duration: 2,
  maxCount: 3,
});
// const info = () => {
//   message.info('请输入有效的手机号');
 
// };
class Zhuce extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name:"",
      user:"",
      sex:"0",
      data:"2019-07-23",
      phone:"",
      img:"",
      code:"",
      psd:"",
      nextpsd:"",
      obj:{},
      imgcode:"",//图片验证码
      codeimg:"",//验证码图片
      phonecode:"",
      f:true,
      phcode:"获取验证码",
      settime:60,
      disable:false
    }
    this.fntime=this.fntime.bind(this)
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
          console.log("向用户发送验证码成功",data.data.str);
          self.setState({
            phonecode:data.data.str
          },()=>{
            console.log("2222222",self.state.phonecode);
            this.fntime()
           
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
  fntime(){//倒计时
    let self=this;
    this.t=setInterval(() => {
      let n=self.state.settime;//设定起始倒计时
      self.setState({
        phcode:(n-1)+"秒后重新发送",
        settime:n-1,
        disable:true
      })
      if(n==0){
        self.setState({
          phcode:"重新获取",
          phonecode:"",
          settime:60,
          disable:false
        })
        window.clearInterval(self.t)
      }
      //self.fntime()
    }, 1000);   
    
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
  onChange(date, dateString) {//获取生日
    console.log(date, dateString);
    this.setState({
      data:dateString
    })
  }
  sex(e){//获取性别
    let val=e.target.value;
    this.setState({
      sex:val
    })
  }
  fn(){//同意协议
    this.setState({
      f:!this.state.f
    })
  }
  zhuce(){
    if(this.state.f){
      if(this.state.user==""||this.state.name==""){
        return message.info('姓名和用户名不能为空');
      }else{
        if(this.state.phonecode!=this.state.code){
          return message.info("短信验证码错误")
        }else{
          if(this.state.psd==""||this.state.nextpsd==""){
            return message.info("密码不能为空")
          }else if(this.state.psd!=this.state.nextpsd){
            return message.info("两次密码不一致请重新输入")
          }else{
            let obj=this.state.obj;
            obj.user=this.state.user;
            obj.name=this.state.name;
            obj.sex=this.state.sex;
            obj.data=this.state.data;
            obj.phone=this.state.phone;
            obj.psd=this.state.psd;
            //console.log("objjjjjjjjjj:",obj)
            Axios.post("http://127.0.0.1:82/addPost",obj).then((data)=>{
              console.log("data",data);
              if(data.data.s===111){
                return message.info("该用户名已存在")
              }else{
                this.props.history.push('/register')
                return message.info("注册成功，请登录")
              }
              
            }).catch((err)=>{
              console.log("errrrr",err);
            })
          }
        }
        
      }
    }else{
      console.log("请同意用户协议")
    }
  }
  have(){
    this.props.history.push("/register")
  }
  componentDidMount () {
    console.log("this.state.img",this.state.img)
  }
  render(){
   
    //console.log("this.props",this.props.imgs)
    return (
      <div className="register">
        <div className="head">
          <div className="bb">
          <Link to="/" ><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></Link>
            注册新用户
          </div>
        </div>
        <div className="form1">
          <div className="ipt0">
            <span>姓名</span>
            <input type="text" placeholder="请填写姓名" defaultValue={this.state.name} onChange={this.setname.bind(this,"name")}/>
          </div>
          <div className="ipt0">
            <span>用户名</span>
            <input type="text" placeholder="请填写用户名" defaultValue={this.state.user} onChange={this.setname.bind(this,"user")}/>
          </div>
          <div className="ipt0">
            <span>性别</span>
            <label className="lab1">
             <input type="radio"name="sex" defaultValue="0" defaultChecked={this.state.sex=="0"?true:false} defaultValue="0" onChange={this.sex.bind(this)}/>男
            </label>
            <label className="lab1">
            <input type="radio"name="sex" defaultValue="1" defaultChecked={this.state.sex=="1"?true:false} defaultValue="1" onChange={this.sex.bind(this)}/>女
            </label>
          </div>
          <div className="ipt0">
            <span>生日</span>
            <DatePicker onChange={this.onChange.bind(this)} defaultValue={moment(this.state.data)} />
          </div>
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
            <button type="primary" onClick={this.getcode.bind(this) } disabled={this.state.disable}>{this.state.phcode}</button>
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
        <div className="yes">
          <input type="checkbox"  defaultChecked={this.state.f} onChange={this.fn.bind(this)}/><span className="yy">同意胜道体育用户协议</span>
          <span className="have" onClick={this.have.bind(this)}>已有账号</span>
        </div>
        <div className="now">
          <button onClick={this.zhuce.bind(this)} type="primary" >立即注册</button>
        </div>
      </div>
    );
  }
  
}
export default Zhuce;



