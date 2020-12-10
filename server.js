"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _dbutils = _interopRequireDefault(require("./lib/connections/dbutils"));

var _index = _interopRequireDefault(require("./lib/routes/index"));

var _users = _interopRequireDefault(require("./lib/routes/users"));

var _lnmodels = _interopRequireDefault(require("./lib/routes/lnmodels"));

var _submodels = _interopRequireDefault(require("./lib/routes/submodels"));

var _timebox = _interopRequireDefault(require("./lib/routes/timebox"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */

/* eslint-disable import/no-unresolved */
// routes
const {
  redirectToHTTPS
} = require('express-http-to-https'); // server 1.0


function server_1() {
  const port = process.env.PORT || 2000;
  const app = (0, _express.default)(); // here we assign connection object to the global js object

  global.clientConnection = _dbutils.default;
  global.appRoot = _path.default.resolve(__dirname); // serving static files
  // in production chage this path .....

  app.use(_express.default.static(_path.default.join(__dirname, '/dist')));
  app.use('/jss', _express.default.static(_path.default.join(__dirname, '/node_modules/jquery/dist')));
  app.use('/jss', _express.default.static(_path.default.join(__dirname, '/node_modules/chart.js/dist'))); // ejs

  app.set('views', './public/views');
  app.set('view engine', 'ejs'); // body parser

  app.use(_express.default.json());
  app.use(_express.default.urlencoded({
    extended: false
  })); // Hundle api endpoints

  app.use('/', _index.default);
  app.use('/user', _users.default);
  app.use('/lnmodels', _lnmodels.default);
  app.use('/submodels', _submodels.default);
  app.use('/timebox', _timebox.default); // start server

  app.listen(port, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(_chalk.default.blue("app running on port ".concat(port, " :")));
    }
  });
} // server 2.0


function server_2() {
  const app = (0, _express.default)(); // serving static files

  app.use(_express.default.static(_path.default.join(__dirname, '/dist')));
  app.use('/js', _express.default.static(_path.default.join(__dirname, '/node_modules/jquery/dist')));
  app.use('/js', _express.default.static(_path.default.join(__dirname, '/node_modules/chart.js/dist')));
  const port = process.env.PORT || 8585; // Redirect HTTP to HTTPS,

  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301)); // Logging for each request

  app.use((req, resp, next) => {
    const now = new Date();
    const time = "".concat(now.toLocaleDateString(), " - ").concat(now.toLocaleTimeString());
    const pathto = "\"".concat(req.method, " ").concat(req.path, "\"");
    const m = "".concat(req.ip, " - ").concat(time, " - ").concat(pathto); // eslint-disable-next-line no-console

    console.log(m);
    next();
  }); // ejs

  app.set('views', './public/views');
  app.set('view engine', 'ejs'); // body parser

  app.use(_express.default.json());
  app.use(_express.default.urlencoded({
    extended: false
  })); // Hundle api endpoints

  app.use('/', _index.default);
  app.use('/user', _users.default); // start server

  app.listen(port, err => {
    if (err) {
      console.log(err);
    } else {
      console.log(_chalk.default.blue("\napp running on port ".concat(_chalk.default.magenta(port), " \uD83D\uDE80")));
    }
  });
}

server_1();
