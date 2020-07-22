/* eslint-disable */
import { get_users, get_name } from '/js/api.js';
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

window.addEventListener('DOMContentLoaded', async () => {
  await get_name().then(data => {
    console.log(data);
  })
});


















/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-unused-vars */


// import {
//     getUsers,
//     deleteUser
// } from './api/userApi';

//  populate table via API call
// getUsers().then(result => {
//     let userBody = "";

//     result.forEach(user => {
//         userBody += `<tr>
//         <td> <a href="#" data-id="${user.id}"
//         class="deleteUser">Delete</a></td>
//         <td>${user.id}</td>
//         <td>${user.firstName}</td>
//         <td>${user.lastName}</td>
//         <td>${user.email}</td>
//         </tr>
//         `
//     });

//     global.document.getElementById('users').innerHTML = userBody;

// });