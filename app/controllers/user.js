//user Page
var User = require('../models/User');

//signup
exports.signup = function(req, res){
	var _user = req.body.user;
	var password = _user.password;
	var repassword = _user.repassword;
	var userAdd ={
		name: _user.name,
		password: _user.password,
		role: 15//现在注册的用户级别都为15，可操作后台管理系统
	};
	User.findByName(_user.name, function(err,user){
		if(err)
		{
			console.log(err);
		}
		if(user === null)
		{
			var signupUser = new User(userAdd);
			if(repassword !== userAdd.password)
			{
				req.flash('errorVal', '两次输入的密码请保持一致！');
				res.redirect('/signup');
			}else{
				signupUser.save(function(err){
				if(err)
				{
					console.log(err);
				}else{
					res.redirect('/admin/userlist');
				}
				});
			}	
		}else{
			req.flash('error', '该用户已被注册');
			res.redirect('/signup');
		}
	});
}
	//signin
exports.signin = function(req, res){
	var _user = req.body.user;
	var name = _user.name;
	var password = _user.password;
	User.findByName(_user.name, function(err,user){
		if(err)
		{
			console.log(err);
		}
		if(user){
			if(user.compareHash(password))
			{
				req.session.user = user;
				res.redirect('/admin/userlist');
			}else{
				req.flash('error', '用户密码错误');
				res.redirect('/signin');
			}
		}else{
			req.flash('error', '用户名不存在');
			res.redirect('/signin');
		}
	});
}
//logout
exports.logout =  function(req, res){
	delete req.session.user;
	res.redirect('/');
}

//userList page
exports.list = function(req, res){
		User.fetch(function(err,users){
	  	if(err)
	  	{
	  		console.log(err);
	  	}else{
	  		console.log('Users 列表页'+users);
	  		res.render('userlist', 
	  		{
				title: 'User 列表页',
				users: users
			});
		}
		});
}
//show signin
exports.showSignin = function(req, res){
	res.render('signin', {
		title: '登录页面',
		error: req.flash('error').toString()
	});
}

exports.showSignup = function(req, res){
	res.render('signup', {
		title: '注册页面',
		error: req.flash('error').toString(),
		errorVal: req.flash('errorVal').toString()
	});
}
//midware for user
exports.signRequired = function(req, res, next){
	var user = req.session.user;
	if(!user){ //用户还未登录
		res.redirect('/signin');
	}
	next();
}

exports.adminRequire =function(req, res, next){
	var user = req.session.user;
	if(user.role <= 10) //用户权限需要增加至10级以上才有查看用户信息的权利
	{
		res.redirect('/signin');
	}
	next();
}
exports.del = function(req, res){
	var id = req.query.id;
	User.remove({_id: id}, function(error){
		if(error)
		{
			console.log(error);
		}else{
			res.json({success: 1});
		}
	});
}