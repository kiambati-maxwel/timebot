// ln model API end point
/* eslint-disable */
import express from 'express';
import Lnmodel from '../models/Lnmodels';

const router = express.Router();

// -------------------------------- GET request ------------------
router.get('/', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

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
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const lnmodel = await db.model("Lnmodel");

  // ----destructure
  let {
    name
  } = req.body;

  const newName = encodeURI(name);
  console.log(newName);
  name = newName;
  // --- find the number of models to create a unique id

  await lnmodel.find({}, async (err, nofModels) => {
    if (err) {
      console.log(err);
    }
    let id = nofModels.length + 1;
    console.log(id);

    let newModel = new lnmodel({
      id,
      name,
    });

    console.log('modelCreated');

    await newModel.save()
      .then(() => {
        res.status(201).redirect('/');
      })
      .catch(err => {
        console.log(err);
      });
  });
});

router.delete('/delete/:name', async (req, res) => {
  // destructure
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const lnmodel = await db.model("Lnmodel");
  console.log(req.params.name);
  const nameToDelete = encodeURI(req.params.name);
  await lnmodel.deleteOne({ name: nameToDelete }, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('deleted !');
      res.status(202).redirect('/');
    }
  });
});

export default router;