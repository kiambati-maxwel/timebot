/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */

import chalk from 'chalk';
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import compression from 'compression';
// import expressLayouts from 'express-ejs-layouts';

// routes
import landing_page from './lib/routes/index';

const port = process.env.PORT || 8007;
const app = express();

// compress all responses
app.use(compression());

// serving static files
app.use(express.static(path.join(__dirname, '/public')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/chart.js/dist')));

// ejs
// app.use(expressLayouts);
app.set('views', './public/views');
app.set('view engine', 'ejs');

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- Hundle api endpoints
app.use('/', landing_page);

// --- start server
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(chalk.blue(`app running on port ${port} :`));
  }
});
