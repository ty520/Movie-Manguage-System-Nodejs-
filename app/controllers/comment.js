//comment pages
var Comment = require('../models/Comment');

exports.save = function(req, res){
	var _comment = req.body.comment;
	var movieId = _comment.movie;
	if(_comment.cId){
		Comment.findById(_comment.cId, function(err, comment){
			if(err)
			{
				console.log(err);
			}
			var reply = {
				 from: _comment.from,
        		 to: _comment.toId,
       			 content: _comment.content
			}
			comment.reply.push(reply);
			for(var key in reply)
			{
				console.log('from'+reply[key]);
			}
			comment.save(function(err, comment){
			if(err)
			{
				console.log(err);
			}
			res.redirect('/movie/' + movieId);
	});
		})
	}else{
		_comment.reply = [];
		var comment = new Comment(_comment);
		comment.save(function(err, comment){
			if(err)
			{
				console.log(err);
			}
			res.redirect('/movie/' + movieId);
		});
	}
	
}
