//路由文件
var routes = function(app){
	var Index = require('../app/controllers/index');
	var Movie =	require('../app/controllers/movie');
	var User = require('../app/controllers/user');
	var Comment = require('../app/controllers/comment');
	var Category = require('../app/controllers/category');
	//pre handler
	app.use(function(req, res, next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});
	app.get('/', Index.index);		
	//detail pages
	app.get('/movie/:id', Movie.detail);
	//save page
	app.post('/admin/movie/new', User.signRequired, User.adminRequire, Movie.save);
	//new pages
	app.get('/admin', User.signRequired, User.adminRequire, Movie.new);
	//admin movie update 
	app.get('/admin/movie/update/:id',User.signRequired, User.adminRequire, Movie.update);
	//list pages
	app.get('/list', User.signRequired, User.adminRequire,Movie.list);
	//list delete Movie
	app.delete('/admin/list',Movie.del);
	//userList page
	app.get('/admin/userlist', User.signRequired, User.adminRequire, User.list);
	app.delete('/admin/userlist', User.del);
	//signup
	app.post('/user/signup', User.signup);
	app.get('/signup', User.showSignup);
	//signin
	app.post('/user/signin',User.signin);
	app.get('/signin', User.showSignin);
	//logout
	app.get("/logout", User.logout);
	//Comment
	app.post('/user/comment', User.adminRequire, Comment.save);
	//Category
	app.post("/admin/category/new", User.adminRequire,User.adminRequire, Category.save);
	app.get('/admin/category', User.adminRequire,User.adminRequire,Category.new);
	app.get('/admin/categorylist', User.adminRequire,User.adminRequire,Category.list);
}
module.exports = routes;