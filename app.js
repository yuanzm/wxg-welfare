/*
 * @ author: zimyuan
 * @last-edit-date: 2015-10-02
 */

require('colors');
require('./models');

var path                = require("path"),
    config              = require('./config'),
    express             = require("express"),
    session             = require('express-session');
    errorhandler        = require('errorhandler'),
    router              = require("./router"),
    auth                = require('./middlewares/auth'),
    errorPageMiddleware = require("./middlewares/error_page"),
    RedisStore          = require('connect-redis')(session);
    _                   = require('lodash'),
    csurf               = require('csurf'),
    compress            = require('compression'),
    bodyParser          = require('body-parser'),
    requestLog          = require('./middlewares/request_log'),
    errorhandler        = require('errorhandler'),
    renderMiddleware    = require('./middlewares/render'),
    logger              = require("./common/logger"),
    busboy              = require('connect-busboy'),
    mongoose            = require('mongoose');

// 静态文件目录
var staticDir = path.join(__dirname, 'public');

var urlinfo     = require('url').parse(config.host);
config.hostname = urlinfo.hostname || config.host;

var app = express();

// configuration in all env
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));
app.locals._layoutFile = 'layout.html';
app.enable('trust proxy');

// Request logger 请求时间
app.use(requestLog);

if (config.debug) {
  // 渲染时间
  app.use(renderMiddleware.render);
}

// 静态资源
app.use('/public', express.static(staticDir));

// 每日访问限制
app.use(require('response-time')());
app.use(bodyParser.json({limit: '1mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '1mb' }));
app.use(require('method-override')());
var cookieParser = require('cookie-parser')(config.session_secret);
app.use(cookieParser);
app.use(compress());

var session = session({
    secret: config.session_secret,
    store: new RedisStore({
        port: config.redis_port,
        host: config.redis_host
    }),
    resave: true,
    saveUninitialized: true,
});

app.use(session);

app.listen(3000);

if (!config.debug) {
  app.use(function (req, res, next) {
    if (req.path.indexOf('/api') === -1) {
      csurf()(req, res, next);
      return;
    }
    next();
  });
  app.set('view cache', true);
}

// set static, dynamic helpers
_.extend(app.locals, {
    config: config
});

app.use(errorPageMiddleware.errorPage);
app.use(function (req, res, next) {
    res.locals.csrf = req.csrfToken ? req.csrfToken() : '';
    next();
});

app.use('/', router);

// error handler
if (config.debug) {
    app.use(errorhandler());
} else {
    app.use(function (err, req, res, next) {
        console.error('server 500 error:', err);
        return res.status(500).send('500 status');
    });
}

module.exports = app;
