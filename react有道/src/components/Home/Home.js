import React from 'react';
import axios from 'axios';
import {Icon} from 'antd';
import {Link} from "react-router-dom"
import Banner from '../banner/banner';
class Home extends React.Component{
  constructor(props){
    super(props)
    this.state={
      arr:[]
    }
  }
  rou(){
    let f=localStorage.f;
    if(f){
      this.props.history.push("/shopcar")
    }else{
      this.props.history.push("/register")
    }
  }
  indent(){
    let f=localStorage.f;
    if(f){
      this.props.history.push("/indent")
    }else{
      this.props.history.push("/register")
    }
  }
  componentDidMount(){
    axios.get("http://127.0.0.1:82/getData").then((data)=>{
      //console.log("data:",data)
      this.setState({
        arr:data.data.home
      },()=>{
        //console.log(this.state.arr)
      })
    }).catch((err)=>{
      console.log("err",err);
      //console.log("a.span",this.state.arr.home)
    })
  }
  render(){
    if(this.state.arr.length===0){
      return null;
    }
    //console.log("this.state.arr.banner",this.state.arr.banner)
    return (
      <div className="h1">
        <div className="head">
          <Link to="/nav" className="routernav"><Icon type="menu" className="icon2" style={{color: "#fff"}}/></Link>
          <div className= {"aa"}>
            <Icon type="search" style={{fontSize:"20px"}} className="icon1"/>
            <div className="sename">搜索商品名称</div>
          </div>
        </div>       
        <div className="banner">
              <Banner imgs={this.state.arr.banner}></Banner>
        </div>
        <div className="black">
        </div>
        <div className="shopcar">
          <a className="shopbg1"><img src="http://127.0.0.1:82/bg1.jpg" alt="1"/></a>
          <a className="shopbg2" onClick={this.rou.bind(this)}><img src="http://127.0.0.1:82/bg2.jpg" alt="2"/></a>
          <a className="shopbg3" onClick={this.indent.bind(this)}><img src="http://127.0.0.1:82/bg3.jpg" alt="3"/></a>
        </div>
        {/* 品牌 */}
        <div className="shopimg">
            {this.state.arr.make.map((a,b)=>{
              return <Link to={{pathname:"/make",state:{make:a.make}}}  key={b}><img src={"http://127.0.0.1:82/"+a.img+".jpg"} alt="4"/></Link>
            })}
         
        </div>
           {/* 品牌结束 */}
           {/* 积分商城 */}
        <div className="jfshop">
          <img src="http://127.0.0.1:82/jifen.jpg" alt="1"/>
        </div>
        {/* 积分商城结束 */}
        <div className="ad">
          {this.state.arr.ad.map((a,b)=>{
            return  (
            <Link to={{pathname:"/items",state:{arr:a,id:a.id,make:a.make,list:a.list}}} className="items" key={b} target="_self">
            <div className="adgoods" >
            <img src={"http://127.0.0.1:82/"+a.img+".jpg"} alt="a.xinxi"/>
            <div className="xinxi">{a.xinxi}</div>
            <p>￥<span>{a.price.toFixed(2)}</span><span className="alitu">{a.jifen?<span> + <i className="iconfont icon-jifen"></i></span>:<span></span>}</span><span className="sp1">{a.jifen}</span></p>
            <p className="oldprice">￥{a.oldprice.toFixed(2)}</p>
          </div></Link>)
          })}
        </div>
        {/* adidas结束0 */}
        <div className="chaofu">
          <div className="cfgoodstitle">
            <img src="http://127.0.0.1:82/chaofu.jpg" alt="1"/>
          </div>
          <div className="cfgoods1">
            <img src="http://127.0.0.1:82/chaofu1.jpg" alt="1"/>
          </div>
          <div className="cfgoods2">
            <img src="http://127.0.0.1:82/chaofu2.jpg" alt="1"/>
            <img src="http://127.0.0.1:82/chaofu3.jpg" alt="1"/>
          </div>
        </div>
        {/* 潮服结束 */}
        <div className="renqi">
          <div className="cfgoodstitle">
            <img src="http://127.0.0.1:82/renqi0.jpg"/>
          </div>
          {this.state.arr.renqi.map((a,b)=>{
            return  (
            // <Link to="/items" className="items"key={b}>
            <a  className="items"key={b}>
            <div className="adgoods"  >
             <img src={"http://127.0.0.1:82/"+a.img+".jpg"}  alt="a.xinxi"/>
            <div className="xinxi">{a.xinxi}</div>
            <p>￥<span>{a.price.toFixed(2)}</span><span className="alitu">{a.jifen? + <i className="iconfont icon-jifen"></i>:<span></span>}</span><span className="sp1">{a.jifen}</span></p>
            <p className="oldprice">￥{a.oldprice.toFixed(2)}</p>
          </div>
          </a>
          // </Link>
          )
          })}
        </div>
        {/* 人气推荐结束 */}
        <div className="huanxin">
          <div className="cfgoodstitle">
            <img src="http://127.0.0.1:82/huanxin0.jpg" alt="1"/>
          </div>
          <div className="hxgoods1">
            <img src="http://127.0.0.1:82/huanxin1.jpg" alt="1"/>
          </div>
          <div className="hxgoods2">
            <img src="http://127.0.0.1:82/huanxin2.jpg" alt="1"/>
            <img src="http://127.0.0.1:82/huanxin3.jpg" alt="1"/>
          </div>
          <div className="hxgoods2">
            <img src="http://127.0.0.1:82/huanxin4.jpg" alt="1"/>
            <img src="http://127.0.0.1:82/huanxin5.jpg" alt="1"/>
          </div>
        </div> 
        {/* 换新结束 */}
        <div className="xinpin">
          <div className="cfgoodstitle">
            <img src="http://127.0.0.1:82/xinpin.jpg"  alt="5"/>
          </div>
          {this.state.arr.xinpin.map((a,b)=>{
            return  (
            // <Link to="/items" className="items" key={b}>
            <a  className="items" key={b}>
            <div className="adgoods">
              <img src={"http://127.0.0.1:82/"+a.img+".jpg"}/>
              <div className="xinxi">{a.xinxi}</div>
              <p>￥<span>{a.price.toFixed(2)}</span><span className="alitu">{a.jifen? + <i className="iconfont icon-jifen"></i>:<span></span>}</span><span className="sp1">{a.jifen}</span></p>
              <p className="oldprice">￥{a.oldprice.toFixed(2)}</p>
            </div>
          {/* // </Link> */}
          </a>)
          })}
        </div>
      </div>
    );
  }
 
}

export default Home;
