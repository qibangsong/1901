import React from 'react';
import { Tabs, message } from 'antd';
// import BScroll from "better-scroll";
import axios from 'axios';
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import './makeitems.css';
import {Icon} from 'antd';
const { TabPane } = Tabs;
class Makeitems extends React.Component {
  constructor(props){
    super(props)
    this.state={
     make:this.props.location.state,
     arr:[],
     index:0,
     showarr:[]
    }
  }
  rou(){
   
    this.props.history.go(-1)
  }
  sort(i){
    // localStorage.index=i
    this.setState({
      index:i
    })
    if(i==0){//默认排序
      let arr=this.state.showarr;
      let newarr=arr.sort((a,b)=>{
        return a.id-b.id
      })
      this.setState({
        showarr:this.state.arr
      })
    }else if(i==1){//销量排序
      let arr=this.state.showarr;
      let newarr=arr.sort((a,b)=>{
        return a.sellcount-b.sellcount
      })
      this.setState({
        showarr:newarr
      },()=>{
        console.log(this.state.arr,"111111111")
      })
    }else if(i==2){//价格排序
      let arr=this.state.showarr;
      let newarr=arr.sort((a,b)=>{
        return a.price-b.price
      })
      this.setState({
        showarr:newarr
      },()=>{
        console.log(this.state.arr,"000000000")
      })
    }
  }
  componentWillMount(){
    // console.log("1111111111",this.state.make)
    let obj={
      make:this.state.make.make,
      tit:this.state.make.tit
    }
    // let i=localStorage.index?localStorage.index:0
    axios.post("http://127.0.0.1:82/getserver1",obj).then((data)=>{
      console.log("data",data.data);
      if(data.data.length==0){
        message.info("暂无该类商品")
      }
      this.setState({
        arr:[...data.data],
        showarr:[...data.data]
        // index:i
      },()=>{
        // console.log("222222222222",this.state.arr)
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
        <div className="flex1">
          <div className={this.state.index==0?"act":""} onClick={this.sort.bind(this,0)}>
            默认排序
          </div>
          <div className={this.state.index==1?"act":""} onClick={this.sort.bind(this,1)}>
            按销量
          </div>
          <div className={this.state.index==2?"act":""} onClick={this.sort.bind(this,2)}>
            按价格
          </div>
          <div className={this.state.index==3?"act":""} onClick={this.sort.bind(this,3)}>
            筛选
          </div>
        </div>
        <div className="server2">
          {this.state.showarr.map((i,j)=>{//店铺页数据
              return<Link to={{pathname:"/items",state:{arr:i,id:i.id,make:i.make,list:i.list}}} className="items" target="_self" key={j}>
              <div className="adgoods" >
              <img src={"http://127.0.0.1:82/"+i.img+".jpg"} alt="a.xinxi"/>
              <div className="xinxi">{i.xinxi}</div>
              <p>￥<span>{i.price.toFixed(2)}</span><span className="alitu">{i.jifen?<span> + <i className="iconfont icon-jifen"></i></span>:<span></span>}</span><span className="sp1">{i.jifen}</span></p>
              <p className="oldprice">￥{i.oldprice.toFixed(2)}</p>
            </div></Link>
          })
          }
        </div>
     </div>
    );
  }
 
}

export default Makeitems;
