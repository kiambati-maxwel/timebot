/* eslint-disable */
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
  await get_models().then(models => {
    models.forEach(m => {
      const model = document.createElement('h1');
      const aElement = document.createElement('a');
      aElement.href = `/submodels/${m.name}?id=${localStorage.tenant_ID}`;
      aElement.innerHTML = `${decodeURI(m.name)}`;
      model.appendChild(aElement);
      model.classList = `model model-${m.id}`;
      document.querySelector('#lnmodels').prepend(model);
    });
  });
  await get_time_sts().then(data => {
    console.log(data);
    console.log(data.dayNameGraphArray);
    console.log(data.dayGraphArray);
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.dayNameGraphArray,
        datasets: [{
          label: '# time in hrs',
          data: data.dayGraphArray,
          backgroundColor: [
            'rgba(255, 99, 132, 0.05)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgb(59, 25, 43)',
            'rgb(50, 20, 25)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
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
    Ttime.innerHTML = `total time : <span>${Math.trunc(data.totalTime / 60)} hr ${Math.trunc(data.totalTime % 60)} min </span>`
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
});

// logout function
function logout() {
  const lg = document.querySelector('#sidebarMenu .logout-label');
  lg.addEventListener('click', () => {
    localStorage.removeItem('tenant_ID');
  });
}

logout();
