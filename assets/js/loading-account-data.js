import { getAccountData, emailData, postAccountData } from "./profile-page-functions.js";
import { text, dom } from "./text.js";
import { createAD, notificationsFunction, unreadedNotificationsDot } from "./index.js";
import { timeText } from './timing.js'

let getProfileGender;
if (localStorage.getItem('profile')) {
  getProfileGender = JSON.parse(localStorage.getItem('profile')).gender;
  // console.log('pass');
}

const getProfilePicIcon = document.querySelector('header .profilePicture span');
const ProfilePicIcon = document.querySelector('.publicProfile .profilePicture span');
//profile data
let allUserData

async function getProfileData() {
  if (localStorage.getItem('profile')) {
    await getAccountData('accounts', (JSON.parse(localStorage.getItem('profile')).email));
    allUserData = emailData;
    // console.log(allUserData);
    putData();
  }
};


const notificationContainer = document.querySelector('#notificationBanner')
let HTMLnotifications = `<h3>Notifications</h3>`;
async function getProfileNotifications() {
  try {
    if (localStorage.getItem('profile')) {
      await getAccountData('notifications', (JSON.parse(localStorage.getItem('profile')).email));
      const userNotifications = emailData;

      await getAccountData('notifications', 'general');
      const generalNotifications = [...emailData, ...userNotifications];

      let notification = generalNotifications.toSorted((a, b) => new Date(a.time) - new Date(b.time))

      notificationContainer ? notification.forEach((v) => [
        HTMLnotifications += `
        <div class="notification ${v.state}">
          <div class="notificationHeader">
            <div class="notificationIcon ${v.icon}"></div>
            <div class="notificationData">
              <h4 class="notificationTitle">${v.title}</h4>
              <h5 class="notificationDescription">${v.description}</h5>
            </div>
          </div>
          <div class="notificationDetails">
            <p>${v.details}</p>
            <div class="notificationTime">${timeText(v.time)}</div>
            <button class="notificationExit icon-exit"><div>Close</div></button>
          </div>
        </div>
        `
      ]) : null;
      notificationContainer.innerHTML = HTMLnotifications;
      unreadedNotificationsDot();
    }
    notificationsFunction();
    not
  } catch (err) {
    console.log(err);
    notificationContainer.innerHTML = `<h3>Notifications</h3>
        <div class="noNotificationsMs">You don't have any notifications for now</div>`
  }
};
getProfileData();
export let updateProfileBt, genderDropMenu;

async function putData() {
  document.querySelector('.publicProfile .userName h2').innerHTML = allUserData.userName;

  document.getElementById('profileForm').innerHTML = dom.updateDataForm
  document.getElementById('profileUserName').value = allUserData.userName;
  document.getElementById('profileGmail').value = allUserData.email;
  document.getElementById('profileGmail').setAttribute('disabled', true);
  document.getElementById('profilePassoword').value;
  updateProfileBt = document.getElementById('updateProfileSubmitButton');
  genderDropMenu = document.getElementById('profileGender');
  changeGenderIcon();
  updateProfileSubmitBtn();
  genderDropMenu.addEventListener('change', () => {
    changeGenderIconUpdateData();
  })
  getProfileNotifications();
}


const changeGenderIcon = () => {
  if (getProfileGender) {
    if (getProfileGender == 'm') {
      getProfilePicIcon.setAttribute('class', 'icon-user1');
      genderDropMenu.value = 'm';
      // console.log(genderDropMenu.value);
    } else if (getProfileGender == 'f') {
      getProfilePicIcon.setAttribute('class', 'icon-user2');
      genderDropMenu.value = 'f';
      console.log(genderDropMenu.value);
    }
  }
}
const changeGenderIconUpdateData = () => {
  console.log('updated');

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
    console.log(genderDropMenu.value);
  } else {
    ProfilePicIcon.classList.remove('icon-user1', 'icon-user2');
    ProfilePicIcon.classList.add('icon-user')
  }
}


const updateProfileSubmitBtn = () => {
  updateProfileBt.addEventListener('click', async (bt) => {
    bt.preventDefault();
    console.log(genderDropMenu.value);
    changeGenderIconUpdateData();

    if (genderDropMenu.value == 'p') {
      createAD(text.preferNotToSayGender)
      return
    } else if (genderDropMenu.value == 'o') {
      createAD(text.otherGender)
      return
    } else if (document.getElementById('profileUserName').value == '') {
      createAD(text.noName)
      return
    } else if (document.getElementById('profilePassoword').value == '') {
      createAD(text.noPasswordUpdate)
      return
    }

    if (allUserData.password != document.getElementById('profilePassoword').value) {
      return createAD(text.wrongPassword);
    }
    updateProfile();

  })
}

async function updateProfile() {
  updateProfileBt.setAttribute('value', 'updating your data . . .');
  const formData = Object.fromEntries(new FormData(profileForm));
  console.log(formData);

  const toAPIData = {
    page: 'accounts',
    action: 'update',
    email: allUserData.email,
    data: formData
  };
  const toLocalStorage = {
    email: emailData.email,
    password: emailData.password,
    gender: emailData.gender
  }

  try {
    //console.log('passed');

    await postAccountData(toAPIData);
    localStorage.setItem('profile', JSON.stringify(toLocalStorage));
    await createAD(text.accountUpdated, 'green');
    setTimeout(() => {
      location.reload();
    }, 5000);

  } catch (err) {
    console.log(err);
    createAD(text.accountCreatingFailed)
  }
}
