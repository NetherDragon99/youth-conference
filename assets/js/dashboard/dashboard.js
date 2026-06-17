// ad banner
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

const footerDashboardNavIcons = document.querySelectorAll('body footer a');

addEventListener('hashchange', () => {
  const currentPage = location.hash;

  localStorage.setItem('historyDashboardPage', currentPage);

  footerDashboardNavIcons.forEach((v) => {
    v.querySelector(`span`).classList.remove('activePage');

    if (`${v.getAttribute('href')}` == `${currentPage}`) {
      v.setAttribute('class', 'active');
      v.querySelector(`span`).classList.add('activePage');
    }
  })
})

location.hash = '';
location.hash = localStorage.getItem('historyDashboardPage');

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
  location.hash = '';
  location.hash = localStorage.getItem('historyPage');
})

//checking account on page load

let profileData = localStorage.getItem('adminProfile');

if (profileData && profileData !== '') {
  profileData = JSON.parse(profileData)

  if (profileData.email && profileData.email !== '') {
    profileForm.innerHTML = text.dom.updateDataForm;
    dashboardLoading.updateDashboardHeader();
    dashboardLoading.updateDataForm();

    createAD(text.text.loginSucces, 'green')
  }
} else {
  document.getElementById('usersPage').remove();
  document.getElementById('dashboard-transaction-page').remove();
  document.getElementById('dashboard-tasks-page').remove();
  document.querySelector('footer').innerHTML = '<a href="#dashboard-profile-page" class="active"><span class="icon-user"></span></a>';
  let alertMesg = confirm('انت مش ادمن تحب ترجع لصفحة الاعضاء؟')
  window.location.href = alertMesg ? (window.location.origin + '/index.html') : window.location.href;
}


import * as dashboardProfile from "./dashboard-profile-page.js";
import * as dashboardLoading from "./dashboard-loading-data.js";
import * as usersPage from './dashboard-users-page.js';
import * as text from '../text.js';