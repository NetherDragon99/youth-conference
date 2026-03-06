import { getData, newData } from "./api.js";
import { putData, autoRefresh, scrollFunction, activitySession } from "./home-page-functions.js";
import { } from './profile-page-functions.js'

scrollFunction();

async function todaysActivity() {
  await getData('conferenceActivitys');
  await putData(newData);
  autoRefresh(newData)
  activitySession();
}

addEventListener('hashchange', () => {
  localStorage.setItem('historyPage', location.hash);
})
window.addEventListener('DOMContentLoaded', () => {
  todaysActivity();
  location.hash = '';
  location.hash = localStorage.getItem('historyPage');
})



// creating ADs
let adBannerNumber = 0;
export function createAD(inputText,inputColor) {

  let color = 'red';
  if (inputColor) {
    color = inputColor
  }
  adBannerNumber += 1;

  document.getElementsByClassName('adBanner')[0].insertAdjacentHTML("beforeend", `<div class="adDiv ${color}">${inputText}</div>`);
  console.log('AD created');


  removeAD();
}
function removeAD() {
  for (adBannerNumber; adBannerNumber > 0; adBannerNumber--) {
    setTimeout(() => {
      document.querySelector('.adDiv:first-child').remove()
    }, 10000)

  }
}