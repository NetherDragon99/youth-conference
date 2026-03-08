import { getData, newData } from "./api.js";
import { putData, autoRefresh, scrollFunction, activitySession, tasksTotalPercentage } from "./home-page-functions.js";
import { } from './profile-page-functions.js'
import{} from './loading-account-data.js'

scrollFunction();

async function todaysActivity() {
  await getData('conferenceActivitys');
  await putData(newData);
  autoRefresh(newData)
  activitySession();
}

const footerNavIcons = document.querySelectorAll('body footer a');
addEventListener('hashchange', () => {
  const currentPage = location.hash;

  localStorage.setItem('historyPage', currentPage);

  footerNavIcons.forEach((v) => {
    v.querySelector(`span`).classList.remove('activePage');

    if (`${v.getAttribute('href')}` == `${currentPage}`) {
      v.setAttribute('class', 'active');
      v.querySelector(`span`).classList.add('activePage');
    }    
  })
})

window.addEventListener('load', () => {
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

// notifications
console.log((document.querySelector('.unreadedNotification')));
const unreadedNotificationsDot = document.createElement('style');
unreadedNotificationsDot.classList.add('unreadedNotificationsDot');
document.head.appendChild(unreadedNotificationsDot)

if (document.querySelector('.unreadedNotification')) {
  console.log('pass here');
  unreadedNotificationsDot.innerHTML = '.unreadedNotifications::after{content: "";}'
}else{
  unreadedNotificationsDot.innerHTML = '';
}

// tasks
tasksTotalPercentage();


//loading profile data
