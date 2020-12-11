"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/* eslint-disable no-console */

/* eslint-disable no-unused-vars */

/* eslint-disable no-unused-expressions */
const set_mode = function set_mode() {
  let mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dev';
  let app_mode = 'dev';
  mode === 'prod' ? app_mode = 'prod' : app_mode = 'dev';
  return app_mode;
};

var _default = set_mode;
exports.default = _default;