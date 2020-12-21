/* eslint-disable global-require */
import mongoose from 'mongoose';
import DATABASEURL from '../../keys/mongo';

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 50,
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function initClientDbConnection() {
  const db = mongoose.createConnection(process.env.DATABASE_URL || DATABASEURL, clientOption);
  db.on("error", console.error.bind(console, "MongoDB Connection Error>> : "));
  await db.once("open", () => {
    console.log("MongoDB is UP 😎");
  });
  require("../models/User.js");
  return db;
}

export default initClientDbConnection();
