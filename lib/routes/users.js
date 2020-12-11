"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _dbname = _interopRequireDefault(require("../../config/dbname"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable import/no-extraneous-dependencies */

/* eslint-disable no-shadow */
// import User from '../models/User';
const router = _express.default.Router(); // get all users


router.get('/allusers', async (req, res) => {
  // accesing our cluster  connection from global object
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb("".concat(_dbname.default.proddb), {
    useCache: true
  });
  const User = await db.model("User");
  await User.find({}, (err, users) => {
    res.json(users);

    if (err) {
      console.log(err);
      res.status(500);
    }
  });
}); // handle register

router.post('/register', async (req, res) => {
  // destructure
  const {
    name,
    email,
    password,
    password2
  } = req.body; // pass
  // accesing our cluster  connection from global object

  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb("".concat(_dbname.default.proddb), {
    useCache: true
  });
  const User = await db.model("User");

  if (password !== password2) {
    res.status(400).render('registererrors', {
      msg: "password do not match"
    });
  } else {
    User.findOne({
      email
    }).then(user => {
      if (user) {
        res.status(400).render('registererrors', {
          msg: "email already exists"
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        }); // hash passwords

        _bcryptjs.default.genSalt(10, (err, salt) => _bcryptjs.default.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash; // save user

          newUser.save().then(() => {
            res.redirect('/');
          }).catch(console.log(err));
        }));
      }
    });
  }
}); //  hundle login

router.post('/login', async (req, res) => {
  const {
    email,
    password
  } = req.body;
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb("".concat(_dbname.default.proddb), {
    useCache: true
  });
  const User = await db.model("User");
  const userPresent = await User.findOne({
    email
  });

  if (userPresent) {
    // match password
    _bcryptjs.default.compare(password, userPresent.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const tenantid = userPresent.id;
        console.log("".concat(userPresent.name, " : ").concat(tenantid));
        dbConnection.useDb("".concat(_dbname.default.proddb, "_").concat(tenantid), {
          useCache: true
        });
        res.status(200).render('youin', {
          tenant_id: tenantid
        });
      } else {
        res.status(400).render('loginerrors', {
          msg: 'wrong password'
        });
      }
    });
  } else {
    res.status(404).render('loginerrors', {
      msg: 'ghost email'
    });
  }
});
var _default = router;
exports.default = _default;