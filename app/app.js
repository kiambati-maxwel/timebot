/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

import chalk from 'chalk';
import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev.js';

const port = process.env.PORT || 8001;
const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/users', (req, res) => {
  res.json([{
    "id": 1,
    "firstName": "Theon",
    "lastName": "catMEl",
    "email": "catMEl@save.net"
  },
  {
    "id": 2,
    "firstName": "sebrina",
    "lastName": "craig",
    "emai": "craig@yahoo.com"
  },
  {
    "id": 3,
    "firstName": "tom",
    "lastName": "richard",
    "email": "tom@gmail.com"
  },
  {
    "id": 4,
    "firstName": "Perly",
    "lastName": "wanjiku",
    "email": "perlyKiambati@silicon.io"
  },
  {
    "id": 5,
    "firstName": "diana",
    "lastName": "wanjiku",
    "email": "shiku99@gmail.com"
  }]);
});

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk.blue(`app running on port ${port} :`));
  }
});
