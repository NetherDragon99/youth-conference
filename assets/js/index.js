import { getData, newData } from "./api.js";
import { putData, autoRefresh, scrollFunction, autoScroll, activitySession } from "./home-page-functions.js";

scrollFunction();

async function todaysActivity() {
  await getData('conferenceActivitys');
  await putData(newData);
  autoRefresh(newData)
  activitySession();
}

addEventListener('hashchange', () => {
  localStorage.setItem('historyPage', location.hash);
})
window.addEventListener('DOMContentLoaded', () => {
  todaysActivity();
  location.hash = '';
  location.hash = localStorage.getItem('historyPage');
})

const profileForm = document.getElementById("profileForm");
const genderDropMenu = document.getElementById('profileGender');

genderDropMenu.addEventListener('change', () => {
  const otherGenderP = document.querySelector('#profileGender + p');

  if (genderDropMenu.value == 'o') {
    otherGenderP.classList.add('genderOther');
    document.querySelectorAll('.profileContainer input').forEach((v) => {
      v.setAttribute('disabled', 'true');
    })
  } else {
    otherGenderP.classList.remove('genderOther');
    document.querySelectorAll('.profileContainer input').forEach((v) => {
      v.removeAttribute('disabled', 'true');
    })
  }

  const profileIcon = document.querySelector('profile-page .profilePicture .profile');
  if (genderDropMenu.value == 'm'){
    profileIcon.classList.remove('icon-user' , 'icon-user2');
    profileIcon.classList.add('icon-user1')
  }else if (genderDropMenu.value == 'f') {
    profileIcon.classList.remove('icon-user' , 'icon-user1');
    profileIcon.classList.add('icon-user2')
  }else{
    profileIcon.classList.remove('icon-user1' , 'icon-user2');
    profileIcon.classList.add('icon-user')
  }
})


profileForm.addEventListener('submit', (f) => {
  f.preventDefault();
  const formData = Object.fromEntries(new FormData(profileForm))

})
