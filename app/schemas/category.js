//建立category Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CategorySchema = new Schema({
	name: String,
	movies: [{type: ObjectId, ref: 'Movie'}],
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

CategorySchema.pre('save',function(next){  //每次数据保存之前调用
	if(this.isNew)
	{
		this.meta.createAt = this.meta.updateAt =  Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next(); //继续调用下一静态方法
})
//model示例化以后才具有该方法
CategorySchema.statics = {
	fetch: function(cb){   //取出数据库中所有的数据
		return this
			.find({})
			.sort('meta.updateAt')  //按照更新时间排序
			.exec(cb);
	},
	findByname: function(name, cb){   //取出数据库中所有的数据
		return this
			.findOne({name: name})
			.exec(cb);
	}
}
module.exports = CategorySchema;