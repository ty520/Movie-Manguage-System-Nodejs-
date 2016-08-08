//建立User Schema
var mongoose = require('mongoose');
var crypto = require('crypto');

var Schema = mongoose.Schema;
var UserSchema = new Schema({
	name: {
		type: String,
		unique: true,

	},
	password: { 
		type: String
	},
	//0:nomal user
	//1: verified user
	//2: professional user
	//> 10: admin
	//>50:super admin
	role: {
		type: Number,
		default: 0
	},
	meta:{
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});
UserSchema.pre('save', function(next){
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	}else{
		this.meta.updateAt = Date.now();
	}
	var md5 = crypto.createHash('md5');
	user.password = md5.update(user.password).digest('hex');
	next();
});
UserSchema.methods = {
	compareHash: function(password){
		var md5 = crypto.createHash('md5');
		var passwordEn = md5.update(password).digest('hex');
		return passwordEn === this.password;
	}
}
UserSchema.statics = {
	fetch: function(cb){   //取出数据库中所有的数据
		return this
			.find({})
			.sort('meta.updateAt')  //按照更新时间排序
			.exec(cb);
	},
	findByName: function(name, cb){   //取出数据库中所有的数据
		return this
			.findOne({name: name})
			.exec(cb);
	}
}
module.exports = UserSchema;