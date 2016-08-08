var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var routes = require('./routes/index');
var bodyParser = require('body-parser');
var jade = require('jade');
var logger = require('morgan');


var port = process.env.PORT || 3000; //process是个全局变量
//启动Web服务器，express实例化
var app = express();

//数据库连接
mongoose.connect('mongodb://localhost/Movie');
//设置视图的根目录
app.set('views', path.join(__dirname, 'app/views/pages/'));
app.locals.moment = require('moment');
//设置默认的模板引擎
app.set("view engine", "jade");
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
app.use(cookieParser());//cookieParser()中间件一定要在seeion中间件前面
app.use(session({
	secret: 'Movie',
	cookie: {maxAge: 1000* 60* 60* 24* 30},
	store:new mongoStore({
		url: "mongodb://localhost/Movie",
		collection: "session"
	})
}));
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));//静态资源文件夹
//入口文件配置
if("development" === app.get('env')){
	app.set('showStackError', true);
	app.use(logger(":method :url :status"));
	app.locals.pretty = true;
	mongoose.set('debug', true);
}
app.listen(port);

console.log("movie started on port:"+ port);
//设置路由
routes(app);

