import { getData, newData, getSpecificData, postSpecificData } from "./api.js";
import { putData, autoRefresh, scrollFunction, activitySession, tasksTotalPercentage, closeTask, tempOpenedTaskPosition } from "./home-page-functions.js";
import { } from './profile-page-functions.js'
import { } from './loading-account-data.js'

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
export function createAD(inputText, inputColor) {

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
const unreadedNotifications = document.querySelector('.notificationsIcon .icon-bell');

export function unreadedNotificationsDot() {
  if (document.querySelector('.unreadedNotification')) {
    // console.log('pass here');
    unreadedNotifications.classList.add('unreadedNotifications');
  } else {
    unreadedNotifications.classList.remove('unreadedNotifications');
  }
}

let notification = document.querySelectorAll('.notification');

const notificationBellIcon = document.querySelector('.notificationsIcon');

let notificationBannerLeft;
notificationBellIcon.querySelector('span').addEventListener('click', () => {
  notificationBannerLeft = Number((window.getComputedStyle(document.querySelector('#notificationBanner')).left).slice(0, -2));

  if (notificationBannerLeft < 0) {
    document.querySelector('#notificationBanner').style.left = '0'
    document.querySelector('#notificationBanner').style.left = '15px'
  } else {
    document.querySelector('#notificationBanner').style.left = '-100dvw'
  }
  
})

export function notificationsFunction() {
  notification = document.querySelectorAll('.notification');

  notification.forEach((v) => {
    const notificationDetails = v.querySelector('.notificationDetails');    

    v.addEventListener('click', async () => {
      closeNotification();

      if (!(v.classList.contains('CurrentOpenedNotification'))) {
        v.style.minHeight = `${v.getBoundingClientRect().height}px`;
        v.style.minHeight = `${(v.getBoundingClientRect().height) + (notificationDetails.getBoundingClientRect().height)}px`;

        notificationDetails.style.top = `${(v.querySelector('.notificationHeader').getBoundingClientRect().height)}px`
        v.classList.add('CurrentOpenedNotification');

        if (v.classList.contains('unreadedNotification')) {
          v.classList.remove('unreadedNotification');
          console.log('unreaded',v.getAttribute('id'));
          let getNotic = await getSpecificData('notifications','id',v.getAttribute('id'));
          getNotic[0].state = '';
          const toAPIData = await postSpecificData('notifications','id',v.getAttribute('id'),getNotic[0]);
          console.log(toAPIData);
        }

        

        unreadedNotificationsDot();    
      }
    })
    v.querySelector('.notificationExit').addEventListener('click', () => {
      closeNotification();
    })
  })
}


function closeNotification() {
  const currrenOpenedNotification = document.querySelector('.CurrentOpenedNotification');

  setTimeout(() => {
    if (currrenOpenedNotification) {
      currrenOpenedNotification.style.minHeight = `${(currrenOpenedNotification.querySelector('.notificationHeader').getBoundingClientRect().height + 5)}px`;
      currrenOpenedNotification.classList.remove('CurrentOpenedNotification');
      unreadedNotificationsDot();
    }
  }, 10)
}



// exit opened windows from outside

window.addEventListener('click', (click) => {
  if (!click.target.closest('.CurrentOpenedNotification')
    && !(click.target.closest('#openedTask'))
    && !(click.target.closest('.task'))
    && !(click.target.closest('.notificationsIcon span'))
    && !(click.target.closest('#notificationBanner'))) {
    tempOpenedTaskPosition ? closeTask() : null;
    closeNotification();
    notificationBannerLeft < 0 ? document.querySelector('#notificationBanner').style.left = '-100dvw' : null;
  };
})


// tasks
tasksTotalPercentage();


//loading profile data
