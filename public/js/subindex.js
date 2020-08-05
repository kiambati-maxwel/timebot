/* eslint-disable */
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

const mainInput = document.querySelector('#submodel-main-m-nput');
const playpause = document.querySelector('.play-pause');
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

submdl_timer.savebtn.addEventListener('click', () => {
  submdl_timer.totalTimeSpent();
  console.log('time saved');
  submdl_timer.reset();
});



filterModels();
window.addEventListener('DOMContentLoaded', async () => {
  await get_submodels().then(submodels => {
    mainInput.value = mainModelNamevalue;

    submodels.forEach(e => {
      let model = document.createElement('h1');
      let aElement = document.createElement('a');
      aElement.innerHTML = `${e.name}`;
      model.appendChild(aElement);
      model.classList = `model model-${e.id}`;
      model.id = e.id;
      document.querySelector('#submodels').prepend(model);

      model.addEventListener('click', () => {
        // add_playbtn();
        add_timer();
        const modelResize = document.querySelectorAll('.model');
        subModelNameTimer.innerText = model.innerText;
        // subModuleName = model.innerText;
        // console.log(model.id);
        modelResize.forEach(e => {
          if (e.id !== model.id) {
            // console.log(e);
            e.style.backgroundColor = "yellow";
            e.style.opacity = "0.5";
            e.style.transitionDuration = ".7s";
          } else {
            e.style.backgroundColor = "green";
            e.style.transitionDuration = ".1s";
            e.style.opacity = "1";
          }
        });
      });
    });
  });

  await get_submodels_statistics().then(info => {
    console.log(info);
    console.log(totalTimeSpen.innerText);
    let d = null;
    let t = null;
    let tt = null;
    let ttd = null
    let subTopic = [];
    let subTopicToday = []
    let subTopicTime = [];
    let subTopicTimetoday = [];
    let time_today_an = [];
    if (info[0] === undefined) {
      console.log('nothing');
      totalTimeSpen.innerText = `total time : 0`;

    } else {
      const dateToday = new Date();

      console.log(dateToday);

      info.forEach(e => {
        t += e.time;
        let dateN = new Date(e.createdAt);

        if (subTopicTime.length < 1 || subTopic.includes(e.name) !== true) {
          info.filter(info => {
            /* filter subtopic name in info get request data */
            return info.name === e.name;
          }).map(sbn => {
            return sbn.time /* map time into an array */
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
          })
        } else {
          d = 0
        }

      })
    }
    console.log(subTopicTime);

    subTopicTime.forEach(e => {
      let appendAnTime = document.createElement('li');
      appendAnTime.innerText = `${e.name} : ${Math.trunc(e.time / 60)} hr ${Math.trunc(e.time % 60)} min`;
      totalTanlysed.prepend(appendAnTime);
    });

    time_today_an.forEach(info => {
      console.log(info);
      if (subTopicTimetoday.length < 1 || subTopicToday.includes(info.name) !== true) {
        time_today_an.filter(info => {
          /* filter subtopic name in info get request data */
          return info.name;
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
        ttd = null;

      }
    });
    subTopicTimetoday.forEach(e => {
      let appendAnTime = document.createElement('li');
      appendAnTime.innerText = `${e.name} : ${Math.trunc(e.time / 60)} hr ${Math.trunc(e.time % 60)} min`;
      analysedToday.prepend(appendAnTime);
    });

    totalTimeSpen.innerText = `total time : ${Math.trunc(t / 60)} hr ${Math.trunc(t % 60)} min`;
    console.log(d);
    tTimeToday.innerText = `Today : ${Math.trunc(d / 60)} hr ${Math.trunc(d % 60)} min`;
  })
});


function add_playbtn() {
  if (playpause.className === 'play-pause add-visibility') {
    playpause.classList.remove('add-visibility');
  } else {
    playpause.classList.add('add-visibility');
  };
}

function add_timer() {
  if (clearTimer.className === 'add-visibility') {
    clearTimer.classList.remove('add-visibility');
  } else {
    clearTimer.classList.add('add-visibility');
  };
}
