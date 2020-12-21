/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-underscore-dangle */

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);

  workbox.precaching.precacheAndRoute([{"revision":"c45cb6dc75e714422f56cd80d89e179c","url":"images/clear-black-36dp.svg"},{"revision":"bc1b0517c07f1ad8f7dc9b71eb91509a","url":"images/close-white-36dp.svg"},{"revision":"c989ddbe69d51119acb753b5666c46be","url":"images/darkred-icon.svg"},{"revision":"bdc1e12b9b480799518b3a2b29ff0e9c","url":"images/logo.svg"},{"revision":"d82afdcc82f3efb5dcfec596c7704a22","url":"images/logo2.svg"},{"revision":"1dec69db3bbdffc7b3086fc40c0ee9fb","url":"images/logo3.svg"},{"revision":"614067741cfaf00c767a75603072a451","url":"images/logo4.svg"},{"revision":"68a4ce741bc6a32cbb91c0a02352bf42","url":"images/logo5.svg"},{"revision":"aa1ffa40696a4d3ea569ffede708b808","url":"images/logo6.svg"},{"revision":"8cf638a6ba3334b53b01945921456a7a","url":"images/logo7.svg"},{"revision":"5bfcebec9e684d9140556431613e4226","url":"images/mainlogo.svg"},{"revision":"06113415db80fa2c497b356ecd2e5ff4","url":"images/orange-cyan-icon.svg"},{"revision":"dd66a7c8e2a4b09546f8159846b4ffac","url":"images/orange-icon.svg"},{"revision":"54725fcedaa45c05414b2d8f91b8c47a","url":"images/orange-main-512.svg"},{"revision":"09f032815da89ea9ba19d95c36316723","url":"images/orange-white-icon.svg"},{"revision":"1c130d7ca2efe278dc75847f1a205542","url":"images/pink-icon.svg"},{"revision":"eff35f40a982118d65aa9615b2806a26","url":"images/red-icon.svg"},{"revision":"19142cc51b8c074217df3d7499267bf0","url":"images/search-black-18dp.svg"},{"revision":"e867c1eea0ff51db656f2328c2acfda1","url":"images/search-white-36dp.svg"},{"revision":"e601e473add86474eaf723236b0e2c53","url":"images/search36px.svg"},{"revision":"907bb2616ce1f38a05b0f3b83ed3535e","url":"index.html"},{"revision":"aa8933d4ecdfac14b7864d87bcfc4410","url":"js/addform.js"},{"revision":"78c4843db1d1250290cf980778a7064c","url":"js/api.js"},{"revision":"1bf50d10fa3d4f95875eabce445facc4","url":"js/filter_names.js"},{"revision":"addb5219c10f81e19f2f0750ee9a0d4d","url":"js/index.js"},{"revision":"95d8380af0e768113fd3bb87118101b7","url":"js/mychart.js"},{"revision":"70dee35be554eab717044421e0e0788d","url":"js/observer_animation.js"},{"revision":"2b56916cb78b331aa9baaf860e2b7e90","url":"js/pwa.js"},{"revision":"29382e49571ba9438c567863abd7f0e9","url":"js/stopwatch.js"},{"revision":"2a987fbc8c6af8f1020480e943b1c282","url":"js/sub_mdl_api.js"},{"revision":"85d7c2eb7d63d6085b7b653157b6a27e","url":"js/subindex.js"},{"revision":"915b351e1b0bc1a2ee42c7fb89ad8321","url":"styles/add-mdl-form.css"},{"revision":"bd5478a5527062795dd48793c9ad7665","url":"styles/globalform.css"},{"revision":"821fa50732ea506508b267dd56653f20","url":"styles/hamberger.css"},{"revision":"4149712330fac0f2a9634fa46d823f5c","url":"styles/index.css"},{"revision":"72fd8620f60f7ab150b75ab3d41b5563","url":"styles/loginform.css"},{"revision":"1b80fe4dc317d80be09e89b8a832e1f5","url":"styles/mediaquery.css"},{"revision":"bbf50844c18ae4cd44daa10bb1008fed","url":"styles/model.css"},{"revision":"09dad5f8369140a49c06fc9252e62dbd","url":"styles/register.css"},{"revision":"1dbf9f21c55a641590aa371dc98ff014","url":"styles/reset.css"},{"revision":"19f3881ed57e7c89c78ba4d49d58d1aa","url":"styles/timer.css"}]);

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
