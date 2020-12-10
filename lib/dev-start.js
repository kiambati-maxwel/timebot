"use strict";

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-console */
console.log(_chalk.default.magenta("\ntranspilling server files to ".concat(_chalk.default.cyanBright('lib'), " ... \ncopying src files to ").concat(_chalk.default.cyanBright('dist'), "  ...\nlinting").concat(_chalk.default.cyanBright('...'))));