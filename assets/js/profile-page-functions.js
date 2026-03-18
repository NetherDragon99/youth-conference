import * as index from "./index.js";
import * as text from "./text.js";
import * as api from "./api.js";
import * as loading from "./loading-account-data.js";

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
    index.createAD(text.text.noEmail)
    return
  } else if (document.getElementById('profilePassoword').value == '') {
    index.createAD(text.text.noPassword)
    return
  }

  let formData = Object.fromEntries(new FormData(profileForm));
  // console.log(formData);

  submitBt.setAttribute('value', 'working . . .')
  submitBt.setAttribute('disabled', 'true');
  const getEmailData = await api.getAccountData('accounts', formData.email);
  // console.log(getEmailData);


  try {
    // creating a new account
    if (getEmailData.length == 0) {
      index.createAD(text.text.newAccount, 'green')

      profileScroll();
      loading.ProfilePicIcon.classList.remove('icon-user');
      loading.ProfilePicIcon.classList.add('icon-user1');
      genderDropMenu.value = 'm';

      signUpBut.addEventListener('click', async (y) => {
        y.preventDefault();

        if (genderDropMenu.value == 'p') {
          index.createAD(text.text.preferNotToSayGender)
          return
        } else if (genderDropMenu.value == 'o') {
          index.createAD(text.text.otherGender)
          return
        }

        if (document.getElementById('profileUserName').value == '') {
          return index.createAD(text.text.noName)
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
          await api.postAccountData(toAPIData);
          localStorage.setItem('profile', JSON.stringify(toLocalStorage));
          index.createAD(text.text.accountCreated, 'green');
          await addWelcomGift();
          document.querySelector('.noNotificationsMs').remove();
          loading.getProfileData();

        } catch (err) {
          console.log(err);
          index.createAD(text.text.accountCreatingFailed)
        }
      })

      // logging in
    } else if (getEmailData) {

      try {
        const tempAccount = await api.getAccountData('accounts', formData.email);
        // console.log(tempAccount);


        const tempPass = tempAccount[0].password;

        // console.log(formData.password, tempPass);
        if (formData.password == tempPass) {
          if (tempAccount[0].state == 'admin') {
            index.createAD(text.text.toAdminPage, 'green');
            localStorage.setItem('adminProfile', JSON.stringify({email: tempAccount[0].email, password: tempAccount[0].password}))
            return setTimeout(()=>{
              window.location.href = '../dashboard.html';
            },6000)
          }
          toLocalStorage = {
            email: tempAccount[0].email,
            password: tempAccount[0].password,
            gender: tempAccount[0].gender
          }
          localStorage.setItem('profile', JSON.stringify(toLocalStorage))
          index.createAD(text.text.loginSucces, 'green')
          loading.getProfileData();

        } else {
          index.createAD(text.text.wrongPassword);
          submitBt.setAttribute('value', 'Sign-In/Log-In')
          submitBt.removeAttribute('disabled');
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
  loading.updateProfileBt.addEventListener('click', async (bt) => {
    bt.preventDefault();
    console.log('updating');


    if (genderDropMenu.value == 'p') {
      index.createAD(text.text.preferNotToSayGender)
      return
    } else if (genderDropMenu.value == 'o') {
      index.createAD(text.text.otherGender)
      return
    } else if (document.getElementById('profileUserName').value == '') {
      index.createAD(text.text.noName)
      return
    } else if (document.getElementById('profilePassoword').value == '') {
      index.createAD(text.text.noPasswordUpdate)
      return
    }

    if (loading.allUserData[0].password != document.getElementById('profilePassoword').value) {
      return index.createAD(text.text.wrongPassword);
    }
    updateProfile();

  })
}
async function updateProfile() {
  loading.updateProfileBt.setAttribute('value', 'updating your data . . .');
  loading.updateProfileBt.setAttribute('disabled', 'true');
  loading.logOutBtn.setAttribute('disabled', 'true');
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

    await api.postAccountData(toAPIData);
    localStorage.setItem('profile', JSON.stringify(toLocalStorage));
    index.createAD(text.text.accountUpdated, 'green');
    loading.getProfileData();

  } catch (err) {
    console.log(err);
    index.createAD(text.text.accountCreatingFailed)
  }
}

// log out
export function logOut() {
  loading.logOutBtn.addEventListener('click', () => {
    loading.logOutBtn.setAttribute('disabled', 'true');
    loading.logOutBtn.innerHTML = 'Logging out . . .';
    localStorage.removeItem('profile');
    location.reload();
  })
}

// welcome gift
async function addWelcomGift() {
  await api.updateSpecificData('accounts', 'email', JSON.parse(localStorage.getItem('profile')).email, { cocs: 10 });
  index.createNotification('welcomeGift');
}

// profile pic
export function formPicture() {
  const profilePicInput = document.getElementById('profilePicture');
  const accountProfilePicture = document.querySelector('.publicProfile .profilePicture img');
  const profilePictureUrl = document.getElementById('profilePictureUrl');

  removeImageF();

  profilePicInput.addEventListener('change', async (inputfile) => {
    const inputImage = inputfile.target.files[0];
    if (inputImage){
      console.log('passed');
      
      let imageUrl = await index.makeSuitableImages(inputImage)
      accountProfilePicture.src = imageUrl;
      profilePictureUrl.value = imageUrl;
      accountProfilePicture.style.display = 'block';
    }
  })
}
function removeImageF() {
  const removeImage = document.getElementById('removeImage');
  removeImage.addEventListener('click', ()=>{
    document.querySelector('.publicProfile .profilePicture img').style.display = 'none';
    document.getElementById('profilePictureUrl').value = '';
    index.createAD(text.text.noImage);
  })
}