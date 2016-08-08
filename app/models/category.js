//建立Category模型
var mongoose = require('mongoose');
var categorySchema = require('../schemas/category');

var Category = mongoose.model('Category', categorySchema);

module.exports = Category;
