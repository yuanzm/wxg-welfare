/* @author: zimyuan
 * @last-edit-date: 2015-10-01
 */

var models = require('../models'),
	apply  = models.Apply;


// 新建一个申请
exports.newAndSave = function(gamename, createer_name, game, start_time, end_time, callback) {
	var apply = new Apply();
    
    apply.gamename = gamename;
    apply.createer_name = createer_name;
    apply.game = game;
    apply.start_time = start_time;
    apply.end_time = end_time;
    appply.limit = limit;

    apply.save();
}


