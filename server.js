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
//app.use(express.static("./public/img"));

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

//a4: addPost
app.post("/addPost",urlencodedParser,function(req,res){
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


//a6
app.get("/getData",function(req,res){
	fs.readFile(fileJson,function(err,data){
		if(err){
			res.send({err:3});
		}else{
			var obj={
				s:0,
				data:data.toString()
			}
			setTimeout(function(){
				res.send(obj);
			},5000);
		}
	})
})

//启动app
app.listen(82,function(){
	console.log("OK 82");
});
