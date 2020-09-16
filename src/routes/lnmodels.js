// ln model API end point
/* eslint-disable */
import express from 'express';
import whichdb from '../../config/dbname';
import Lnmodel from '../models/Lnmodels';
import timebox from '../models/timebox';

const router = express.Router();

// -------------------------------- GET request ------------------
router.get('/', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`${whichdb.proddb}_${req.query.id}`, {
    useCache: true
  });

  const lnmodel = await db.model("Lnmodel");
  await lnmodel.find({}, (err, learningModels) => {
    res.send(learningModels);
    if (err) {
      res.status(500);
      console.error(err);
      console.log(err);
    };
  });
});

// ------------------------------ POST request ----------
router.post('/addmdl', async (req, res, next) => {

  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`${whichdb.proddb}_${req.query.id}`, {
    useCache: true
  });

  const lnmodel = await db.model("Lnmodel");

  // ----destructure
  let {
    name
  } = req.body;

  const newName = encodeURI(name);
  name = newName;
  // --- find the number of models to create a unique id

  let newModel = new lnmodel({
    name,
  });

  await newModel.save()
    .then(() => {
      console.log(`${name} modelCreated`);
      res.status(201).redirect('/');
    })
    .catch(err => {
      console.log(err);
    });

});

router.delete('/delete/:name', async (req, res) => {
  // destructure
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`${whichdb.proddb}_${req.query.id}`, {
    useCache: true
  });

  const lnmodel = await db.model("Lnmodel");
  const nameToDelete = encodeURI(req.params.name);
  await lnmodel.deleteOne({
    name: nameToDelete
  }, err => {
    if (err) {
      console.log(err);
    } else {
      const timeBox = db.model('timebox');
      timeBox.deleteMany({
        mainModelName: req.params.name
      }, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('deleted !');
          res.status(202).redirect('/');
        }
      });
    }
  });
});

export default router;
