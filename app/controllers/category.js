var Category = require('../models/category');

exports.new = function(req, res){
	res.render('categoryAdmin',{
		title: '电影分类后台录入页',
		category:{}
	});
}
exports.save = function(req, res){
	var _category = req.body.category;
	console.log('_category.name'+_category);
	Category.find({name: _category.name}, function(err, category){
		if(err)
		{
			console.log(err);
		}
		console.log('category.name'+category.name);
		if(category.name !== undefined)
		{
			console.log('请重新录入');
			res.redirect('/admin/category');
		}else{
				var categoryAdd = new Category(_category);
				console.log('_category.name'+categoryAdd.name);
				categoryAdd.save(function(err, category){
					if(err)
					{
						console.log(err);
					}
					res.redirect('/admin/categorylist');
				});
			}
	});
}
exports.list = function(req, res){
	Category.fetch(function(err, categories){
		if(err)
		{
			console.log(err);
		}
		res.render('categorylist',{
			title: '分类列表页',
			categories: categories
		})
	});
}