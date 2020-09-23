/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
// import {
//   submdl_timer
// } from '/js/stopwatch.js'

const mainModelName = document.querySelector('#moduleLender');
const mainModelNamevalue = mainModelName.innerText;
const subForm = document.querySelector('#submodel-form');
const mainName = document.querySelector('.module');
const submodelnameinput = document.querySelector('#submodelnameinput');

// get
function get(url) {
  return fetch(url).then(onSuccess, onError);
}

// post
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
  return get(`/submodels/lenderSmodels/${mainModelNamevalue}?id=${localStorage.tenant_ID}`);
}

async function get_submodels_statistics(functiontobe) {
  if (!window.navigator.onLine || !navigator.connection.effectiveType === 'slow-2g') {
    return get(`/timebox/${mainModelNamevalue}?id=${localStorage.tenant_ID}`);
  } else {
    const data = await get(`/timebox/${mainModelNamevalue}?id=${localStorage.tenant_ID}`);
    const dbpromise = indexedDB.open('timeBot-test-indexdb', 3);
    dbpromise.onerror = event => {
      console.error(event);
    }
    dbpromise.onsuccess = (event) => {
      const db = event.target.result;
      const transaction = db.transaction(["timebox"], "readonly");
      // Do something when all the data is added to the database.
      transaction.oncomplete = function (event) {
        console.log("All done!");
        console.log(data);
        functiontobe(data);
      };

      transaction.onerror = function (event) {
        // Don't forget to handle errors!
        throw (err => {
          console.log(err);
        })
      };

      const objectStore = transaction.objectStore("timebox");
      objectStore.getAll().onsuccess = function (event) {
        event.target.result.forEach(e => {
          if (e.mainModelName === mainModelNamevalue) {
            data.push(e)
          }
        });
      }
    }
  }
}

function post_submdl() {
  subForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const send = {
      mainMname: mainName.inneText,
      name: submodelnameinput.value
    };

    await post(`/submodels/addmdl?id=${localStorage.tenant_ID}`, send);
  });
}

// exposing modular patterns
export {
  get_submodels,
  get_submodels_statistics,
  post_submdl,
  post
};
