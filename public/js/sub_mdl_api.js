/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

const mainModelName = document.querySelector('#moduleLender');
const mainModelNamevalue = mainModelName.innerText;
const subForm = document.querySelector('#submodel-form');
const mainName = document.querySelector('.module');
const submodelnameinput = document.querySelector('#submodelnameinput');

function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function post(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}

function get_submodels() {
  return get(`/submodels/lenderSmodels/${mainModelNamevalue}`);
}

function get_submodels_statistics() {
  return get(`/timebox/${mainModelNamevalue}`);
}

function post_submdl() {
  subForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const send = {
      mainMname: mainName.inneText,
      name: submodelnameinput.value
    };

    await post(`/submodels/addmdl`, send);
  });
}

export {
  get_submodels,
  get_submodels_statistics,
  post_submdl,
  post
};
