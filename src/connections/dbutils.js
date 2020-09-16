/* eslint-disable global-require */
import mongoose from 'mongoose';
import dbconfig from '../../config/keys';

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function initClientDbConnection() {
  const db = mongoose.createConnection(dbconfig.mongoURL, clientOption);
  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  await db.once("open", () => {
    console.log("client MongoDB Connection ok!");
  });
  require("../models/User.js");
  return db;
}

export default initClientDbConnection();
