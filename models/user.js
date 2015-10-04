
/* @author: zimyuan
 * @last-edit-date: 2015-09-13
 */

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	BaseModel = require('./base_model');

var UserSchema = new Schema({
	loginname: {type: String},						// rtx名字
	password: {type: String},						// 用户密码

    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
    is_admin: {type: Boolean, default: false}
});

UserSchema.plugin(BaseModel);
UserSchema.index({loginname: 1}, {unique: true});

mongoose.model('User', UserSchema);
