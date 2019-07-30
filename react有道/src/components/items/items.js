import React from 'react';
import {Icon} from 'antd';
import "./items.css"
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import { message,  Spin } from 'antd';
import Axios from 'axios';
import BScroll from "better-scroll";
message.config({
  top: 300,
  duration: 2,
  maxCount: 3,
});
class Item extends React.Component{
  constructor(props){
    super(props)
    this.state={
      arr:[],
      f:false,
      count:1,
      color:"",
      index:"",
      size:'',
      index1:"",
      kucuncount:0,
      img:"",
      price:"",
      text:'',
      moren:true,
      allimgtext:[],
      allimgtext1:[],
      upshow:"upshow",
      topshow:false,//控制下拉文本
      allshow:false,//控制上拉文本
      waittime:false//控制请稍后文本
    }
  }
  getcolor(cl,i){//获取颜色,及库存
    this.setState({
      color:cl,
      index:i,
      kucuncount:0,
      moren:false//点击颜色时库存清0
    },()=>{
      // console.log("000000000",this.state.moren);
      let arr=this.state.arr.size;
      //console.log("aaa",arr);
      for(var i=0;i<arr.length;i++){
        if(arr[i].type==this.state.size&&arr[i].goodscolor==this.state.color){//当选中的颜色和尺码与数据中一一对应的时候，设置库存
          this.setState({
            kucuncount:arr[i].count
           
          })
        }
      }
    })
    
  }
  getsize(size,i){//获取尺码，及库存
    this.setState({
      size:size,
      index1:i
    }
    ,()=>{
      let arr=this.state.arr.size;
      for(var i=0;i<arr.length;i++){
        if(arr[i].type==this.state.size&&arr[i].goodscolor==this.state.color){//当选中的颜色和吃法与数据中一一对应的时候，设置库存
          this.setState({
            kucuncount:arr[i].count
          },()=>{
            //console.log("11111111",this.state)
          })
        }
      }
    })
  }
  chose(){//关闭页面
    this.setState({
      f:!this.state.f
    })
  }
  minus(){//数量减1
    if(this.state.count>1){
      this.setState({
        count:--this.state.count
      })
    }
    
  }
  add(){//数量加1
    if(this.state.count<this.state.kucuncount){
      this.setState({
        count:++this.state.count
      })
    }else{
      return message.info("超出库存数量")
    }
   
  }
  andsure(){
    if(this.state.count>this.state.kucuncount){
      return message.info("存货量不足，请选择其他型号或颜色")
    }
    console.log("this.state加入购物车",this.state);
    let token=localStorage.token
    let obj={//加入购物车信息
      token:token,
      id:this.state.id,
      color:this.state.color,
      count:this.state.count,
      size:this.state.size,
      img:this.state.img,
      price:this.state.price,
      text:this.state.text,
      checked:false,
      make:this.state.make,
      list:this.state.list,
      kucuncount:this.state.kucuncount
    };

    Axios.post("http://127.0.0.1:82/addshopcar",obj).then((data)=>{
      // console.log("data",data);
      this.setState({
        f:false
      })
      return message.info("加入购物车成功")

    }).catch((err)=>{
      console.log("err",err);
    })
  }
  addf(){
    this.setState({
      f:true
    })
  }
  toshopcar(){
    let token=localStorage.token;
    if(token){
      this.props.history.push("/shopcar")
    }else{
      this.props.history.push("/register")
      return message.info("请先登录")
    }
   
  }
  componentWillMount(){
    // let id=this.props.location.state.id;//id
    // let make=this.props.location.state.make;//品牌
    // let list=this.props.location.state.list;//种类
    // Axios.post("http://127.0.0.1:82/getidgoods",{id,make,list}).then(data=>{
    //   console.log("路由传递data",data);
    //   let data1=data.data.data
    //   this.setState({
    //     arr:data1,//商品数据
    //     id:data1.id,//商品id
    //     kucuncount:data1.count,//商品库存
    //     img:data1.showimg[0],//图片
    //     price:data1.price,//价格
    //     text:data1.xinxi,//描述
    //     make:data1.make,//品牌
    //     list:data1.list//种类
    //   },()=>{
    //     console.log("000000000000000",this.state.make)
    //   })
    // }).catch(err=>{
    //   console.log("路由传递err",err)
    // })
    // this.setState({
    //   // arr:this.props.location.state.arr,
    //   // id:this.props.location.state.id,
    //   // kucuncount:this.props.location.state.arr.count,
    //   // img:this.props.location.state.arr.showimg[0],
    //   // price:this.props.location.state.arr.price,
    //   // text:this.props.location.state.arr.xinxi
    // })
  }
  rou(){
    this.props.history.goBack()
  }
  componentDidMount () {
    let id=this.props.location.state.id;//id
    let make=this.props.location.state.make;//品牌
    let list=this.props.location.state.list;//种类
    Axios.post("http://127.0.0.1:82/getidgoods",{id,make,list}).then(data=>{
      console.log("路由传递data",data);
      let data1=data.data.data
      this.setState({
        arr:data1,//商品数据
        id:data1.id,//商品id
        kucuncount:data1.count,//商品库存
        img:data1.showimg[0],//图片
        price:data1.price,//价格
        text:data1.xinxi,//描述
        make:data1.make,//品牌
        list:data1.list,
        allimgtext:data1.allimg//种类
      },()=>{
        //console.log("000000000000000",this.state.make);
        var swiper= new Swiper('.mysp', {
          observer:true,//修改swiper自己或子元素时，自动初始化swiper
          observeParents:true,//修改swiper的父元素时，自动初始化swiper
          autoplay: true,
          loop: true,
          pagination : {
              el: '.mysw',
          }
        });
        let bscrollDom = this.refs.scroll;
        this.aBScroll = new BScroll(bscrollDom,{
          click:true,
          scrollY: true,
          pullUpLoad: {
            threshold: 50
          },
          pullDownRefresh: {
            threshold: 50,
            stop: 50
          }
        })
        let that=this;
        this.aBScroll.on("pullingUp", function(){//上拉加载
          console.log('正在加载....');
          that.setState({
            upshow:"",
            waittime:true
          },()=>{
            setTimeout(()=>{
              that.setState({
                allimgtext1:that.state.allimgtext,
                allshow:true,//控制下拉刷新文本
                waittime:false
              })
              that.aBScroll.refresh();
              that.aBScroll.finishPullDown()
            },2000)
            
          })
        })
        this.aBScroll.on("pullingDown", function(){//下拉刷新
          that.setState({
            topshow:true
          },()=>{
            setTimeout(()=>{
              that.setState({
                topshow:false
              })
              that.aBScroll.refresh();
              that.aBScroll.finishPullDown()
            },2000)
          })
        })
      })
    }).catch(err=>{
      console.log("路由传递err",err)
    })
  }
 
