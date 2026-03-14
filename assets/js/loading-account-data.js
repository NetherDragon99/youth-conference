import { dom, text } from "./text.js";
import { createAD, notificationsFunction, unreadedNotificationsDot } from "./index.js";
import { getAccountData, emailData } from './api.js';
import { updateProfileSubmitBtn, logOut } from "./profile-page-functions.js";

let getProfileGender;
const checkingGenderLocalStorage = () => {
  if (localStorage.getItem('profile')) {
    (JSON.parse(localStorage.getItem('profile')).gender) ? getProfileGender = JSON.parse(localStorage.getItem('profile')).gender : localStorage.removeItem('profile');
    // console.log('pass');
  } else {
    localStorage.removeItem('profile');
  }
}

const getProfilePicIcon = document.querySelector('header .profilePicture span');
export const ProfilePicIcon = document.querySelector('.publicProfile .profilePicture span');
//profile data
export let allUserData;
const cocs = document.getElementById('cocsNO') 

export async function getProfileData() {
  if (localStorage.getItem('profile') && localStorage.getItem('profile') != '{}'){
    await getAccountData('accounts', (JSON.parse(localStorage.getItem('profile')).email));
    allUserData = emailData;
    allUserData.length != 0 ? putData() : localStorage.removeItem('profile');
  }else{
    localStorage.removeItem('profile');
    notificationContainer.innerHTML = dom.sinInNotifications;
  }
};


// notifications
export const notificationContainer = document.querySelector('#notificationBanner')
let HTMLnotifications = `<h3>Notifications</h3>`;
export async function getProfileNotifications() {  
  
  if (!(localStorage.getItem('profile')) || !(JSON.parse(localStorage.getItem('profile')).email)) {
    return notificationContainer.innerHTML = dom.sinInNotifications;
  }

  try {
    if (localStorage.getItem('profile')) {
      await getAccountData('notifications', JSON.parse(localStorage.getItem('profile')).email);      
      let userNotifications = emailData;

      await getAccountData('notifications', 'general');
      
      if (userNotifications.length != 0 && emailData.length != 0) {
        userNotifications = [...emailData, ...userNotifications];
      }      

      let notification = userNotifications.toSorted((a, b) => new Date(b.time) - new Date(a.time))
      if (notification.length == 0) {
        return notificationContainer.innerHTML = dom.noNotifications;
      }


      notificationContainer ? notification.forEach((v) => [
        HTMLnotifications += dom.notificationDOM(v)
      ]) : null;
      notificationContainer.innerHTML = HTMLnotifications;
      unreadedNotificationsDot();
    }
    notificationsFunction();
  } catch (err) {
    console.log(err);
    notificationContainer.innerHTML = dom.notificationLoadingError;
  }
};
export let updateProfileBt, genderDropMenu, logOutBtn;


// put the data
export async function putData() {
  document.getElementById('profileForm').innerHTML = dom.updateDataForm
  document.getElementById('profileUserName').value = allUserData[0].userName;
  document.getElementById('profileGmail').value = allUserData[0].email;
  document.getElementById('profilePassoword').value;
  updateProfileBt = document.getElementById('updateProfileSubmitButton');
  logOutBtn = document.getElementById('logOutBtn');
  genderDropMenu = document.getElementById('profileGender');

  changeGenderIcon();
  updateProfileSubmitBtn();
  logOut();
  genderDropMenu.addEventListener('change', () => {
    changeGenderIconUpdateData();
  })

  document.querySelector('.publicProfile .userName h2').innerHTML = allUserData[0].userName;
  changeGenderIconUpdateData();
  updateProfileBt.removeAttribute('disabled');
  logOutBtn.removeAttribute('disabled');
  getProfileNotifications();

  cocs.innerHTML = allUserData[0].cocs;
}

getProfileData();


const changeGenderIcon = () => {
  checkingGenderLocalStorage();
  if (getProfileGender) {
    if (getProfileGender == 'm') {
      getProfilePicIcon.setAttribute('class', 'icon-user1');
      genderDropMenu.value = 'm';
      // console.log(genderDropMenu.value);
    } else if (getProfileGender == 'f') {
      getProfilePicIcon.setAttribute('class', 'icon-user2');
      genderDropMenu.value = 'f';
      // console.log(genderDropMenu.value);
    }
  }
}
export const changeGenderIconUpdateData = () => {
  let currentGender = genderDropMenu.value;
  if (currentGender == 'm') {
    ProfilePicIcon.classList.remove('icon-user2', 'icon-user');
    ProfilePicIcon.classList.add('icon-user1');
    genderDropMenu.value = 'm';
    // console.log(genderDropMenu.value);
  } else if (currentGender == 'f') {
    ProfilePicIcon.classList.remove('icon-user1', 'icon-user');
    ProfilePicIcon.classList.add('icon-user2');
    genderDropMenu.value = 'f';
    // console.log(genderDropMenu.value);
  } else {
    ProfilePicIcon.classList.remove('icon-user1', 'icon-user2');
    ProfilePicIcon.classList.add('icon-user')
  }
}
