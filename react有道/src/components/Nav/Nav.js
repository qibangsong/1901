import React from 'react';
import { Tabs } from 'antd';
import BScroll from "better-scroll";
import axios from 'axios';
import {Link} from "react-router-dom"
import './nav.css';
import {Icon} from 'antd';
const { TabPane } = Tabs;
class Nav extends React.Component {
  constructor(props){
    super(props)
    this.state={
      arr:[],
      checked:[]
    }
  }
  tabs(i){
    this.setState({
      checked:this.state.arr[i]
    })
  }
  componentDidMount(){
    axios.get("http://127.0.0.1:82/getleimu").then((data)=>{
      // console.log("data:",data)
      this.setState({
        arr:data.data.leimu,
        checked:data.data.leimu[0]
      },()=>{
        // console.log(this.state.arr);
        let bscrollDom = this.refs.bscroll;
        this.aBScroll = new BScroll(bscrollDom,{
          click:true
        })
      })
    }).catch((err)=>{
      console.log("err",err);
      // console.log("a.span",this.state.arr.home)
    })
  }
  render(){
    if(this.state.arr.length===0){
      return null;
    }
    return (
      <div className="nav1">
        <div className="head">
          <div className="bb">
          <Link to="/" ><Icon type="left" className="icon2 ico" style={{color: "#fff"}}/></Link>
            类目
          </div>
        </div>   
       <div className="lmleft">
         <ul>
           {this.state.arr.map((a,b)=>{
             return <li key={b} onClick={this.tabs.bind(this,b)} className={this.state.checked===this.state.arr[b]?"active":""}>{a.tab}</li>
           })}
         </ul>
       </div>
       <div ref="bscroll" className="bsl">
       <div className="lmright">
         {this.state.checked.allgoods.map((a,b)=>{
           return <div className="leimus" key={b}>
            <a className="leimua">
             <div className="leimuadiv">{a.type}</div>
            </a>
            <div className="goodsleimu">
            {a.goods.map((x,y)=>{
              return <div key={y}>
                <Link to={{pathname:"/makeitems",state:{make:a.type,tit:x.tit}}}>
                  
                  <img src={"http://127.0.0.1:82/"+x.titimg}/><br/>
                  {x.tit}
              
                </Link>
              </div> 
            })}
            </div>
           </div>
         })}
       </div>
       </div>
      </div>
    );
  }
 
}

export default Nav;
