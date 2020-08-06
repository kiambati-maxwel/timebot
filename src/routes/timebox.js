/* eslint-disable */
import express from 'express';
import whichdb from '../../config/dbname';
import timebox from '../models/timebox';

const router = express.Router();

// -------------------------------- GET request ------------------
router.get('/sts', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`${whichdb.proddb}_${req.query.id}`, {
    useCache: true
  });
  const Timebox = await db.model("timebox");

  await Timebox.find({}, (err, allTime) => {
    let totalTime = null;
    let totalTimeToday = null;
    const modelHandler = [];
    const modelTime = [];
    const modelTtodayHandler = [];
    const modelTimeT = [];
    const dayGraphArray = [];
    let dayNameGraph = null;
    const dayNameGraphArray = [];
    let timeForEach = null;
    let timeEachDay = null;
    let timeGraph = 0;

    allTime.forEach((e) => {
      totalTime += e.time;
      const dateN = new Date(e.createdAt);
      const dateToday = new Date();

      if (dayGraphArray[0] === undefined) {
        for (let i = 0; i <= 6; i++) {
          const yesterday = new Date(new Date().setDate(new Date().getDate() - i));
          // console.log(yesterday.getDate());

          allTime.filter((e) => {
            return new Date(e.createdAt).getDate() === yesterday.getDate() &&
              new Date(e.createdAt).getMonth() === yesterday.getMonth() &&
              new Date(e.createdAt).getFullYear === yesterday.getFullYear
          }).forEach(e => {
            timeGraph += e.time
          });

          switch (yesterday.getDay()) {
            case 0:
              // code block
              dayNameGraph = 'sunday';
              break;
            case 1:
              // code block
              dayNameGraph = 'monday';
              break;
            case 2:
              // code block
              dayNameGraph = 'tuesady';
              break;
            case 3:
              // code block
              dayNameGraph = 'wednesday';
              break;
            case 4:
              // code block
              dayNameGraph = 'thursady';
              break;
            case 5:
              // code block
              dayNameGraph = 'friday';
              break;
            case 6:
              // code block
              dayNameGraph = 'saturday';
              break;

            default:
              // code block
              dayNameGraph = 'error!!'
          }

          dayGraphArray.push(Math.round((timeGraph / 60) * 100) / 100);

          dayNameGraphArray.push(dayNameGraph);

          timeGraph = 0;

        };
      }


      if (modelHandler.length < 1 || modelHandler.includes(e.mainModelName) === false) {
        allTime.filter(allTime => {
          /* filter subtopic name in info get request data */
          return allTime.mainModelName === e.mainModelName;
        }).map(sbn => {
          return sbn.time /* map time into an array */
        }).forEach(e => {
          timeForEach += e;
        });
        modelHandler.push(e.mainModelName);
        modelTime.push({
          name: e.mainModelName,
          time: timeForEach
        });
        timeForEach = null;
      }

      if (dateToday.getDate() === dateN.getDate() &&
        dateToday.getFullYear() === dateN.getFullYear() &&
        dateToday.getMonth() === dateN.getMonth()) {
        totalTimeToday += e.time;
        if (modelTtodayHandler.length < 1 || modelTtodayHandler.includes(e.mainModelName) === false) {
          allTime.filter(allTime => {
            let dateNn = new Date(allTime.createdAt);
            /* filter subtopic name in info get request data */
            return allTime.mainModelName === e.mainModelName &&
              dateNn.getDate() === dateToday.getDate() &&
              dateNn.getFullYear() === dateToday.getFullYear() &&
              dateNn.getMonth() === dateToday.getMonth();
          }).map(sbn => {
            return sbn.time; /* map time into an array */
          }).forEach(e => {
            timeEachDay += e;
          });
          modelTtodayHandler.push(e.mainModelName);
          modelTimeT.push({
            name: e.mainModelName,
            time: timeEachDay
          });
          timeEachDay = null;
        }

      } else {
        totalTimeToday = 0;
      }

    });


    res.status(200).json({
      totalTime,
      modelTime,
      totalTimeToday,
      modelTimeT,
      dayGraphArray,
      dayNameGraphArray
    });

    if (err) {
      console.log(err);
    }
  });


});

// get by main mdl name

router.get('/:mainModelName', async (req, res) => {
  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`${whichdb.proddb}_${req.query.id}`, {
    useCache: true
  });
  const Timebox = await db.model("timebox");

  await Timebox.find({
    mainModelName: req.params.mainModelName
  }, (err, ModelBasedTime) => {
    res.send(ModelBasedTime);
    res.status(200);

    if (err) {
      console.log(err);
    }
  });

});



router.post('/saveme', async (req, res) => {

  const {
    name,
    mainModelName,
    time
  } = req.body;

  const dbConnection = await global.clientConnection;
  const db = await dbConnection.useDb(`${whichdb.proddb}_${req.query.id}`, {
    useCache: true
  });
  const Timebox = await db.model("timebox");

  const newTime = new Timebox({
    name,
    mainModelName,
    time
  });

  await newTime.save(err => {
    if (err)
      res.sendStatus(500);
    res.sendStatus(201);
  });
});

export default router;
