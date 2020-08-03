/* eslint-disable */
import express from 'express';
import submodels from '../models/submodels';
import Lnmodel from "../models/Lnmodels";

const router = express.Router();

// test route
// -------------------------------- GET request ------------------
router.get('/getsubmdl', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const Submodel = await db.model("submodels");

  await Submodel.find({}, (err, submodels) => {
    res.send(submodels);
    res.status(200);

    if (err) {
      console.log(err);
    }
  });
});

// test route
router.get('/lenderSmodels/:subMname', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const Submodel = await db.model("submodels");

  await Submodel.find({ mainMname: req.params.subMname }, (err, submodelsValue) => {
    // res.send(submodelsValue);
    res.send(submodelsValue);
    if (err) {
      res.status(500);
      console.error(err);
      console.log(err);
    }
  });
});

router.get('/:subMname', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const Submodel = await db.model("submodels");
  await Submodel.find({ mainMname: req.params.subMname }, (err, submodelsValue) => {
    // res.send(submodelsValue);
    if (submodelsValue[0] === undefined) {
      res.render('sub_models', { lenderMname: req.params.subMname });
    } else if (submodelsValue[0] !== undefined) {
      res.render('sub_models', {
        lenderMname: submodelsValue[0].mainMname,
        submodelsValue
      });
    } else if (err) {
      res.status(500);
      console.error(err);
      console.log(err);
    }
  });
});

// ------------------------------ POST request ----------
router.post('/addmdl', async (req, res) => {
  const {
    mainMname,
    name
  } = req.body;
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const Submodel = await db.model("submodels");
  // --- find the number of models to create a unique id
  await Submodel.find({ mainMname }, async (err, nofModels) => {
    let id;
    let lenderMname;
    if (err) {
      console.log(err);
    } else if (nofModels[0] === undefined) {
      id = 1;
      lenderMname = mainMname;
    } else {
      lenderMname = nofModels[0].mainMname;
      id = nofModels.length + 1;
      console.log(id);
    }

    const newModel = new Submodel({
      id,
      mainMname,
      name
    });

    console.log('submodel created');

    await newModel.save()
      .then(() => {
        res.status(201).redirect(`/submodels/${mainMname}?id=${req.query.id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

router.delete('/delete/:name', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`studybottest_${req.query.id}`, { useCache: true });

  const Submodel = await db.model("submodels");
  await Submodel.find({ mainMname: req.params.subMname }, (err, submodelsValue) => {
    // res.send(submodelsValue);
    if (submodelsValue) {
      // destructure
      const mainMname = submodelsValue.name;
      Submodel.deleteOne({ name: req.params.name }, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('deleted !');
          res.status(202).redirect(`/submodels/${mainMname}?id=${req.query.id}`);
        }
      });
    }
    if (err) {
      res.status(500);
      console.error(err);
      console.log(err);
    }
  });
});

export default router;