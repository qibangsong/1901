import React from 'react';
import {Icon} from 'antd';
import './shopcar.css'
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import Axios from 'axios';
import { message } from 'antd';
import Addminus from '../addminus/addminus'
message.config({
  top: 300,
  duration: 2,
  maxCount: 3,
});
class Shopcar extends React.Component{
  constructor(props){
    super(props)
    this.state={
      arr:"",
      f:false,
      buycount:0,
      buyprice:0,
      delete:true,//删除还是提交
      caozuo:true
    }
  }
  dele(){//更多操作
    this.setState({
      delete:!this.state.delete,
      caozuo:!this.state.caozuo//控制删除还是结算
    })
   
    let arr=this.state.arr;
    if(!this.state.delete){//删除
      for(var i=0;i<arr.length;i++){
        if(arr[i].checked){
          this.refs.btnbg.style.backgroundColor="#c00"
          break;
        }else{
          this.refs.btnbg.style.backgroundColor="#bbb"
        }
      }
      let token=localStorage.token;
      // this.refs.btnbg.style.backgroundColor="#bbb"
      Axios.post("http://127.0.0.1:82/updatacount",{shopcar:arr,token}).then((data)=>{
        // console.log("data",data)
      }).catch((err)=>{
        console.log("err",err)
      })
    }else{//编辑
      this.refs.btnbg.style.backgroundColor="#c00"
    }
  }
  rou(){
    this.props.history.push("/")
  }
  gohome(){
    this.props.history.push("/")
  }
  check(obj,i){//选中当前项
    this.state.arr[i].checked=!this.state.arr[i].checked;
    this.setState({
      arr:this.state.arr
    })
    for(var i=0;i<this.state.arr.length;i++){
      if(!this.state.arr[i].checked){
        this.setState({
          f:false
        })
        break;
      }
      this.setState({
        f:true
      })
    }
     this.bgtab()
    // console.log("111111",this.state.f)
    // console.log(this.state.arr)
  }
  checkall(){//全选
    this.setState({
      f:!this.state.f
    },()=>{
      for(var i=0;i<this.state.arr.length;i++){
        this.state.arr[i].checked=this.state.f;
      }
      this.setState({
        arr:this.state.arr
      })  
      this.bgtab()
    }); 
  }
  bgtab(){
    let n=0;
    var s=0;
    for(var j=0;j<this.state.arr.length;j++){
      //console.log(this.state.arr[j].checked,"1111111")
      if(this.state.arr[j].checked){
        n++;
        s+=this.state.arr[j].price*this.state.arr[j].count
      }
    }
    if(n>0){
      this.refs.btnbg.style.backgroundColor="#c00"
    }else{
      this.refs.btnbg.style.backgroundColor="#bbb"
    }
    //console.log("this",this)
    this.setState({
      buycount:n,
      buyprice:s
    },()=>{
      // console.log("aaaaaaaa",this.state.buyprice,"555555555",this.state.buycount)
    })
  }
  getmoney(){
    if(this.state.delete){//结算
      if(this.state.buycount<=0){
        return message.info("未选中商品")
      }else{
        return message.info("结算成功")
      }
    }else{//删除
      let delearr=[]
      let arr=this.state.arr;
      for(var i=0;i<arr.length;i++){//获取删除商品id
        if(arr[i].checked){
          delearr.push(arr[i].id)
        }
      }
      let token=localStorage.token;
      Axios.post("http://127.0.0.1:82/deletebyid",{idarr:delearr,token}).then(data=>{
        // console.log("data：",data);
        // console.log("11111111111",arr)
        for(var i=0;i<arr.length;i++){//获取删除商品id
          if(arr[i].checked){
            arr.splice(i,1);
            i--;
          }
        }
        // console.log("11111111111",arr)
        this.setState({
          arr:arr,
          buycount:"",
          buyprice:0
        })
        return message.info("删除成功")
      }).catch(err=>{
        console.log("err：",err)
        return message.info("删除失败")
      })
    
    }   
  }
  componentWillMount(){
    let token=localStorage.token;
    Axios.post("http://127.0.0.1:82/getshopcargoods",{token}).then((data)=>{
      //console.log("data",data);
      this.setState({
        arr:data.data.shopcar
      })
    }).catch(err=>{
      console.log("err",err);
    })
  }
  componentDidMount () {
    
  }
  render(){
    let ele;
    if(!this.state.arr){
      return null
    }
     if(this.state.arr.length==0){
       ele=<div className="con">
          <p><img src="http://127.0.0.1:82/shopcar.png"/></p> 
          <p>购物车空空如也~快去选购吧</p>
          <p><button onClick={this.gohome.bind(this)}>立即去选购</button></p>
      </div>
    }else if(this.state.arr.length>0){
      ele=<div>
        <ul>
          <li className="libox litop">
            <span className="sppp">{this.state.f? <i className="iconfont icon-xuanzhong" onClick={this.checkall.bind(this)}></i>: <i className="iconfont icon-xuanzhongyuandian1" onClick={this.checkall.bind(this)}></i>}</span>
              <span className="icn11"><i className="iconfont icon-dianpu1"></i>yysports咕咚</span>
              <span className="youhui">优惠券</span>
            </li>
          {this.state.arr.map((a,b)=>{
            return <li key={b} className="libox">
              <div className="lilf">
                {a.checked? <i className="iconfont icon-xuanzhong" onClick={this.check.bind(this,a,b)}></i>: <i className="iconfont icon-xuanzhongyuandian1" onClick={this.check.bind(this,a,b)}></i>}
              </div>
              <Link to={{pathname:"/items",state:{id:a.id,make:a.make,list:a.list}}} className="toitems">
              <div className="licon">
                <img src={"http://127.0.0.1:82/"+a.img}/>
              </div>
              <div className="lirig">
                <p className="shoptext">{a.text}</p>
                <p className="cls">{a.color}{a.size}</p>
                <Addminus arr={a} f={this.state.delete}/> 
                {/* <p><span className="pris">￥{a.price}</span><span className="cls cont">x{a.count}</span></p> */}
              </div>
              </Link>
            </li>
          })}
        </ul>
        <div className="btm1">
          <div className="btmlf">
          <span className="sppp">{this.state.f? <i className="iconfont icon-xuanzhong" onClick={this.checkall.bind(this)}></i>: <i className="iconfont icon-xuanzhongyuandian1" onClick={this.checkall.bind(this)}></i>}</span>
          </div>
          <div className="btmcon">
            合计(不含运费):￥{this.state.buyprice}元
          </div>
          <div className="btmrig">
            <button ref="btnbg" className="btnbg" onClick={this.getmoney.bind(this)}>{this.state.caozuo?"结算":"删除"}{this.state.caozuo?(this.state.buycount):""}</button>
          </div>
        </div>
      </div>
    }
    return (
      <div className="item">
       <div className="head">
          <div className="bb">
          <a onClick={this.rou.bind(this)}><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></a>
            购物车
            {this.state.arr.length==0?"":<span onClick={this.dele.bind(this)}>{this.state.delete?"编辑":"完成"}</span>}
          </div>
        </div> 
        {ele}
        
      </div>
    )
  }
  
}

export default Shopcar;
