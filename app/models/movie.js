//Creating a model
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movies');
//convert our MovieSchema into a Model 
var Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;