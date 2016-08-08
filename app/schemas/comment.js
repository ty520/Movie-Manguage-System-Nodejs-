//建立评论Schemacategoy
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
	movie: {type: ObjectId, ref: 'Movie'}, //ObjectId作为主键，将CommentSchema与MovieSchema数据进行关联。类似于SQL中的关系数据库
	from: {type: ObjectId, ref: 'User'},
	reply: [{
		from: {type: ObjectId, ref: 'User'},
		to: {type: ObjectId, ref: 'User'},
		content: String
	}],
	content: String,
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

CommentSchema.pre('save',function(next){  //每次数据保存之前调用
	if(this.isNew)
	{
		this.meta.createAt = this.meta.updateAt =  Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	next(); //继续调用下一静态方法
})
//model示例化以后才具有该方法
CommentSchema.statics = {
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
module.exports = CommentSchema;