/*
 * @author: zimyuan
 * @last-edit-date: 2015-10-01
 */

var mongoose = require('mongoose'),
    config = require('../config.js');

mongoose.connect(config.db, function(err) {
	if (err) {
		console.log('connect to %s error', config.db, err.message);
	}
});

require('./user.js');

exports.User = mongoose.model('User');
 
