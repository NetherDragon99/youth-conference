import * as text from "./text.js";
import * as index from "./index.js";
import * as api from './api.js';
import * as profile from "./profile-page-functions.js";

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

export async function getProfileData() {
  if (localStorage.getItem('profile') && localStorage.getItem('profile') != '{}'){
    const fetchedData = await api.getAccountData('accounts', (JSON.parse(localStorage.getItem('profile')).email));
    allUserData = fetchedData;
    
    allUserData.length != 0 ? putData() : localStorage.removeItem('profile');
  }else{
    localStorage.removeItem('profile');
    notificationContainer.innerHTML = text.dom.sinInNotifications;
    profile.formPicture();
  }
};


// notifications
export const notificationContainer = document.querySelector('#notificationBanner')
let HTMLnotifications = `<h3>Notifications</h3>`;
export async function getProfileNotifications() {  
  
  if (!(localStorage.getItem('profile')) || !(JSON.parse(localStorage.getItem('profile')).email)) {
    return notificationContainer.innerHTML = text.dom.sinInNotifications;
  }

  try {
    if (localStorage.getItem('profile')) {
      await api.getAccountData('notifications', JSON.parse(localStorage.getItem('profile')).email);      
      let userNotifications = api.emailData;

      await api.getAccountData('notifications', 'general');
      
      if (userNotifications.length != 0 && api.emailData.length != 0) {
        userNotifications = [...api.emailData, ...userNotifications];
      }      

      let notification = userNotifications.toSorted((a, b) => new Date(b.time) - new Date(a.time))
      if (notification.length == 0) {
        return notificationContainer.innerHTML = text.dom.noNotifications;
      }


      notificationContainer ? notification.forEach((v) => [
        HTMLnotifications += text.dom.notificationDOM(v)
      ]) : null;
      notificationContainer.innerHTML = HTMLnotifications;
      index.unreadedNotificationsDot();
    }
    index.notificationsFunction();
  } catch (err) {
    console.log(err);
    notificationContainer.innerHTML = text.dom.notificationLoadingError;
  }
};
export let updateProfileBt, genderDropMenu, logOutBtn;
const userRank = document.getElementById('rank');
const cocs = document.getElementById('cocsNO');

// put the data
export async function putData() {
  document.getElementById('profileForm').innerHTML = text.dom.updateDataForm;
  profile.formPicture();
  if (allUserData[0].profilePicture != '') {
    document.querySelector('.publicProfile .profilePicture img').src = allUserData[0].profilePicture;
    document.querySelector('.publicProfile .profilePicture img').style.display = 'block';
    document.querySelector('header .profilePicture img').src = allUserData[0].profilePicture;
    document.querySelector('header .profilePicture img').style.display = 'block';
  }else{
    document.querySelector('header .profilePicture img').style.display = 'none';

  }

  document.getElementById('profileUserName').value = allUserData[0].userName;
  document.getElementById('profileGmail').value = allUserData[0].email;
  document.getElementById('profilePassoword').value;
  updateProfileBt = document.getElementById('updateProfileSubmitButton');
  logOutBtn = document.getElementById('logOutBtn');
  genderDropMenu = document.getElementById('profileGender');

  changeGenderIcon();
  profile.updateProfileSubmitBtn();
  profile.logOut();
  genderDropMenu.addEventListener('change', () => {
    changeGenderIconUpdateData();
  })

  document.querySelector('.publicProfile .userName h2').innerHTML = allUserData[0].userName;
  changeGenderIconUpdateData();
  updateProfileBt.removeAttribute('disabled');
  logOutBtn.removeAttribute('disabled');
  getProfileNotifications();

  cocs.innerHTML = allUserData[0].cocs;
  userRank.innerHTML = `#${allUserData[0].rank}`;
}

window.addEventListener('DOMContentLoaded',()=> getProfileData())


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
