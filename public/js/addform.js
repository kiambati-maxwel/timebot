/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const clearTimerBtn = document.querySelector('.sub-stats-sec');
const modelStats = document.querySelector('#modelStats');
const addForm = document.querySelector('#add-model-form');
const addsubmodelform = document.querySelector('#submodel-form');
const submodelstats = document.querySelector('#sub-model-stats');

function clearElement(element) {
  if (element.className === 'add-visibility') {
    element.classList.remove('add-visibility');
  } else {
    element.classList.add('add-visibility');
  }
}
