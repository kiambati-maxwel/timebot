/* eslint-disable */
/* ------- import filter models && api && timer object ------- */
import {
  filterModels
} from '/js/filter_names.js';
import {
  get_submodels,
  get_submodels_statistics
} from '/js/sub_mdl_api.js';
import {
  submdl_timer
} from '/js/stopwatch.js';

// search function
filterModels();

// DOM
const mainInput = document.querySelector('#submodel-main-m-nput');
const mainModelName = document.querySelector('#moduleLender');
const mainModelNamevalue = mainModelName.innerText;
const subModelNameTimer = document.querySelector('#subModelNameTimer');
const clearTimer = document.querySelector('#s-timer');
const tTimeToday = document.querySelector('.tTimeToday');
const totalTimeSpen = document.querySelector('#totalTimeSpen');
const totalTanlysed = document.querySelector('#totalTanlysed');
const analysedToday = document.querySelector('#analysedToday');

window.addEventListener('load', submdl_timer.saveLcTime());
// start stop timer
submdl_timer.playPauseCheckbox.addEventListener('click', () => {
  if (submdl_timer.subModuleName.innerText === '') {
    alert('select submodel');
    submdl_timer.playPauseCheckbox.checked = true;
  } else {
    submdl_timer.startStop();
  }
});

// reset btn ...
submdl_timer.resetbtn.addEventListener('click', () => {
  submdl_timer.reset();
});

// save time
submdl_timer.savebtn.addEventListener('click', () => {
  submdl_timer.totalTimeSpent();
  submdl_timer.reset();
});

window.addEventListener('DOMContentLoaded', async () => {
  await get_submodels().then(submodels => {
    mainInput.value = mainModelNamevalue;

    // get submodels and populate DOM
    submodels.forEach(e => {
      let model = document.createElement('h1');
      let aElement = document.createElement('a');
      aElement.innerHTML = `${e.name}`;
      model.appendChild(aElement);
      model.classList = `model model-${e._id}`;
      model.id = e._id;
      document.querySelector('#submodels').prepend(model);

      model.addEventListener('click', () => {
        add_timer();
        const modelResize = document.querySelectorAll('.model');
        subModelNameTimer.innerText = model.innerText;
        modelResize.forEach(e => {
          if (e.id !== model.id) {
            // e.style.backgroundColor = "yellow";
            e.style.backgroundColor = "rgb(14, 14, 14)";
            e.style.color = "#000000";
            e.style.opacity = "0.5";
            e.style.transitionDuration = ".7s";
          } else {
            e.style.backgroundColor = "#000000"
            e.style.transitionDuration = ".1s";
            e.style.opacity = "1";
          }
        });
      });
    });
  });

  // get and analyse time
  await get_submodels_statistics().then(info => {
    let d = null;
    let t = null;
    let tt = null;
    let ttd = 0;
    const subTopic = [];
    const subTopicToday = []
    const subTopicTime = [];
    const subTopicTimetoday = [];
    const time_today_an = [];

    if (info[0] === undefined) {
      totalTimeSpen.innerHTML = `total time :<span>0</span>`;
    } else {
      const dateToday = new Date();

      info.forEach(e => {
        t += e.time;
        let dateN = new Date(e.createdAt);

        if (subTopicTime.length < 1 || subTopic.includes(e.name) !== true) {
          info.filter(info => {
            /* filter subtopic name in info get request data */
            return info.name === e.name;
          }).map(sbn => {
            return sbn.time; /* map time into an array */
          }).forEach(e => {

            tt += e;

          });
          subTopic.push(e.name);
          subTopicTime.push({
            name: e.name,
            time: tt
          });
          tt = null;
        }

        if (dateToday.getDate() === dateN.getDate() &&
          dateToday.getFullYear() === dateN.getFullYear() &&
          dateToday.getMonth() === dateN.getMonth()) {
          d += e.time;
          time_today_an.push({
            name: e.name,
            time: e.time
          });
        } else {
          d = 0;
        }
      });
    }

    subTopicTime.forEach(e => {
      let appendAnTime = document.createElement('li');
      appendAnTime.innerHTML = `${e.name} : <span> ${Math.trunc(e.time / 60)} hr ${Math.trunc(e.time % 60)} min </span>`;
      totalTanlysed.prepend(appendAnTime);
    });

    // populate time for each submodel today
    time_today_an.forEach(info => {
      if (subTopicTimetoday.length < 1 || subTopicToday.includes(info.name) === false) {
        time_today_an.filter(data => {
          /* filter subtopic name in info get request data */
          return info.name === data.name;
        }).map(sbn => {
          return sbn.time /* map time into an array */
        }).forEach(e => {
          ttd += e;
        });
        subTopicToday.push(info.name);
        subTopicTimetoday.push({
          name: info.name,
          time: ttd
        });
      }
      ttd = null;
    });

    console.log(subTopicTimetoday);
    console.log(time_today_an);
    subTopicTimetoday.forEach(e => {
      let appendAnTime = document.createElement('li');
      appendAnTime.innerHTML = `${e.name} : <span> ${Math.trunc(e.time / 60)} hr ${Math.trunc(e.time % 60)} min </span>`;
      analysedToday.prepend(appendAnTime);
    });

    totalTimeSpen.innerHTML = `Total : <span> ${Math.trunc(t / 60)} hr ${Math.trunc(t % 60)} min </span>`;
    tTimeToday.innerHTML = `Today : <span> ${Math.trunc(d / 60)} hr ${Math.trunc(d % 60)} min </span>`;
  });
});

// timer section lender
function add_timer() {
  if (clearTimer.className === 'add-visibility') {
    clearTimer.classList.remove('add-visibility');
  } else {
    clearTimer.classList.add('add-visibility');
  }
}
