/* eslint-disable */
import {
  post
} from '/js/sub_mdl_api.js';

// timer object
const submdl_timer = {
  // dom
  timeDisplay: document.querySelector('#time-display'),
  playPauseCheckbox: document.querySelector('#playPauseCheckbox'),
  resetbtn: document.querySelector('#resetbtn'),
  savebtn: document.querySelector('#savetimebtn'),
  moduleLender: document.querySelector('#moduleLender'),
  playpause: document.querySelector('.play-pause'),
  subModuleName: document.querySelector('#subModelNameTimer'),
  connection: navigator.connection || navigator.mozConnection || navigator.webkitConnection,
  // variables to hold time
  seconds: 0,
  minutes: 0,
  hours: 0,

  // add zero variables
  displaySecs: 0,
  displayMins: 0,
  displayHours: 0,

  // var holds intervals
  interval: null,
  localInterval: null,
  status: 'stopped',

  // index db save time
  idbTimebox: async function (senddata) {
    if (!window.navigator.onLine || this.connection.effectiveType === 'slow-2g') {
      console.log('i am online !!');
      await post(`/timebox/saveme?id=${localStorage.tenant_ID}`, senddata);
    } else {
      const dbpromise = indexedDB.open('timeBot-test-indexdb', 3);
      dbpromise.onerror = event => {
        console.log(event);
      }
      // dbpromise.onupgradeneeded = (event) => {
      //   const db = event.target.result;
      //   db.createObjectStore("timebox", { autoIncrement: true });
      // }

      dbpromise.onsuccess = (event) => {
        const db = event.target.result;
        const transaction = db.transaction(["timebox"], "readwrite");
        // Do something when all the data is added to the database.
        transaction.oncomplete = function (event) {
          console.log("All done!");
        };

        transaction.onerror = function (event) {
          // Don't forget to handle errors!
          throw (err => {
            console.log(err);
          })
        };

        const objectStore = transaction.objectStore("timebox");
        const request = objectStore.add(senddata);
        request.onsuccess = function (event) {
          // event.target.result === customer.ssn;
          console.log('added!!!');
        };
      }
    }
  },

  // get by mainmodel name
  idbGetByMainmodelName: function (mainModeln) {
    let mydata = [];
    const dbPromise = indexedDB.open('timeBot-test-indexdb', 2);
    dbPromise.onsuccess = (event) => {
      const db = event.target.result;
      const objectStore = db.transaction("timebox").objectStore("timebox");
      objectStore.openCursor().onsuccess = function (event) {
        const cursor = event.target.result;
        const mdldata = [];
        if (cursor) {
          if (cursor.value.mainModelName === mainModeln) {
            const received = {
              name: cursor.value.name,
              mainModelName: cursor.value.mainModelName,
              time: cursor.value.time
            }
            mdldata.push(received);
          }
          cursor.continue();
        }
        else {
          console.log("No more entries!");
        }
        mydata = mdldata;
      }
    }
  },

  // get all records in index db
  idbGetallTime: function () {
    const dbpromise = indexedDB.open('timeBot-test-indexdb', 2);
    dbpromise.onerror = event => {
      console.error(event);
    }
    return dbpromise.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["timebox"], "readonly");
      // Do something when all the data is added to the database.
      transaction.oncomplete = function (event) {
        console.log("All done!");
      };

      transaction.onerror = function (event) {
        // Don't forget to handle errors!
        throw (err => {
          console.log(err);
        })
      };

      const objectStore = transaction.objectStore("timebox");
      return objectStore.getAll().onsuccess = function (event) {
        event.target.result;
      };
    }

  },
  // stop watch logic
  stopWatch: function () {
    submdl_timer.seconds += 1;

    // logic is determines when increament next value

    if (submdl_timer.seconds / 60 === 1) {
      submdl_timer.seconds = 0;
      submdl_timer.minutes += 1;
      if (submdl_timer.minutes / 60 === 1) {
        submdl_timer.minutes = 0;
        submdl_timer.hours += 1;
      }
    }

    // submdl_timer.seconds++/hours/minutes dispaly
    if (submdl_timer.displaySecs < 10) {
      submdl_timer.displaySecs = `0${submdl_timer.seconds.toString()}`;
    } else {
      submdl_timer.displaySecs = submdl_timer.seconds;
    }
    if (submdl_timer.displayMins < 10) {
      submdl_timer.displayMins = `0${submdl_timer.minutes.toString()}`;
    } else {
      submdl_timer.displayMins = submdl_timer.minutes;
    }
    if (submdl_timer.displayHours < 10) {
      submdl_timer.displayHours = `0${submdl_timer.hours.toString()}`;
    } else {
      submdl_timer.displayHours = submdl_timer.hours;
    }

    // display updates time

    submdl_timer.timeDisplay.innerHTML = `${submdl_timer.displayHours} : ${submdl_timer.displayMins} :   ${submdl_timer.displaySecs}`;
  },
  // total time

  totalTimeSpent: async function () {
    const totalTime = submdl_timer.hours * 60 + submdl_timer.minutes + submdl_timer.seconds / 60;
    // console.log(totalTime);
    if (submdl_timer.subModuleName.innerText === '') {
      alert('select submodule');
    } else {
      const send = {
        name: submdl_timer.subModuleName.innerText,
        mainModelName: submdl_timer.moduleLender.innerText,
        createdAt: new Date(),
        time: totalTime
      };
      console.log(send.createdAt);
      // console.log(this.connection);
      // console.log(window.navigator.onLine);
      this.idbTimebox(send);
      // this.idbGetallTime();
      // this.idbGetByMainmodelName('GCP');
    }
    submdl_timer.reset();
    localStorage.removeItem('timeInit');
  },
  startStop: function () {
    if (submdl_timer.status === 'stopped') {
      // start stop watch interval
      submdl_timer.interval = window.setInterval(submdl_timer.stopWatch, 1000.7);
      submdl_timer.localInterval = window.setInterval(submdl_timer.updateLoacalStorage, 5000);
      submdl_timer.status = 'started';
    } else {
      window.clearInterval(submdl_timer.interval);
      submdl_timer.status = 'stopped';
      window.clearInterval(submdl_timer.localInterval);
      localStorage.removeItem('timeInit');
    }
  },
  // reset btn ...
  reset: function () {
    window.clearInterval(submdl_timer.interval);
    window.clearInterval(submdl_timer.localInterval);
    localStorage.removeItem('timeInit');
    submdl_timer.seconds = 0;
    submdl_timer.minutes = 0;
    submdl_timer.hours = 0;
    submdl_timer.timeDisplay.innerHTML = '00 : 00 : 00';
    submdl_timer.playPauseCheckbox.checked = true;

    if (submdl_timer.status === 'started') {
      submdl_timer.status = 'stopped';
    }
  },

  updateLoacalStorage: async function () {
    const totalTime = submdl_timer.hours * 60 + submdl_timer.minutes + submdl_timer.seconds / 60;
    const send = {
      name: submdl_timer.subModuleName.innerText,
      mainModelName: submdl_timer.moduleLender.innerText,
      createdAt: new Date(),
      time: totalTime
    };
    localStorage.timeInit = JSON.stringify(send);
  },

  saveLcTime: function () {
    if (localStorage.timeInit) {
      const send = JSON.parse(localStorage.timeInit);
      this.idbTimebox(send);
      localStorage.removeItem('timeInit');
    }
  }
};

export {
  submdl_timer
};
