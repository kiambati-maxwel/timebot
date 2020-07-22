"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

var _express = _interopRequireDefault(require("express"));

var _path = _interopRequireDefault(require("path"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _compression = _interopRequireDefault(require("compression"));

var _index = _interopRequireDefault(require("./lib/routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */

/* eslint-disable import/no-unresolved */
// import expressLayouts from 'express-ejs-layouts';
// routes
const port = process.env.PORT || 8007;
const app = (0, _express.default)(); // compress all responses

app.use((0, _compression.default)()); // serving static files

app.use(_express.default.static(_path.default.join(__dirname, '/public')));
app.use('/js', _express.default.static(_path.default.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', _express.default.static(_path.default.join(__dirname, '/node_modules/chart.js/dist'))); // ejs
// app.use(expressLayouts);

app.set('views', './public/views');
app.set('view engine', 'ejs'); // body parser

app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
})); // --- Hundle api endpoints

app.use('/', _index.default); // --- start server

app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(_chalk.default.blue("app running on port ".concat(port, " :")));
  }
});
