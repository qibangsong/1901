var express=require("express");
var fs=require("fs");
var app=express();
var bodyParser=require("body-parser");

var fileJson="./data/data.json";

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
	console.log("addGet obj:",obj);
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			obj.id=new Date().getTime()+"";
			arr.unshift(obj);
			var str2=JSON.stringify(arr);
			console.log("get添加：",obj)
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


app.get("/addgetparams/user/:user/age/:age",(req,res)=>{
	var obj=req.params;
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			obj.id=new Date().getTime()+"";
			arr.unshift(obj);
			var str2=JSON.stringify(arr);
			//console.log("get添加：",obj)
			fs.writeFile(fileJson,str2,function(err){
				if(err){
					res.send({s:2})
				}else{
					res.send({s:0})
				}
			})
		}
	})
	
})

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
	})
});
app.post("/addshopcar",bodyParser.json(),function(req,res){//注册
	var obj=req.body;
	//console.log("addPost obj:",obj);
	//res.send({s:0});
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:1});
		}else{
			var str=data.toString();
			var arr=JSON.parse(str);
			arr[0].shopcar.unshift(obj);
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
			let s=""
			for(var i=0;i<arr.length;i++){
				if(arr[i].user==obj.user||arr[i].phone==obj.user&&arr[i].psd==obj.psd){
					s=true
					break;
				}else{
					s=false;
				}
			}
			res.send({s:s});
			
		}
	})
});
app.post("/updata",bodyParser.json(),function(req,res){//修改密码
	var obj=req.body;
	console.log("addPost obj:",obj);
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
			console.log("aaaaaa",arr)
			var str3=JSON.stringify(arr);
			console.log("aaaaaaaaaa",str3)
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
app.get("/getcode",function(req,res){
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
	console.log("addPost obj:",obj);
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
			console.log("aaaaaaa",arr)
			for(var i=0;i<arr.length;i++){
				if(obj.id==arr[i].id){
					arr.splice(i,1)
				}
			}
			console.log("aaaaaaa:",arr)
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
