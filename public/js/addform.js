/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
const modelStats = document.querySelector('#modelStats');
const addForm = document.querySelector('#add-model-form');
const addsubmodelform = document.querySelector('#submodel-form');
const submodelstats = document.querySelector('#sub-model-stats');
const login = document.querySelector('#login');
const add_model_form = document.querySelector('#add-model-form');
const submod = document.querySelector('.ln-models');
const submodelform = document.querySelector('#submodel-form');

function clearElement(element) {
  if (element.className === 'add-visibility') {
    element.classList.remove('add-visibility');
  } else {
    element.classList.add('add-visibility');
  }
}

if (submod.id === 'lnmodels') {
  const ifnoaccount = document.querySelector('.if-no-account');
  const registerr = document.querySelector('#register');

  ifnoaccount.addEventListener('click', () => {
    console.log('is acount');
    clearElement(registerr);
  });

  if (!localStorage.tenant_ID) {
    clearElement(login);
  } else {
    add_model_form.setAttribute('action', `/lnmodels/addmdl?id=${localStorage.tenant_ID}`);
  }
} else {
  submodelform.setAttribute('action', `/submodels/addmdl?id=${localStorage.tenant_ID}`);
}
