/* eslint-disable import/prefer-default-export */

/* observer animation */
function model_animation() {
  const callback = (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("is-visible");
    });
  };
  const observer = new IntersectionObserver(callback);
  const targets = document.querySelectorAll(".model");
  targets.forEach((target) => {
    observer.observe(target);
  });
}
export { model_animation };
