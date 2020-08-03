/* eslint-disable */
import { filterModels } from '/js/filter_names.js';
import { get_submodels } from '/js/sub_mdl_api.js';

const mainInput = document.querySelector('#submodel-main-m-nput');
const playpause = document.querySelector('.play-pause');
const mainModelName = document.querySelector('#moduleLender');
const mainModelNamevalue = mainModelName.innerText;
const subModelNameTimer = document.querySelector('#subModelNameTimer');
const clearTimer = document.querySelector('#s-timer');

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