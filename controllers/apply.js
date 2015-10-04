/*
 * @author: zimyuan
 * @last-edit-date: 2015-10-04
 */

var eventproxy = require('eventproxy'),
    Apply = require('../proxy').Apply,
    validator = rquire('validator');
    
// 展示所有的申请列表
exports.index = function(req, res) {
    
}
// 新建一个申请单
exports.newApply = function(req, res, next) {
    var ep =  new eventproxy();
    ep.fail(next);
    
    ep.on('creater_error', function(errMessage) {
        data = {
            errCode: 422,
            message: errMessage
        }   
        res.json(data);
    })

    var createer_name = validator.trim(req.body.createer_name),
        game = validator.trim(req.body.game),
        start_time =  validator.trim(req.body.start_time),
        end_time = validator.trim(req.body.end_time),
        limit = validator.trim(req.body.limit);
    
    if ([createer_name, game, start_time, end_time, limit].some(function(item) {return item === '' })) {
        return ep.emit('creater_error', '信息填写不完整');
    }
    
    Apply.newAndSave(createer_name, game, start_time, end_time,limit, function(err, apply) {
        if (err) {
            return next(err);
        }
        res.status(200);
        var data = {
            errCode: 200,
            message: '创建成功'
        }
        res.json(data);
    });
}
