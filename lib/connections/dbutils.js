"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var _keys = _interopRequireDefault(require("../../config/keys"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable global-require */
const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function initClientDbConnection() {
  const db = _mongoose.default.createConnection(_keys.default.mongoURL || process.env.DATABASE_URL, clientOption);

  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  await db.once("open", () => {
    console.log("MongoDB is UP 😎");
  });

  require("../models/User.js");

  return db;
}

var _default = initClientDbConnection();

exports.default = _default;