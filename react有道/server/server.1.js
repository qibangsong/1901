var express=require("express");
var fs=require("fs");
var app=express();
var bodyParser=require("body-parser");
const jwt = require("jsonwebtoken");//引入token模块
var fileJson="./data/data.json";
const secret="kissKillYou";//token秘钥
//跨域
//跨域问题(cors)
/*app.use("*", function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader("Access-Control-Allow-Methods", "*");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	next();
});*/
app.use("*", function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header("Access-Control-Allow-Methods", "*");
	res.header("Access-Control-Allow-Headers", "content-type");
	next();
});

//静态资源
//app.use(express.static("./public/jquery"));
//app.use(express.static("./public/css"));
app.use(express.static("./img"));

//// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser=bodyParser.urlencoded({extended:false});//1.1接收前台用post传递过来的字符串

//主页
app.get("/",function(req,res){
	//console.log("__dirname:",__dirname);
	res.send("这是主页");
	//res.sendFile(__dirname+"/"+filePage);//
});

//a2: addGet
app.get("/addGet",function(req,res){
	var obj=req.query;
	// console.log("addGet obj:",obj);
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			obj.id=new Date().getTime()+"";
			arr.unshift(obj);
			var str2=JSON.stringify(arr);
			// console.log("get添加：",obj)
			fs.writeFile(fileJson,str2,function(err){
				if(err){
					res.send({s:2})
				}else{
					res.send({s:0})
				}
			})
		}
	})
});


