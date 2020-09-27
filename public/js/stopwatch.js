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
  start: null,
  pauseCheck: false,
  timeAfterPause: 0,
  dateOnPause: 0,
  totalTime: 0,

  // stop watch logic
  stopWatch: function () {
    // milliseconds elapsed since start
    let delta = 0;
    if (submdl_timer.timeAfterPause !== 0) {
      delta = (Date.now() - submdl_timer.start) - submdl_timer.timeAfterPause
    } else {
      delta = Date.now() - submdl_timer.start;
    }

    submdl_timer.totalTime = delta;
    submdl_timer.seconds = Math.floor(delta / 1000) % 60;
    submdl_timer.minutes = Math.floor(delta / 60000) % 60;
    submdl_timer.hours = Math.floor(delta / 3600000);

    // display an extra zeroDirectives &
    if (submdl_timer.seconds < 10) {
      submdl_timer.displaySecs = `0${submdl_timer.seconds.toString()}`;
    } else {
      submdl_timer.displaySecs = submdl_timer.seconds;
    }
    if (submdl_timer.minutes < 10) {
      submdl_timer.displayMins = `0${submdl_timer.minutes.toString()}`;
    } else {
      submdl_timer.displayMins = submdl_timer.minutes;
    }
    if (submdl_timer.hours < 10) {
      submdl_timer.displayHours = `0${submdl_timer.hours.toString()}`;
    } else {
      submdl_timer.displayHours = submdl_timer.hours;
    }

    // display updates time
    submdl_timer.timeDisplay.innerHTML = `${submdl_timer.displayHours} : ${submdl_timer.displayMins} :   ${submdl_timer.displaySecs}`;
  },

  // save toTal time in minutes
  totalTimeSpent: async function () {
    const totalTime = submdl_timer.totalTime / 60000;
    if (submdl_timer.subModuleName.innerText === '') {
      alert('select submodule');
    } else {
      const send = {
        name: submdl_timer.subModuleName.innerText,
        mainModelName: submdl_timer.moduleLender.innerText,
        createdAt: new Date(),
        time: totalTime
      };
      await post(`/timebox/saveme?id=${localStorage.tenant_ID}`, send);
    }
    submdl_timer.reset();
    localStorage.removeItem('timeInit');
  },
  startStop: function () {
    if (submdl_timer.status === 'stopped') {
      // start stop watch interval
      if (submdl_timer.pauseCheck === false) {
        submdl_timer.start = Date.now();
      } else if (submdl_timer.dateOnPause !== 0) {
        submdl_timer.timeAfterPause += Date.now() - submdl_timer.dateOnPause;
      }
      submdl_timer.interval = window.setInterval(submdl_timer.stopWatch, 1000.7);
      submdl_timer.localInterval = window.setInterval(submdl_timer.updateLoacalStorage, 5000);
      submdl_timer.status = 'started';
    } else {
      window.clearInterval(submdl_timer.interval);
      submdl_timer.pauseCheck = true;
      submdl_timer.dateOnPause = Date.now();
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
    submdl_timer.start = null;
    submdl_timer.seconds = 0;
    submdl_timer.minutes = 0;
    submdl_timer.hours = 0;
    submdl_timer.dateOnPause = 0;
    submdl_timer.timeAfterPause = 0;
    submdl_timer.pauseCheck = false;
    submdl_timer.totalTime = 0;
    submdl_timer.timeDisplay.innerHTML = '00 : 00 : 00';
    submdl_timer.playPauseCheckbox.checked = true;

    if (submdl_timer.status === 'started') {
      submdl_timer.status = 'stopped';
    }
  },

  updateLoacalStorage: async function () {
    const totalTime = submdl_timer.totalTime / 60000;
    const send = {
      name: submdl_timer.subModuleName.innerText,
      mainModelName: submdl_timer.moduleLender.innerText,
      createdAt: new Date(),
      time: totalTime
    };
    localStorage.timeInit = JSON.stringify(send);
  },

  // save to local storage incase one closes the window accidentally
  saveLcTime: function () {
    if (localStorage.timeInit) {
      const send = JSON.parse(localStorage.timeInit);
      post(`/timebox/saveme?id=${localStorage.tenant_ID}`, send);
      localStorage.removeItem('timeInit');
    }
  }
};

export {
  submdl_timer
};
