"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _dbname = _interopRequireDefault(require("../../config/dbname"));

var _Lnmodels = _interopRequireDefault(require("../models/Lnmodels"));

var _timebox = _interopRequireDefault(require("../models/timebox"));

var _submodels = _interopRequireDefault(require("../models/submodels"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ln model API end point

/* eslint-disable */
const router = _express.default.Router(); // -------------------------------- GET request ------------------


router.get('/', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb("".concat(_dbname.default.proddb, "_").concat(req.query.id), {
    useCache: true
  });
  const lnmodel = await db.model("Lnmodel");
  await lnmodel.find({}, (err, learningModels) => {
    res.send(learningModels);

    if (err) {
      res.status(500);
      console.error(err);
      console.log(err);
    }

    ;
  });
}); // ------------------------------ POST request ----------

router.post('/addmdl', async (req, res, next) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb("".concat(_dbname.default.proddb, "_").concat(req.query.id), {
    useCache: true
  });
  const lnmodel = await db.model("Lnmodel"); // ----destructure

  let {
    name
  } = req.body;
  const newName = encodeURI(name);
  name = newName; // --- find the number of models to create a unique id

  let newModel = new lnmodel({
    name
  });
  await newModel.save().then(() => {
    console.log("".concat(name, " modelCreated"));
    res.status(201).redirect('/');
  }).catch(err => {
    console.log(err);
  });
});
router.delete('/delete/:name', async (req, res) => {
  // destructure
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb("".concat(_dbname.default.proddb, "_").concat(req.query.id), {
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
          const Submodels = db.model('submodels');
          Submodels.deleteMany({
            mainMname: req.params.name
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
    }
  });
});
var _default = router;
exports.default = _default;