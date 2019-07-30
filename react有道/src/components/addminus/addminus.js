import React from 'react';
import 'swiper/dist/css/swiper.min.css'
import './addminus'
import './addminus.css'
import { message } from 'antd';
class Addm extends React.Component{
  constructor(props){
    super(props)
    this.state={
      arr:[],
      count:0
    }
  }
  minus(e){
    e.preventDefault();
    let count=this.state.arr.count-1;
    if(count>=1){
      this.state.arr.count=count;
      this.setState({
        arr:this.state.arr
      })
      // console.log(this.state.arr.count);
    }
    
  }
  add(e){
    e.preventDefault();
    // this.setState({
    //   arr:this.state.arr.count+1
    // })
    let count=this.state.arr.count+1;
    if(count<=this.state.kucuncount){//不能超出库存数量
      this.state.arr.count=count;
      this.setState({
        arr:this.state.arr
      })
      // console.log(this.state.arr)
    }else{
      message.info("超出可购买数量")
    }
   
  }
  componentWillMount(){
   // console.log("5555555555555",this.props.arr)
    this.setState({
      arr:this.props.arr,
      count:this.props.arr.count,
      kucuncount:this.props.arr.kucuncount
    },()=>{
     // console.log("66666666666",this.state.arr)
    })
  }
  render(){
    let ele;
  if(!this.props.f){
     ele=<p>
        <button onClick={this.minus.bind(this)}>-</button>
          <span>{this.state.arr.count}</span>
        <button onClick={this.add.bind(this)}>+</button>
      </p>
  }else{
    // return null
    ele=<div className="dd"><p><span  className="pris">￥{this.state.arr.price}</span><span  className="cls cont">x{this.state.arr.count}</span></p></div>
    // ele=<p><span className="pris">￥{this.state.arr.price}</span><span className="cls cont">x{this.state.arr.count}</span></p>
  }
      
     
    
    return (
      ele  
    )
  }
  
}

export default Addm;
