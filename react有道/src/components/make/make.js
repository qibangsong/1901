import React from 'react';
import { Tabs } from 'antd';
// import BScroll from "better-scroll";
import axios from 'axios';
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import './make.css';
import {Icon} from 'antd';
const { TabPane } = Tabs;
class Make extends React.Component {
  constructor(props){
    super(props)
    this.state={
     make:this.props.location.state,
     arr:[]
    }
  }
  rou(){
    this.props.history.go(-1)
  }
  componentWillMount(){
    // console.log("1111111111",this.state.make)
    let obj={
      make:this.state.make.make
    }
    axios.post("http://127.0.0.1:82/getserver",obj).then((data)=>{
      // console.log("data",data);
      this.setState({
        arr:data.data[0].goods
      })
    }).catch((err)=>{
      console.log("err",err)
    })
  }
  render(){
    
    return (
     <div className="make">
       <div className="head">
          <a onClick={this.rou.bind(this)}><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></a>
          <div className= {"aa"}>
            <Icon type="search" style={{fontSize:"20px"}} className="icon1"/>
            <div className="sename">搜索商品名称</div>
          </div>
        </div> 
        <div className="server">
          {this.state.arr.map((a,b)=>{//店铺页数据
            return <div key={b} className="server1">{a.titgoods.map((i,j)=>{
              return <Link to={{pathname:"/items",state:{arr:i,id:i.id,make:i.make,list:i.list}}} className="items" key={j} target="_self">
              <div className="adgoods" >
              <img src={"http://127.0.0.1:82/"+i.img+".jpg"} alt="a.xinxi"/>
              <div className="xinxi">{i.xinxi}</div>
              <p>￥<span>{i.price.toFixed(2)}</span><span className="alitu">{i.jifen?<span> + <i className="iconfont icon-jifen"></i></span>:<span></span>}</span><span className="sp1">{a.jifen}</span></p>
              <p className="oldprice">￥{i.oldprice.toFixed(2)}</p>
            </div></Link>
              })}
            </div>
          })
          }
          {/* {JSON.stringify(this.state.arr)} */}
        </div>
     </div>
    );
  }
 
}

export default Make;
