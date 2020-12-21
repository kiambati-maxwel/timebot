/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */

function get(url) {
  return fetch(url).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error);
}

function get_models() {
  return get(`/lnmodels?id=${localStorage.tenant_ID}`);
}

function get_time_sts() {
  return get(`/timebox/sts?id=${localStorage.tenant_ID}`);
}

export {
  get_models,
  get_time_sts
};
