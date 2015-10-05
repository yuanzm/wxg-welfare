/* @author: zimyuan
 * @last-edit-date: 2015-10-04
 */

// 引入所需模块
var express 		 = require("express");
var site 			 = require("./controllers/site");
//var apply            = require('./controllers/apply');
//var welfare          = require('./controllers/welfare');
var sign             = require('./controllers/sign');
var config 			 = require('./config');
var router           = express.Router();
// home page
router.get('/', site.index);

router.get('/signup', sign.showSignUp);
router.post('/signup', sign.signUp);

//router.get('/allapply', apply.index);        // 所有可申请列表
//router.get('/apply/:id', apply.showApply);  // 展示一个申请单的数据

//router.get('/newapply', apply.newApply); // 新建申请页面
//router.post('/newapply', apply.createNewApply);// 提交新的申请POST请求

//router.get('/mywelfare', welfare.mywelfare); // 已提交申请列表
//router.post('/newwelfare', welfare.createNewWelfare);   // 创建新的申请

module.exports = router;