app.post("/sendphone",bodyParser.json(),function(req,res){//发送4位验证码
	var obj=req.body;
	//console.log("objjjj:",obj);
	var str1="";
	for(var i=0;i<4;i++){
		var n=parseInt(Math.random()*10);
		str1+=n;
	}
	//console.log("111111",str1);
	res.send({str:str1});
})
//a4: addPost
app.post("/addPost",bodyParser.json(),function(req,res){//注册
	var obj=req.body;
	//console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			let f;
			for(var i=0;i<arr.length;i++){
				if(arr[i].user==obj.user){
					
					f=true;
					break;
				}else{
					f=false;
				}
			}
			if(f){
				res.send({s:111});
			}else{
				obj.id=new Date().getTime()+"";
				obj.shopcar=[];
				arr.unshift(obj);
				var str2=JSON.stringify(arr);
				fs.writeFile(fileJson,str2,function(err){
					if(err){
						res.send({s:2})
					}else{
						res.send({s:0})
					}
				})
			}
			
		}
	})
});
app.post("/getshopcargoods",bodyParser.json(),function(req,res){//获取购物车
	var obj=req.body;
	//console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			let token=obj.token;
			//token转译成信息
			jwt.verify(token,secret,function(err,decoded){
				if(err){
					console.log("err:",err,"\nerr.message:",err.message);
				}else{
					// console.log("decoded:",decoded,"时间戳:",new Date().getTime());
					var str=data.toString();
					var arr=JSON.parse(str);
					let aa;
					for(var i=0;i<arr.length;i++){
						if((decoded.user==arr[i].user||decoded.user==arr[i].phone)&&decoded.psd==arr[i].psd){
							aa=arr[i].shopcar	
						}
					}
					//console.log("aaaa",aa)
					res.send({shopcar:aa})
				}
			})		
		}
	})
});
app.post("/addshopcar",bodyParser.json(),function(req,res){//加入购物车
	var obj=req.body;
	//console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			let token=obj.token;
			//token转译成信息
			jwt.verify(token,secret,function(err,decoded){
				if(err){
					console.log("err:",err,"\nerr.message:",err.message);
				}else{
					//console.log("decoded:",decoded,"时间戳:",new Date().getTime());
					var str=data.toString();
					var arr=JSON.parse(str);
					for(var i=0;i<arr.length;i++){
						if((decoded.user==arr[i].user||decoded.user==arr[i].phone)&&decoded.psd==arr[i].psd){//找到用户
							delete obj.token;
							// arr[i].shopcar.unshift(obj);
							let f;
							if(arr[i].shopcar.length==0){
								arr[i].shopcar.unshift(obj);
							}else{
								for(var k=0;k<arr[i].shopcar.length;k++){
									if(arr[i].shopcar[k].id==obj.id&&arr[i].shopcar[k].make==obj.make&&arr[i].shopcar[k].color==obj.color&&arr[i].shopcar[k].size==obj.size){
										//console.log(obj.count,"111111",arr[i].shopcar[k].count)
										arr[i].shopcar[k].count+=obj.count;
										f=true
										break;
									}else{
										f=false;	
									}
								}
								if(!f){
									arr[i].shopcar.unshift(obj);
								}
							}
							break;
						}
					}
					var str2=JSON.stringify(arr);
					fs.writeFile(fileJson,str2,function(err){
						if(err){
							res.send({s:2})
						}else{
							res.send({s:0})
						}
					})
				}
			})		
		}
	})
});
app.post("/login",bodyParser.json(),function(req,res){//登录验证
	var obj=req.body;
	//console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			let s="";
			const token=jwt.sign(obj, secret,{expiresIn:600000});
			for(var i=0;i<arr.length;i++){
				if((arr[i].user==obj.user||arr[i].phone==obj.user)&&arr[i].psd==obj.psd){
					s=true
					res.send({s:s,token:token});
					break;
				}else{
					s=false;
					res.send({s:s});
				}
			}	
		}
	})
});
app.post("/updata",bodyParser.json(),function(req,res){//修改密码
	var obj=req.body;
	// console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			let s;
			for(var i=0;i<arr.length;i++){
				if(arr[i].phone==obj.phone){
					arr[i].psd=obj.psd;
					s=true;
					break;
				}else{
					s=false;
				}
			}
			//res.send({s:s});	
			// console.log("aaaaaa",arr)
			var str3=JSON.stringify(arr);
			// console.log("aaaaaaaaaa",str3)
			fs.writeFile(fileJson,str3,function(ee){
				if(ee){
					res.send({s:s})
				}else{
					res.send({s:s})
				}
			})
		}
	})
});
app.get("/getcode",function(req,res){//获取图片
	fs.readFile("./data/home.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			let data1=JSON.parse(data)
			//console.log("dataaa",data1)
			let img=data1.codeimg;
			var n=parseInt(Math.random()*5);
			let obj=img[n]
			//console.log("obj",obj);
			res.send(obj);
			
		}
	})
})
app.post("/addPostStr",urlencodedParser,function(req,res){
	var obj=req.body;
	// console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			obj.id=new Date().getTime()+"";
			arr.unshift(obj);
			var str2=JSON.stringify(arr);
			fs.writeFile(fileJson,str2,function(err){
				if(err){
					res.send({s:2})
				}else{
					res.send({s:0})
				}
			})
		}
	})
});
app.post("/getidgoods",bodyParser.json(),function(req,res){//根据id查找商品，品牌，种类
	var obj=req.body;
	//console.log("addgeiidgoods :",obj);
	//res.send({s:0});
	fs.readFile("./data/leimu.json",function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			//console.log("arrrrrrrrrrr",arr)
			let obj1;
			for(var i=0;i<arr.leimu[0].allgoods.length;i++){//找到品牌
				if(arr.leimu[0].allgoods[i].type==obj.make){
					obj1=arr.leimu[0].allgoods[i].goods;
					break;
				}
			}
			//console.log("obj1111111111",obj1);
			let arr1;
			for(var j=0;j<obj1.length;j++){//找到鞋类
				if(obj1[j].tit==obj.list){
					arr1=obj1[j].titgoods
					break;
				}
			}
			//console.log("arr1111111",arr1);
			let sendarr;
			for(var x=0;x<arr1.length;x++){//找到id
				if(arr1[x].id==obj.id){
					sendarr=arr1[x];
					break;
				}
			}
			res.send({data:sendarr})//返回数据
		}
	})
});
app.get("/gethome",(req,res)=>{
	console.log("getData");
	res.sendFile(__dirname+"./data/home.json");
/*	fs.readFile(dataJson,(err,data)=>{
		if(err){
			res.send({error:8})
		}else{
			res.send({data:data.toString()});
		}
	})*/
})
//a6
app.get("/getData",function(req,res){
	fs.readFile("./data/home.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			res.send(data);
			
		}
	})
})
app.post("/getserver",bodyParser.json(),function(req,res){//获取品牌数据
	var obj=req.body
	fs.readFile("./data/leimu.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			let arr1=arr.leimu[0].allgoods;
			let showarr=[];
			// console.log("obj",obj)
			for(var i=0;i<arr1.length;i++){
				if(obj.make==arr1[i].type){
					showarr.push(arr1[i])
				}
			}
			res.send(showarr);
			
		}
	})
})
app.post("/getserver1",bodyParser.json(),function(req,res){//获取品牌+种类数据
	var obj=req.body
	fs.readFile("./data/server.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			let showarr=[];
			// console.log("obj",obj)
			let showarr1=[];
			// console.log(arr)
			for(var i=0;i<arr.length;i++){
				for(var o in arr[i]){
					// console.log("33333333",arr[i][o])
					if(arr[i][o]==obj.make){
						// console.log(arr[i][o])
						showarr.push(arr[i])
					}
				}
			}
				// console.log(showarr.length);
				for(var j of showarr){
					for(var x in j){
						if(j[x]==obj.tit){
							showarr1.push(j);
						}
					}
				}
			
			res.send(showarr1);
		}
	})
})
app.post("/updatacount",bodyParser.json(),function(req,res){//获取品牌数据
	var obj=req.body;
	fs.readFile("./data/data.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			let token=obj.token;
			//token转译成信息
			jwt.verify(token,secret,function(err,decoded){//修改购物车信息
				if(err){
					console.log("err:",err,"\nerr.message:",err.message);
				}else{
					var str=data.toString();
					var arr=JSON.parse(str);
					// console.log(obj,decoded);
					for(var k in obj.shopcar){
						obj.shopcar[k].checked=false
					  }
					for(var i=0;i<arr.length;i++){
						if((decoded.user==arr[i].user||decoded.user==arr[i].phone)&&decoded.psd==arr[i].psd){
							delete obj.token;
							arr[i].shopcar=obj.shopcar;
						}
					}
					var str2=JSON.stringify(arr);
					fs.writeFile("./data/data.json",str2,function(err){
						if(err){
							res.send({s:2})
						}else{
							res.send({s:0})
						}
					})
				}
			})		
		}
	})
})
app.post("/deletebyid",bodyParser.json(),function(req,res){//获取品牌数据
	var obj=req.body
	fs.readFile("./data/data.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			let token=obj.token;
			//token转译成信息
			jwt.verify(token,secret,function(err,decoded){//修改购物车信息
				if(err){
					console.log("err:",err,"\nerr.message:",err.message);
				}else{
					var str=data.toString();
					var arr=JSON.parse(str);
					// console.log(obj,decoded);
					for(var i=0;i<arr.length;i++){
						if((decoded.user==arr[i].user||decoded.user==arr[i].phone)&&decoded.psd==arr[i].psd){
							delete obj.token;
							for(var j=0;j<arr[i].shopcar.length;j++){
								for(var k=0;k<obj.idarr.length;k++){
									if(arr[i].shopcar[j].id==obj.idarr[k]){
										// console.log("kkkkkkkkk",j)
										arr[i].shopcar.splice(j,1)
									}
									
								}
								break;
							}
							break;
						}
					}
					var str2=JSON.stringify(arr);
					fs.writeFile("./data/data.json",str2,function(err){
						if(err){
							res.send({s:2})
						}else{
							res.send({s:0})
						}
					})
				}
			})		
		}
	})
})
app.get("/getleimu",function(req,res){
	fs.readFile("./data/leimu.json",function(err,data){
		if(err){
			res.send({err:3});
		}else{
			res.send(data);
			
		}
	})
})
//删除
app.get("/delete",function(req,res){
	var obj=req.query;
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:3});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			// console.log("aaaaaaa",arr)
			for(var i=0;i<arr.length;i++){
				if(obj.id==arr[i].id){
					arr.splice(i,1)
				}
			}
			// console.log("aaaaaaa:",arr)
			var obj1={
				s:0,
				data:JSON.stringify(arr).toString()
			}
			var str2=JSON.stringify(arr);
			res.send(obj1);
			fs.writeFile(fileJson,str2,function(err){
				if(err) throw err;
			})
		}
	})
	
})
//启动app
app.listen(82,function(){
	console.log("OK 82");
})
