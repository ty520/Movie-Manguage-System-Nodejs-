var Movie = require('../models/movie');
var Comment = require('../models/Comment');
var _ = require('underscore');
var Category = require('../models/category');

//detail pages
exports.detail =  function(req, res){
	var id = req.params.id;
	// var _comment = Comment.findById(id);
	Movie.findById(id, function(err, movie){
		if(err)
		{
			console.log(err);
		}else{
			Comment
			.find({movie: id})
			.populate('from', 'name')
			.populate('reply.from reply.to', 'name')
			.exec(function(err, comments){
				res.render('detail', {
				title: 'movie 详情页',
				movie: movie,
				comments: comments
			}); 
		});
	}
	})	
}

//Movie save	
exports.save = function(req, res){
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	var _movie;
	if (id) {
    Movie.findById(id, function(err, movie) {
      if (err) {
        console.log(err);
      }

      _movie = _.extend(movie, movieObj);
      _movie.save(function(err, movie) {
        if (err) {
          console.log(err);
        }

        res.redirect('/movie/' + movie._id);
      })
    })
  }
  else {
    _movie = new Movie(movieObj);

    var categoryId = movieObj.category;
    var categoryName = movieObj.categoryName;

    _movie.save(function(err, movie) {
      if (err) {
        console.log(err)
      }
      if (categoryId) {
        Category.findById(categoryId, function(err, category) {
          category.movies.push(movie._id)

          category.save(function(err, category) {
            res.redirect('/movie/' + movie._id)
          })
        });
      }
      else if (categoryName) {
        var category = new Category({
          name: categoryName,
          movies: [movie._id]
        });

        category.save(function(err, category) {
          movie.category = category._id
          movie.save(function(err, movie) {
            res.redirect('/movie/' + movie._id)
          })
        });
      }
    });
  }
}
//new pages
	exports.new = function(req, res){
		Category.find({}, function(err, category){
			res.render('admin', {
			title: 'movie 后台录入页',
			categories: category,
			movie: {}
		});
		});
	}

	//admin movie update 
	exports.update = function(req, res){
		var id = req.params.id;
		if(id)
		{
			Movie.findById(id,function(err, movie){
			if(err)
			{
				console.log(err);
			}else{
			Category.find({}, function(err, category){
				res.render('admin',{
					title: '后台更新页',
					movie: movie,
					categories:category
				});
			});
		
		}
		});
	}
		
	}
	//list pages
	exports.list = function(req, res){
		 Movie
		 .find()
		 .populate('category', 'name')
		 .exec(function(err,movies){
	  		if(err)
	  		{
	  			console.log(err);
	  		}else{
	  			console.log('movies 列表页'+movies);
	  			res.render('list', 
	  			{
					title: 'movie 列表页',
					movies: movies
				});
			}
		});
	}
	//list delete Movie
	exports.del = function(req, res){
		var id = req.query.id;
		if(id)
		{
			Movie.remove({_id: id}, function(err){
			if(err)
			{
				console.log(err);
			}else{
				res.json({success: 1});
			}
			});
		}
	}