  render(){
    // if(this.state.arr.length==0){
    //   return null;
    // }
    if(!this.state.arr.showimg){
      return null;
    }
    var con=this.state.arr;
    let sv;
    if(this.state.moren){
       sv=con.size.map((a,b)=>{
        if(a.goodscolor==con.size[0].goodscolor){
          return <li key={b}  onClick={this.getsize.bind(this,a.type,b,a.count,a.goodscolor)}  className={this.state.index1===b?"actch":""}>{a.type}</li>
        }
      })
    }else{
      sv="";
    }
    
    let ssize=con.size.map((a,b)=>{
      if(a.goodscolor==this.state.color){
        return <li key={b}  onClick={this.getsize.bind(this,a.type,b,a.count,a.goodscolor)}  className={this.state.index1===b?"actch":""}>{a.type}</li>
      }else{
        return null;
      }
    })
    let ele;
    if(this.state.f){
      ele=<div className="elsepag">
        <div className="addcar">
        <span onClick={this.chose.bind(this)} className="xxx"><Icon type="close" className="close1"/></span>
          <div className="toop">
            <img src={"http://127.0.0.1:82/"+con.img+".jpg"}/>
            <div>
              <p>￥{con.price}</p>
              <p>库存：{this.state.kucuncount}</p>
              <p>请选择 颜色 尺码</p>
            </div>
          </div>
          <div className="colorsize">
            <label>颜色</label>
            <ul>
              {con.color.map((a,b)=>{
                return  <li onClick={this.getcolor.bind(this,a,b)} key={b} className={this.state.index===b?"actch":""}>{a}</li>
              })}
             
            </ul>
            <label>尺码</label>
            <ul className="size">
              {sv}
              {ssize}
            </ul>
            <div className="pppp">
              <label>购买数量</label>
              <div>
                <p>
                <button onClick={this.minus.bind(this)}>-</button>
                <span>{this.state.count}</span>
                <button onClick={this.add.bind(this)}>+</button>
                </p>
              </div>
            </div>
            <div className="sure">
              <button onClick={this.andsure.bind(this)}>确定</button>
            </div>
          </div>
        </div>
      </div>
    }else{
      ele=""
    }
    return (
      <div className="item">
        <div className="head">
          <div className="bb">
          <a onClick={this.rou.bind(this)}><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></a>
            商品详情页
          </div>
        </div>   
       
        <div className="scroll"   ref="scroll">
          <div>
          <div className={this.state.topshow?"wait5":"wait6"}><div>更新中，请稍后<Spin /></div></div>
        <div>
          <div className="swiper-container mysp">
          <div className="swiper-wrapper">
                {this.state.arr.showimg.map((a,b)=>{
                  return  <div className="swiper-slide" key={b}><img src={"http://127.0.0.1:82/"+a} alt="2"/></div>
                })}
            </div>
            {/* <!-- 如果需要分页器 --> */}
            <div className="swiper-pagination mysw"></div>
            
            {/* <!-- 如果需要导航按钮 --> */}
            {/* <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div> */}
            
            {/* <!-- 如果需要滚动条 --> */}
            {/* <div className="swiper-scrollbar"></div> */}
          </div>
        </div>
        <div className="con-pri">
          <p className="item-name">{con.xinxi}</p>
          <p className="pri">￥{con.price}</p>
          <p className="itemprice">￥{con.oldprice}</p>
          <p className="clear"><span className="note">已售{JSON.stringify(con.sellcount)}件</span></p> 
        </div>
        <div className="juan">
          <p className="ling">
            <label>领劵</label>
            <Icon type="right" className="ricon"/>
          </p>
          <p className="chose" onClick={this.chose.bind(this)}>
            <label className="la">请选择</label>
            <span>颜色</span>
            <span>尺码</span>
            <Icon type="ellipsis"  className="ricon r1"/>
          </p>
        </div>
        <div className={this.state.allshow?"wait1":"wait"}>
          <p>上拉加载更多</p>
        </div>
        <div className={this.state.waittime?"wait3":"wait4"}><div>请稍后<Spin /></div></div>
        {this.state.allimgtext1.map((a,b)=>{
          return <div key={b} className={this.state.upshow}><img src={"http://127.0.0.1:82/"+a}/></div>
        })}
        {/* 上拉加载 */}
        </div>
        </div>
        {ele}
        <div className="btm">
          <div className="bleft">
            <div>
              <i className="iconfont icon-gouwuche icon3"></i>
              <p onClick={this.toshopcar.bind(this)}>购物车</p>
            </div>
            <div>
              <i className="iconfont icon-star_full icon3"></i>
              <p>未收藏</p>
            </div>
           
          </div>
          <div className="bright">
            <div className="addshopcar">
              <button onClick={this.addf.bind(this)}>加入购物车</button>
            </div>
            <div className="buygoods">
              <button  onClick={this.addf.bind(this)}>立即购买</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
}

export default Item;
