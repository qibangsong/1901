import React from 'react';
import './App.css';
import {BrowserRouter as Router,Link,Route} from "react-router-dom"
import Home from "./components/Home/Home"
import Nav from "./components/Nav/Nav"
import Items from "./components/items/items"
import Forget from "./components/forget/forget"
import Zhuce from "./components/zhuce/zhuce"
import Register from "./components/register/register"
import Shopcar from "./components/shopcar/shopcar"
import Indent from "./components/indent/indent"
import Make from "./components/make/make"
import Makeitems from "./components/makeitems/makeitems"
class App extends React.Component{
	constructor(props) {
	    super(props);
			this.state={
				f:true
			}
  }
	render(){
  
		return (
		  <div className="App">
        <div className="route">
          <Router>
            <div className="home">
              <Route path="/" exact component={Home}></Route>	
              <Route path="/nav" component={Nav}></Route>
              <Route path="/items" component={Items}></Route>
			  <Route path="/register" component={Register}></Route>
			  <Route path="/forget" component={Forget}></Route>
			  <Route path="/zhuce" component={Zhuce}></Route>
			  <Route path="/shopcar" component={Shopcar}></Route>
			  <Route path="/indent" component={Indent}></Route>
			  <Route path="/make" component={Make}></Route>
			  <Route path="/makeitems" component={Makeitems}></Route>
            </div>
          </Router>	
        </div>
		  </div>
		);
	}
  
}

export default App;
