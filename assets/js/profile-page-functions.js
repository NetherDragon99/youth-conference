import { createAD } from "./index.js";
import { text } from "./text.js";
import { fetchData, apiURL } from "./api.js";

export const profileForm = document.getElementById("profileForm");
export const genderDropMenu = document.getElementById('profileGender');
export const submitBt = document.getElementById('profileSubmit');
const signUpBut = document.getElementById('profileSignupSubmit');


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

const profileScroll = () => {
  const toProfileData = document.querySelector(".mainProfileData");
  if (toProfileData) {
    toProfileData.scrollIntoView({
      inline: "center",
      behavior: "smooth"
    });
  }
}


submitBt.addEventListener('click', async (x) => {
  x.preventDefault();
  let toLocalStorage = {};

  if (document.getElementById('profileGmail').value == '') {
    createAD(text.noEmail)
    return
  } else if (document.getElementById('profilePassoword').value == '') {
    createAD(text.noPassword)
    return
  }

  let formData = Object.fromEntries(new FormData(profileForm));
  //console.log(formData);

  submitBt.setAttribute('value', 'working . . .')
  const getEmailData = await getAccountData('accounts', formData.email);
  //console.log(getEmailData);

  try {
    // creating a new account
    if (getEmailData.error) {
      createAD(text.newAccount, 'green')

      profileScroll();

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
        formData = Object.fromEntries(new FormData(profileForm));
        console.log(formData);

        const toAPIData = {
          page: 'accounts',
          action: 'add',
          data: formData
        };
        toLocalStorage = {
          email: formData.email,
          password: formData.password
        }

        try {
          console.log('passed');

          await postAccountData(toAPIData);
          localStorage.setItem('profile', JSON.stringify(toLocalStorage));
          await createAD(text.accountCreated, 'green');
          location.reload();

        } catch (err) {
          console.log(err);
          createAD(text.accountCreatingFailed)
        }
      })

      // logging in
    } else if (getEmailData) {

      try {
        const tempAccount = await getAccountData('accounts', formData.email);
        //console.log(tempAccount);

        const tempPass = tempAccount.password;

        //console.log(formData.password , tempPass);
        if (formData.password == tempPass) {
          toLocalStorage = {
            email: formData.email,
            password: formData.password
          }
          await localStorage.setItem('profile', JSON.stringify(toLocalStorage))
          createAD(text.loginSucces, 'green')
          setTimeout(() => {
            location.reload();
          }, 5000);

        } else {
          createAD(text.wrongPassword);
          submitBt.setAttribute('value', 'Sign-In/Log-In')
        }
      } catch (err) {
        console.log(err);
      }
      postAccountData(toAPIData)
    } else {
      throw new Error("unexpected error");
      
    }
  } catch (error) {
    console.log(error);
    submitBt.setAttribute('value', 'Sign-In/Log-In');
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

const postAccountData = async (enteredData) => {
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(enteredData)
    })
    const res = await response.json();
    console.log(res);


  } catch (err) {
    console.log(err);

  }
}