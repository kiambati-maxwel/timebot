/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

import chalk from 'chalk';
import express from 'express';
import path from 'path';
import initClientDbConnection from './lib/connections/dbutils';

// routes
import landing_page from './lib/routes/index';
import users from './lib/routes/users';
import lnmodels from './lib/routes/lnmodels';
import submodels from './lib/routes/submodels';
import timebox from './lib/routes/timebox';

const {
  redirectToHTTPS
} = require('express-http-to-https');

// server 1.0
function server_1() {
  const port = process.env.PORT || 2000;
  const app = express();

  // here we assign connection object to the global js object
  global.clientConnection = initClientDbConnection;
  global.appRoot = path.resolve(__dirname);

  // serving static files
  // in production chage this path .....
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use('/jss', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
  app.use('/jss', express.static(path.join(__dirname, '/node_modules/chart.js/dist')));

  // ejs
  app.set('views', './public/views');
  app.set('view engine', 'ejs');

  // body parser
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));

  // Hundle api endpoints
  app.use('/', landing_page);
  app.use('/user', users);
  app.use('/lnmodels', lnmodels);
  app.use('/submodels', submodels);
  app.use('/timebox', timebox);

  // start server
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(chalk.blue(`app running on port ${port} :`));
    }
  });
}

// server 2.0

function server_2() {
  const app = express();

  // serving static files
  app.use(express.static(path.join(__dirname, '/dist')));
  app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
  app.use('/js', express.static(path.join(__dirname, '/node_modules/chart.js/dist')));

  const port = process.env.PORT || 8585;

  // Redirect HTTP to HTTPS,
  app.use(redirectToHTTPS([/localhost:(\d{4})/], [], 301));

  // Logging for each request
  app.use((req, resp, next) => {
    const now = new Date();
    const time = `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`;
    const pathto = `"${req.method} ${req.path}"`;
    const m = `${req.ip} - ${time} - ${pathto}`;
    // eslint-disable-next-line no-console
    console.log(m);
    next();
  });
  // ejs
  app.set('views', './public/views');
  app.set('view engine', 'ejs');

  // body parser
  app.use(express.json());
  app.use(express.urlencoded({
    extended: false
  }));

  // Hundle api endpoints
  app.use('/', landing_page);
  app.use('/user', users);

  // start server
  app.listen(port, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log(chalk.blue(`\napp running on port ${chalk.magenta(port)} 🚀`));
    }
  });
}

server_1();
