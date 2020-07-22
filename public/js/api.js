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

function get_users() {
  return get('/users');
}
function get_name() {
  return get('/appshell');
}

export { get_users, get_name };
