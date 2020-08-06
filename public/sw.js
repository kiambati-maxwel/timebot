/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

  workbox.routing.registerRoute(
    ({
      url
    }) => url.pathname.startsWith('/lnmodels'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    ({
      url
    }) => url.pathname.startsWith('/timebox'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    ({
      url
    }) => url.pathname.startsWith('/submodels'),
    new workbox.strategies.NetworkFirst()
  );

  workbox.routing.registerRoute(
    ({
      url
    }) => url.pathname.startsWith('/jss/Chart.min.js'),
    new workbox.strategies.StaleWhileRevalidate()
  );
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}
