/* eslint-disable no-undef */

setInterval(() => {
  let seconds = document.querySelector('#countdown').innerText;
  if (seconds > 0) {
    seconds -= 1;
  }
  document.querySelector('#countdown').innerText = seconds;
}, 1000);
setTimeout(() => {
  // reload the index page after almost 5 seconds.
  window.location.href = '/';
}, 4900);
