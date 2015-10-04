/*
 * @author: zimyuan
 * @last-edit-date: 2015-10-03
 */


var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	BaseModel = require('./base_model');


var WelfareSchema =  new Schema({
    apply_id: {type: String},                       // 申请单id
    applyer_id: {type: String},                     // 申请者的id
	gamename: {type: String},				        // 游戏名字 
    os: {type: String},                             // 手机操作系统
    account: {type: String},                        // qq or wechat
    open_id: {type:String},                         // open_id
    realname: {type: String},                      // 真实姓名
	partition:{type: String},						// 游戏分区 
    device: {type: String},                         // 设备
    rtx: {type: String},                            // rtx
    note: {type: String},                            // 备注

    create_at: {type: Date, default: Date.now},
    update_at: {type: Date, default: Date.now},
});

WelfareSchema.plugin(BaseModel);
WelfareSchema.index({rtx: 1}, {unique: true});

mongoose.model('Welfare',WelfareSchema);
