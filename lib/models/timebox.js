"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  Schema
} = _mongoose.default;
const lnSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  mainModelName: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  time: {
    type: Number,
    required: true
  }
});

const timeModel = _mongoose.default.model('timebox', lnSchema);

var _default = timeModel;
exports.default = _default;