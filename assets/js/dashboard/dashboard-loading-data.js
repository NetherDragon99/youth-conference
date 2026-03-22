import * as text from '../text.js';
import * as dashboard from './dashboard.js'
import * as dashboardProfile from './dashboard-profile-page.js'
import * as api from './dashboard-api.js'
import * as transactionPage from './dashboard-transaction-page.js';

const dashboardProfilePagePic = document.querySelector('.publicProfile .profilePicture img')
let localStore;
window.addEventListener('DOMContentLoaded', () => {

  if (localStorage.getItem('adminProfile') && localStorage.getItem('adminProfile') != "{}") {
    
    updateDashboardHeader();
    document.getElementById("profileForm").innerHTML = text.dom.updateDataForm;
    updateDataForm();
    dataUpdatedChecker();
  } else {
    localStorage.removeItem('adminProfile');
  }

  transactionPage.transactionPage();
})

const headerDashboardUserName = document.getElementById('dashboardUserName');
const headerDashboardPic = document.querySelector('#dashboardProfilePic img');
const headerDashboardIcon = document.querySelector('#dashboardProfilePic span');
const dashboardProfilePageIcon = document.querySelector('.publicProfile .profilePicture .profile')

export function updateDashboardHeader() {
  localStore = JSON.parse(localStorage.getItem('adminProfile'));
  if (!localStore) { return }

  headerDashboardUserName.innerHTML = localStore.userName;

  if (localStore.gender == 'f') {
    headerDashboardIcon.setAttribute('class', 'icon-user2');
  } else {
    headerDashboardIcon.setAttribute('class', 'icon-user1');
  }
  if (localStore.profilePicture == '') {
    headerDashboardPic.style.display = 'none';
  } else if(localStore.profilePicture) {
    headerDashboardPic.src = localStore.profilePicture;
    headerDashboardPic.style.display = 'block';
  }
}
export function updateDataForm() {
  localStore = JSON.parse(localStorage.getItem('adminProfile'));
  if (!localStore) { return }

  document.getElementById('profileUserName').value = localStore.userName;
  document.getElementById('profileGmail').value = localStore.email;
  document.getElementById('profileGender').value = localStore.gender;
  document.getElementById('profilePictureUrl').value = localStore.profilePicture;

  document.querySelector('.publicProfile .userName h2').innerHTML = localStore.userName;

  if (localStore.gender == 'f') {
    headerDashboardIcon.setAttribute('class', 'icon-user2');
  } else {
    headerDashboardIcon.setAttribute('class', 'icon-user1');
  }
  if (localStore.profilePicture == '') {
    dashboardProfilePagePic.style.display = 'none';
  } else if (localStore.profilePicture) {
    dashboardProfilePagePic.src = localStore.profilePicture;
    dashboardProfilePagePic.style.display = 'block';
  }

  const genderDropMenu = document.getElementById('profileGender');
  genderDropMenu.value == 'm' ? dashboardProfilePageIcon.setAttribute('class', 'icon-user1 profile') : genderDropMenu.value == 'f' ? dashboardProfilePageIcon.setAttribute('class', 'icon-user2 profile') : dashboardProfilePageIcon.setAttribute('class', 'icon-user profile');

  formPicture();
  logOut();
  dashboardProfile.updateDataFormBtn();
  changeGenderProfilePage();
}

function changeGenderProfilePage() {
  const genderDropMenu = document.getElementById('profileGender');
  genderDropMenu.addEventListener('change', () => {
    if (genderDropMenu.value == 'm') {
      dashboardProfilePageIcon.setAttribute('class', 'icon-user1 profile');

    } else if (genderDropMenu.value == 'f') {
      dashboardProfilePageIcon.setAttribute('class', 'icon-user2 profile');

    } else {
      dashboardProfilePageIcon.setAttribute('class', 'icon-user profile')

    }
  })
}
export function logOut() {
  const logOutBtn = document.getElementById('logOutBtn');
  logOutBtn.addEventListener('click', () => {
    logOutBtn.setAttribute('disabled', 'true');
    logOutBtn.innerHTML = 'Logging out . . .';
    localStorage.removeItem('adminProfile');
    location.reload();
  })
}
export function formPicture() {
  const profilePicInput = document.getElementById('profilePicture');
  const accountProfilePicture = document.querySelector('.publicProfile .profilePicture img');
  const profilePictureUrl = document.getElementById('profilePictureUrl');

  removeImageF();

  profilePicInput.addEventListener('change', async (inputfile) => {
    const inputImage = inputfile.target.files[0];
    if (inputImage) {

      let imageUrl = await makeSuitableImages(inputImage)
      accountProfilePicture.src = imageUrl;
      profilePictureUrl.value = imageUrl;
      accountProfilePicture.style.display = 'block';
    }
  })
}
function removeImageF() {
  const removeImage = document.getElementById('removeImage');
  removeImage.onclick = () => {
    document.querySelector('.publicProfile .profilePicture img').style.display = 'none';
    document.getElementById('profilePictureUrl').value = '';
    dashboard.createAD(text.text.noImage);
  }
}
function makeSuitableImages(insertedImg) {
  return new Promise((resolve, reject) => {
    const tempImg = new Image();
    tempImg.src = URL.createObjectURL(insertedImg);

    tempImg.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = 150;
      canvas.height = 150;

      ctx.drawImage(tempImg, 0, 0, 150, 150);

      const compressedImage = canvas.toDataURL('image/jpeg', 0.7);
      URL.revokeObjectURL(tempImg.src);
      resolve(compressedImage);
    }
    tempImg.onerror = (err) => {
      reject(err);
    }
  })
}
async function dataUpdatedChecker() {
  const localStore = JSON.parse(localStorage.getItem('adminProfile'));
  const emailData = await api.getWith2Data('accounts', 'email', localStore.email, 'state', 'admin');

  if (emailData.length != 0) {
    if (emailData[0].password != localStore.password) {
      return toLocalStorage();
    } else if (emailData[0].userName != localStore.userName) {
      return toLocalStorage();
    } else if (emailData[0].gender != localStore.gender) {
      return toLocalStorage();
    } else if (emailData[0].profilePicture != localStore.profilePicture) {
      return toLocalStorage();
    }
  }
  function toLocalStorage () {
    localStorage.setItem('adminProfile', JSON.stringify({
      userName: emailData[0].userName,
      email: emailData[0].email,
      password: emailData[0].password,
      gender: emailData[0].gender,
      profilePicture: emailData[0].profilePicture
    }));
    updateDashboardHeader();
    updateDataForm();
  }
}
