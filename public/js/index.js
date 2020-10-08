/* eslint-disable */
'use strict'
import {
  get_models,
  get_time_sts
} from '/js/api.js';
import {
  filterModels
} from '/js/filter_names.js';

filterModels();

// populate ln-models
window.addEventListener('DOMContentLoaded', async () => {
  let globalData = [];
  await get_models().then(models => {
    models.forEach(m => {
      const model = document.createElement('h1');
      const aElement = document.createElement('a');
      aElement.href = `/submodels/${m.name}?id=${localStorage.tenant_ID}`;
      aElement.innerHTML = `${decodeURI(m.name)}`;
      model.appendChild(aElement);
      // const requests = document.createElement('datalist');
      // const option = document.createElement('option');
      // const option2 = document.createElement('option');
      // option2.innerHTML = '';
      // const optionAdress = document.createElement('a');
      // optionAdress.href = `/lnmodels/delete/${decodeURI(m.name)}?id=${localStorage.tenant_ID}`;
      // optionAdress.innerHTML = 'delete';
      // option.appendChild(optionAdress);
      // requests.appendChild(option2);
      // requests.appendChild(option);
      // model.appendChild(requests);
      model.classList = `model model-${m._id}`;
      document.querySelector('#lnmodels').prepend(model);
    });
  });
  await get_time_sts().then(data => {
    // console.log(data);
    // console.log(data.dayNameGraphArray);
    // console.log(data.dayGraphArray);
    globalData = data.allTime;
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dayNameGraphArray.reverse(),
        datasets: [{
          label: '# time in hrs',
          data: data.dayGraphArray.reverse(),
          backgroundColor: [
            'rgba(255, 99, 132, 0.1)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(199, 199, 199, 1)',
            'rgba(170, 20, 3, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(63, 159, 116, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 1,
              fontSize: 22,
              fontColor: '#9e9e9e'
            },
            gridLines: {
              // display: false
              // color: "#9e9e9e"
              zeroLineColor: '#6ea9b1',
            }
            // stacked: true
          }],
          xAxes: [{
            gridLines: {
              // display: false
              // color: "#9e9e9e"
              zeroLineColor: '#6ea9b1'
            },
            ticks: {
              fontSize: 15,
              fontColor: '#9e9e9e'
            }
          }]
        },
        // showLine: false
      }
    });
    const modelStats = document.querySelector('#modelStats');
    const Today = document.createElement('h3');
    Today.innerHTML = `Today : <span> ${Math.trunc(data.totalTimeToday / 60)} hrs ${Math.trunc(data.totalTimeToday % 60)} mins`;
    modelStats.appendChild(Today);
    const todaysts = document.createElement('ul');

    data.modelTimeT.forEach(e => {
      const li = document.createElement('li');
      li.innerHTML = `${e.name}<strong>:</strong> <span>${Math.trunc(e.time / 60)} hr ${Math.trunc(e.time % 60)} min</span>`;
      todaysts.appendChild(li);
    });

    modelStats.appendChild(todaysts);
    const Ttime = document.createElement('h3');
    Ttime.innerHTML = `Total : <span>${Math.trunc(data.totalTime / 60)} hr ${Math.trunc(data.totalTime % 60)} min </span>`
    modelStats.appendChild(Ttime);
    const mli = document.createElement('ul');
    data.modelTime.forEach(e => {
      const li = document.createElement('li');
      li.innerHTML = `${e.name} <strong>:</strong> <span> ${Math.trunc(e.time / 60)} hr
     ${Math.round(e.time % 60)} min</span>`;
      mli.appendChild(li);
    });

    modelStats.appendChild(mli);
  });

  (function dateFinder() {
    const getDateActivity = document.querySelector('#search-by-date-form');
    const dateInput = document.querySelector('#search-by-date');
    const render_date_activity = document.querySelector('#render-date-activity');
    getDateActivity.addEventListener('submit', getDateData);

    function getDateData(e) {

      e.preventDefault();
      render_date_activity.style.display = 'block';
      render_date_activity.innerHTML = '';
      const clear_btn = document.createElement('button');
      clear_btn.innerText = 'close'
      clear_btn.addEventListener('click', () => {
        render_date_activity.style.display = 'none';
      });
      render_date_activity.appendChild(clear_btn);

      const date_names_handler = [];
      const time_date = [];
      let total_time = 0;
      let handleLis = [];
      const myDate = new Date(dateInput.value);
      const on_this_date = globalData.filter(data => {
        const date = new Date(data.createdAt)
        return date.getFullYear() === myDate.getFullYear() &&
          date.getMonth() === myDate.getMonth() &&
          date.getDate() === myDate.getDate();
      });
      if (on_this_date.length < 1) {
        window.alert('date  not recorded please confirm entries for this DATE');
        render_date_activity.style.display = 'none';
      } else {
        on_this_date.forEach(e => {
          if (date_names_handler.length < 1 || date_names_handler.includes(e.name) === false) {
            date_names_handler.push(name);
            on_this_date.filter(info => {
              return info.mainModelName === e.mainModelName &&
                info.name === e.name;
            }).map(t => {
              return t.time
            }).forEach(e => {
              total_time += e
            });
            time_date.push({
              mainModelName: e.mainModelName,
              name: e.name,
              time: total_time
            });
            total_time = 0;
          }
        });

        const handle_lender = [];

        time_date.forEach(e => {
          if (handle_lender.includes(e.mainModelName) === false) {
            handle_lender.push(e.mainModelName);
            const nammme = e.mainModelName;
            const h3 = document.createElement('h3');
            h3.innerHTML = nammme;

            render_date_activity.appendChild(h3);

            const ul = document.createElement('ul');

            time_date.filter(data => {
              return data.mainModelName === e.mainModelName
            }).forEach(e => {
              if (handleLis.includes(e.name) === false) {
                handleLis.push(e.name);
                const li = document.createElement('li')
                li.innerHTML = `${e.name} : <span> ${Math.trunc(e.time / 60)} hr ${Math.trunc(e.time % 60)} min </span> `;
                ul.appendChild(li);
              }

            });
            handleLis = [];
            render_date_activity.appendChild(ul);
            render_date_activity.style.backgroundColor = '#303030';
          }
        });
        // console.log(on_this_date);
        // console.log(time_date);

      }
    }
  }());

});

// logout function
function logout() {
  const lg = document.querySelector('#sidebarMenu .logout-label');
  lg.addEventListener('click', () => {
    localStorage.removeItem('tenant_ID');
  });
}

logout();

function getInput() {
  const input = document.querySelector('.show-s-bar');
  input.addEventListener('click', () => {
    document.getElementById('search-model').focus();
    console.log('fucused');
  });
}
getInput();
