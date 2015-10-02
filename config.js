/*
 * @ author: zimyuan
 * @last-edit-date: 2015-10-01
 */

var path = require("path");

var config = {
    // debug 为 true 时，用于本地调试
    debug: true,

    // 项目基本信息配置
    name: "wxg-welfare",
    site_headers: [
        '<meta name="author" content="yuanzm" />'
    ],
    site_logo: "/public/images/site-logo.jpg",
    site_icon: "/public/images/site-logo.jpg",

    host: "localhost",
    // mongodb配置
    db: "mongodb://127.0.0.1/wxg-welfare",
    debug_db: "mongodb://127.0.0.1/wxg-welfare-debug",
    
    session_secret: 'zimyuan', // 务必修改
    auth_cookie_name: 'zimyuan',

    port: 3000
}

module.exports = config;
