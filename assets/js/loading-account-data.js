import { genderIcon, profileIcon, getAccountData, emailData, postAccountData } from "./profile-page-functions.js";
import { text, dom } from "./text.js";
import { createAD } from "./index.js";

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
    console.log(allUserData);
    putData();
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
    await createAD(text.accountCreated, 'green');
    setTimeout(() => {
      location.reload();
    }, 5000);

  } catch (err) {
    console.log(err);
    createAD(text.accountCreatingFailed)
  }
}
