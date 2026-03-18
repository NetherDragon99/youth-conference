import * as text from '../text.js'
import * as dashboard from './dashboard.js'
import * as api from './dashboard-api.js'
import * as dashboardLoading from './dashboard-loading-data.js'


const profileForm = document.getElementById("profileForm");
let genderDropMenu = document.getElementById('profileGender');
const submitBt = document.getElementById('profileSubmit');


// login
submitBt.addEventListener('click', async (click) => {
  click.preventDefault();

  let formData = Object.fromEntries(new FormData(profileForm));


  if (formData.email === '') {
    return dashboard.createAD(text.text.noEmail)
  } else if (formData.password === '') {
    return dashboard.createAD(text.text.noPassword)
  }

  submitBt.value = 'working . . .';
  submitBt.setAttribute('disabled', 'true');
  console.log('button');


  const emailData = await api.getWith2Data('accounts', 'email', formData.email, 'state', 'admin');

  if (emailData.length == 0) {
    submitBt.value = 'Log-In';
    submitBt.removeAttribute('disabled');
    return dashboard.createAD(text.text.notAdmin)
  }
  if (emailData[0].password != formData.password) {
    submitBt.value = 'Log-In';
    submitBt.removeAttribute('disabled');
    return dashboard.createAD(text.text.wrongPassword)
  }


  localStorage.setItem('adminProfile', JSON.stringify({
    userName: emailData[0].userName,
    email: emailData[0].email,
    password: emailData[0].password,
    gender: emailData[0].gender,
    profilePicture: emailData[0].profilePicture
  }));

  profileForm.innerHTML = text.dom.updateDataForm;
  dashboardLoading.updateDashboardHeader();
  dashboardLoading.updateDataForm();

  dashboard.createAD(text.text.loginSucces, 'green')
})

export function updateDataFormBtn() {
  const updateProfileSubmitButton = document.getElementById('updateProfileSubmitButton');
  updateProfileSubmitButton.addEventListener('click', async (click) => {
    click.preventDefault();
    genderDropMenu = document.getElementById('profileGender');

    if (genderDropMenu.value == 'p') {
      dashboard.createAD(text.text.preferNotToSayGender)
      return
    } else if (genderDropMenu.value == 'o') {
      dashboard.createAD(text.text.otherGender)
      return
    } else if (document.getElementById('profileUserName').value == '') {
      dashboard.createAD(text.text.noName)
      return
    } else if (document.getElementById('profilePassoword').value == '') {
      dashboard.createAD(text.text.noPasswordUpdate)
      return
    }

    const formData = Object.fromEntries(new FormData(profileForm));

    if (JSON.parse(localStorage.getItem('adminProfile')).password != formData.password) {
      return dashboard.createAD(text.text.wrongPassword)
    }

    updateProfileSubmitButton.value = 'updating your data . . .';
    updateProfileSubmitButton.setAttribute('disabled', 'true');

    await api.updateSpecificData('accounts', 'email', formData.email, formData)

    localStorage.setItem('adminProfile', JSON.stringify({
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      gender: formData.gender,
      profilePicture: formData.profilePicture
    }));
    dashboard.createAD(text.text.accountUpdated, 'green');

    profileForm.innerHTML = text.dom.updateDataForm;
    dashboardLoading.updateDashboardHeader();
    dashboardLoading.updateDataForm();
  })
}