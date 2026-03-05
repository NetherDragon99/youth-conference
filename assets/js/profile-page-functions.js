import { createAD } from "./index.js";
import { text } from "./text.js";
import { fetchData, apiURL } from "./api.js";

export const profileForm = document.getElementById("profileForm");
export const genderDropMenu = document.getElementById('profileGender');
export const submitBt = document.getElementById('profileSubmit');


// gender drop menu
genderDropMenu.addEventListener('change', () => {
  const profileIcon = document.querySelector('profile-page .profilePicture .profile');
  if (genderDropMenu.value == 'm') {
    profileIcon.classList.remove('icon-user', 'icon-user2');
    profileIcon.classList.add('icon-user1')
  } else if (genderDropMenu.value == 'f') {
    profileIcon.classList.remove('icon-user', 'icon-user1');
    profileIcon.classList.add('icon-user2')
  } else {
    profileIcon.classList.remove('icon-user1', 'icon-user2');
    profileIcon.classList.add('icon-user')
  }
})


profileForm.addEventListener('submit', async (f) => {
  f.preventDefault();

  const formData = Object.fromEntries(new FormData(profileForm))
  console.log(formData.email);

  if (formData.gender == 'p') {
    createAD(text.preferNotToSayGender)
    return
  } else if (formData.gender == 'o') {
    createAD(text.otherGender)
    return
  }

  submitBt.setAttribute('value', 'working . . .')
  const getEmailData = await getAccountData('accounts', formData.email);

  if (getEmailData.error) {
    createAD('email not found')
  }else if (getEmailData) {
    createAD(getEmailData.email)
  }else{
    createAD('none of the above')
  }
  
  

})


const getAccountData = async (page, target) => {
  try {
    const res = await fetch(`${apiURL}?page=${page}&email=${target}`);
    const rawdata = await res.json();
    //console.log(rawdata);
    return rawdata;
  } catch (err) {
    console.error("erro on getting data:");
  }
}
