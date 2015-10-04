/* @author: zimyuan
 * @last-edit-date: 2015-10-01
 */

var models = require('../models'),
	Welfare = models.Welfare;


// 新建一个申请
exports.newAndSave = function(apply_id,gamename,os, account, partition, open_id, realname, note, device,rtx, callback) {
	var welfare = new Welfare();
    
    welfare.apply_id = apply_id;
    welfare.gamename = gamename;
    welfare.os = os;
    welfare.account = account;
    welfare.partition = partition;
    welfare.open_id = open_id;
    welfare.realname = realname;
    welfare.note = note;
    welfare.device = device;
    welfare.rtx = rtx;
 
    welfare.save(callback);	
}


