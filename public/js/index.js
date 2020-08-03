/* eslint-disable */
import { get_users, get_name, get_models } from '/js/api.js';
import { chartinit } from '/js/mychart.js';
import { filterModels } from '/js/filter_names.js';

chartinit();
filterModels();
// import jquery from '../node_modules/jquery/dist/jquery';
console.log("bundled bundled all files");
console.log("source map test");

get_users().then(data => {
  console.log(data);
});

// populate ln-models
window.addEventListener('DOMContentLoaded', async () => {
  await get_name().then(data => {
    console.log(data);
  });
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
});
