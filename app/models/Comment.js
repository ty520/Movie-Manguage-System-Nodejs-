//Creating a Commet model
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');
//convert our MovieSchema into a Model 
var Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;