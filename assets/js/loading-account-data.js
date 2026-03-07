import { genderDropMenu, genderIcon, profileIcon } from "./profile-page-functions.js";

let getProfileGender;
if (localStorage.getItem('gender')) {
  getProfileGender = JSON.parse(localStorage.getItem('profile')).gender;
}

const getProfilePicIcon = document.querySelector('header .profilePicture span');


if (getProfileGender) {
  if (getProfileGender == 'm') {
    getProfilePicIcon.setAttribute('class', 'icon-user1');
    genderDropMenu.value = 'm';
    console.log(genderDropMenu.value);
    genderIcon();
  } else if (getProfileGender == 'f') {
    getProfilePicIcon.setAttribute('class', 'icon-user2');
    genderDropMenu.value = 'f';
    console.log(genderDropMenu.value);
    genderIcon();
  }
} else {
  profileIcon.classList.remove('icon-user1', 'icon-user2');
  profileIcon.classList.add('icon-user')
}
