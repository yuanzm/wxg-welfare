/*
 * @author: zimyuan
 * @last-edit-date: 2015-10-05
 */

var User = require('../proxy').User,
    config = require('../config'),
    validator = require('validator'),
    eventproxy = require('eventproxy'),
    crypto = require('crypto'),
    authMiddleWare = require('../middlewares/auth');

exports.showSignUp = function(req, res) {
   res.render('pages/sign/signup');
}

exports.signUp = function(req, res) {
    var ep = new eventproxy();
    ep.fail(next);

    ep.on('sign_up_error', function(errMessage) {
        var data = {
            errCode: 422,
            message: errMessage                
        }
        res.json(data);
    });

    var loginname = validator.trim(req.body.loginname),
        password = validator.trim(req.body.password),
        rePassword = validator.trim(req.body.rePassword);

    if ([loginname, password, rePassword].some(function(item) { return item === ''})) {
        ep.emit('sign_up_error', '信息填写不完整');
    }  
    if (password != rePassword ) {
        ep.emit('sign_up_error', '两次输入的密码不一致');
    }
    User.getUserByLoginName(loginname, function(err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            ep.emit('sign_up_error', '该帐号已被注册');
        }        
        User.newAndSave(loginname, password, function(err, user){
            if (err) {
                return next(err);
            }
            var data = {
                errCode: 200,
                message: '注册成功'
            }
            req.session.user = user;
            res.json(data);
        })
    });         
}
