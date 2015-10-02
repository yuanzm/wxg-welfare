/* @author: zimyuan
 * @last-edit-date: 2015-09-13
 */

var models = require('../models'),
	User = models.User;

exports.getUserByLoginName = function(loginname, callback) {
	User.findOne({'loginname': loginname}, callback);
}

exports.getUserByid = function(id, callback) {
	User.findOne({'loginname': loginname}, callback);	
}

exports.getUserByQuery = function(query, callback) {
	User.find(query, callback);
}

exports.newAndSave = function(loginname, password, identitynumber, callback) {
	var user = new User();
	user.loginname = loginname;
	user.password = password;
	user.identitynumber = identitynumber;

	user.save(callback);	
}
