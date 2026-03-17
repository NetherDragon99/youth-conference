import * as api from "./api.js";
import * as home from "./home-page-functions.js";
import * as loading from './loading-account-data.js';
import * as text from './text.js';
import * as rank from './rank-page.js'

home.scrollFunction();

async function todaysActivity() {
  await api.getData('conferenceActivitys');
  home.putData(api.newData);
  home.autoRefresh(api.newData)
  home.activitySession();
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
          let getNotic = await api.getSpecificData('notifications', 'id', v.getAttribute('id'));
          getNotic[0].state = '';
          const toAPIData = await api.updateSpecificData('notifications', 'id', v.getAttribute('id'), getNotic[0]);
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

//create notification
export function createNotification(whichNotification) {
  const tempEmail = JSON.parse(localStorage.getItem('profile')).email;
  let noticeData = text.notificationsdata[whichNotification];
  
  noticeData.email = tempEmail;
  noticeData.time = new Date();
  noticeData.state = 'unreadedNotification';
  noticeData.id = `userNotic${(Math.random() * 100000).toFixed().toString()}`
  
  api.addSpecificData('notifications', noticeData);
  loading.notificationContainer.children[0].insertAdjacentHTML('afterend', text.dom.notificationDOM(noticeData))
  unreadedNotificationsDot();
}

// exit opened windows from outside
window.addEventListener('click', (click) => {
  if (!click.target.closest('.CurrentOpenedNotification')
    && !(click.target.closest('#openedTask'))
    && !(click.target.closest('.task'))
    && !(click.target.closest('.notificationsIcon span'))
    && !(click.target.closest('#notificationBanner'))) {
    home.tempOpenedTaskPosition ? home.closeTask() : null;
    closeNotification();
    notificationBannerLeft < 0 ? document.querySelector('#notificationBanner').style.left = '-100dvw' : null;
  };
})


// tasks
home.tasksTotalPercentage();

// images

// create images url

export function makeSuitableImages(insertedImg) {
  return new Promise((resolve, reject) => {
    const tempImg = new Image();
    tempImg.src = URL.createObjectURL(insertedImg);

    tempImg.onload = ()=>{
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 150;
      canvas.height = 150;

      ctx.drawImage(tempImg, 0, 0, 150, 150);

      const compressedImage = canvas.toDataURL('image/jpeg',0.7);
      URL.revokeObjectURL(tempImg.src);
      resolve(compressedImage);      
    }
    tempImg.onerror = (err)=>{
      reject(err);
    }
  })
}

