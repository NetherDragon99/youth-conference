import { createAD, createNotification } from "./index.js";
import { text } from "./text.js";
import { getAccountData, postAccountData, updateSpecificData } from "./api.js";
import { getProfileData, updateProfileBt, logOutBtn, allUserData,ProfilePicIcon } from "./loading-account-data.js";

export const profileForm = document.getElementById("profileForm");
export const genderDropMenu = document.getElementById('profileGender');
export const submitBt = document.getElementById('profileSubmit');
const signUpBut = document.getElementById('profileSignupSubmit');




// gender drop menu
export const profileIcon = document.querySelector('profile-page .profilePicture .profile');
genderDropMenu.addEventListener('change', () => {
  genderIcon();
})

export const genderIcon = () => {
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
}

// scrool to fill personal data
const profileScroll = () => {
  const toProfileData = document.querySelector(".mainProfileData");
  if (toProfileData) {
    toProfileData.scrollIntoView({
      inline: "center",
      behavior: "smooth"
    });
  }
}


//sign in and log in
submitBt.addEventListener('click', async (x) => {
  x.preventDefault();
  let toLocalStorage = {};

  // checking for empty email or password
  if (document.getElementById('profileGmail').value == '') {
    createAD(text.noEmail)
    return
  } else if (document.getElementById('profilePassoword').value == '') {
    createAD(text.noPassword)
    return
  }

  let formData = Object.fromEntries(new FormData(profileForm));
  // console.log(formData);

  submitBt.setAttribute('value', 'working . . .')
  submitBt.setAttribute('disabled', 'true');
  const getEmailData = await getAccountData('accounts', formData.email);
  console.log(getEmailData);


  try {
    // creating a new account
    if (getEmailData.length == 0) {
      createAD(text.newAccount, 'green')

      profileScroll();
      ProfilePicIcon.classList.remove('icon-user');
      ProfilePicIcon.classList.add('icon-user1');
      genderDropMenu.value = 'm';

      signUpBut.addEventListener('click', async (y) => {
        y.preventDefault();

        if (genderDropMenu.value == 'p') {
          createAD(text.preferNotToSayGender)
          return
        } else if (genderDropMenu.value == 'o') {
          createAD(text.otherGender)
          return
        }

        if (document.getElementById('profileUserName').value == '') {
          return createAD(text.noName)
        };

        signUpBut.setAttribute('value', 'Creating your account . . .');
        signUpBut.setAttribute('disabled', 'true');
        formData = Object.fromEntries(new FormData(profileForm));
        // console.log(formData);

        const toAPIData = {
          page: 'accounts',
          action: 'add',
          data: formData
        };
        toLocalStorage = {
          email: formData.email,
          password: formData.password,
          gender: formData.gender
        }

        try {
          await postAccountData(toAPIData);
          localStorage.setItem('profile', JSON.stringify(toLocalStorage));
          createAD(text.accountCreated, 'green');
          await addWelcomGift();
          document.querySelector('.noNotificationsMs').remove();
          getProfileData();

        } catch (err) {
          console.log(err);
          createAD(text.accountCreatingFailed)
        }
      })

      // logging in
    } else if (getEmailData) {

      try {
        const tempAccount = await getAccountData('accounts', formData.email);
        // console.log(tempAccount);

        const tempPass = tempAccount[0].password;

        // console.log(formData.password, tempPass);
        if (formData.password == tempPass) {
          toLocalStorage = {
            email: tempAccount[0].email,
            password: tempAccount[0].password,
            gender: tempAccount[0].gender
          }
          localStorage.setItem('profile', JSON.stringify(toLocalStorage))
          createAD(text.loginSucces, 'green')
          getProfileData();

        } else {
          createAD(text.wrongPassword);
          submitBt.setAttribute('value', 'Sign-In/Log-In')
          signUpBut.removeAttribute('disabled');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      throw new Error("unexpected error");

    }
  } catch (error) {
    console.log(error);
    submitBt.setAttribute('value', 'Sign-In/Log-In');
  }

})


// updating data
export const updateProfileSubmitBtn = () => {
  updateProfileBt.addEventListener('click', async (bt) => {
    bt.preventDefault();
    console.log('updating');


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

    if (allUserData[0].password != document.getElementById('profilePassoword').value) {
      return createAD(text.wrongPassword);
    }
    updateProfile();

  })
}
async function updateProfile() {
  updateProfileBt.setAttribute('value', 'updating your data . . .');
  updateProfileBt.setAttribute('disabled', 'true');
  logOutBtn.setAttribute('disabled', 'true');
  const formData = Object.fromEntries(new FormData(profileForm));

  const toAPIData = {
    page: 'accounts',
    action: 'update',
    email: formData.email,
    data: formData
  };
  const toLocalStorage = {
    email: formData.email,
    password: formData.password,
    gender: formData.gender
  }

  try {
    //console.log('passed');

    await postAccountData(toAPIData);
    localStorage.setItem('profile', JSON.stringify(toLocalStorage));
    createAD(text.accountUpdated, 'green');
    getProfileData();

  } catch (err) {
    console.log(err);
    createAD(text.accountCreatingFailed)
  }
}

// log out
export function logOut() {
  logOutBtn.addEventListener('click', () => {
    logOutBtn.setAttribute('disabled', 'true');
    logOutBtn.innerHTML = 'Logging out . . .';
    localStorage.removeItem('profile');
    location.reload();
  })
}

// welcome gift
async function addWelcomGift() {
  await updateSpecificData('accounts', 'email', JSON.parse(localStorage.getItem('profile')).email, { points: 10 });
  createNotification('welcomeGift');
}