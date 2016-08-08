//建立Movie schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var MovieSchema = new Schema({
	doctor: String,
	title: String,
	language: String,
	country: String,
	summary: String,
	flash: String,
	poster: String,
	year: Number,
	category:{type: ObjectId, ref: 'Category'},
	meta: {
		createAt:{
			type: Date,
			defalut: Date.now()
		},
		updateAt:{
			type:Date,
			defalut:Date.now()
		}
	}
});

MovieSchema.pre('save',function(next){  //每次数据保存之前调用
	if(this.isNew)
	{
		this.meta.createAt = this.meta.updateAt =  Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next(); //继续调用下一静态方法
})
//model示例化以后才具有该方法
MovieSchema.statics = {
	fetch: function(cb){   //取出数据库中所有的数据
		return this
			.find({})
			.sort('meta.updateAt')  //按照更新时间排序
			.exec(cb);
	},
	findById: function(id, cb){   //取出数据库中所有的数据
		return this
			.findOne({_id: id})
			.exec(cb);
	}
}
module.exports = MovieSchema;