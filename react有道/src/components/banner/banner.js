import React from 'react';
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
class Banner extends React.Component{
  constructor(props){
    super(props)
    this.state={

    }
  }
  componentDidMount () {
    var mySwiper= new Swiper('.swp1', {
      autoplay: true,
      loop: true,
      pagination : {
          el: '.swp2',
      }
    });
  }
  render(){
   
    if(!this.props.imgs){
      return null
    }
    //console.log("this.props",this.props.imgs)
    return (
      <div className="Banner">
        <div className="swiper-container swp1">
            <div className="swiper-wrapper">
                {this.props.imgs.map((a,b)=>{
                  return  <div className="swiper-slide" key={b}><img src={"http://127.0.0.1:82/"+a} alt="2"/></div>
                })}
            </div>
            {/* <!-- 如果需要分页器 --> */}
            <div className="swiper-pagination swp2"></div>
            
            {/* <!-- 如果需要导航按钮 --> */}
            {/* <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div> */}
            
            {/* <!-- 如果需要滚动条 --> */}
            <div className="swiper-scrollbar"></div>
        </div>
        {/* 导航等组件可以放在container之外 */}
        
      </div>
    );
  }
  
}

export default Banner;
