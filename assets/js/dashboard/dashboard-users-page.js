import * as api from "./dashboard-api.js";
import * as text from "../text.js";


let allUsers = await api.getData('accounts');
let activeUsers = [];
// console.log(allUsers);

activeUsers = allUsers.filter(v => v.state == 'active');
allUsers = allUsers.filter(v => v.state != 'deleted');
// console.log(activeUsers, allUsers);


const totalUsersNo = document.querySelector('#totalAccountsNo>p:last-child');
const activeUsersNo = document.querySelector('#totalUsersNo>p:last-child');

// adding acconts numbers
totalUsersNo.innerHTML = allUsers.length;
activeUsersNo.innerHTML = activeUsers.length;
// console.log(activeUsers, allUsers);

const activeRequestSection = document.querySelector("#requestsContainer");

activeRequestSection.addEventListener("wheel", (x) => {
  x.preventDefault();
  activeRequestSection.scrollBy({
    left: x.deltaY,
    scrollBehavior: "smooth",
  })
}, { passive: false });

let inactiveUsers = [];
allUsers.forEach(v => {
  if (v.state == '') {
    inactiveUsers.push(v);
  }
})

let acceptBtn;
let removeBtn;
let deleteBtn;
try {
  if (!Array.isArray(JSON.parse(localStorage.getItem('removedInactivesEmail')))) {
    localStorage.setItem('removedInactivesEmail', '[]');
  }
} catch {
  localStorage.setItem('removedInactivesEmail', '[]');
}


function addingRequests() {
  let toInactiveDom = '';
  inactiveUsers.forEach(v => {
    let displayImg = 'style="display:none;"';
    if (JSON.parse(localStorage.getItem('removedInactivesEmail')).includes(v.email)) {
      return;
    };
    if (v.profilePicture != '') {
      displayImg = 'style="display:block;"';
    };
    toInactiveDom += text.dom.requestDOM(v.userName, v.email, v.profilePicture, displayImg)
  });

  activeRequestSection.innerHTML = toInactiveDom;
  if (toInactiveDom == '') {
    document.getElementById('requests').remove();
  };
  acceptBtn = document.querySelectorAll('.requestAction button.approve');
  removeBtn = document.querySelectorAll('.requestAction button.remove');
  deleteBtn = document.querySelectorAll('.requestAction button.delete');

  acceptBtnFunction();
  removeBtnFunction();
  deleteBtnFunction();
}
addingRequests();

function acceptBtnFunction() {
  acceptBtn.forEach(v => {
    v.addEventListener('click', () => {
      const email = v.closest('.request').getAttribute('data-email');

      api.updateSpecificData('accounts', 'email', email, { state: 'active' });
      inactiveUsers.forEach((v, i) => {
        if (v.email == email) {
          inactiveUsers.splice(i, 1);
        }
      });
      addingRequests();
      activeUsersNo.innerHTML = Number(activeUsersNo.innerHTML) + 1;
    });
  });
}
function removeBtnFunction() {
  removeBtn.forEach(v => {
    v.addEventListener('click', () => {
      const email = v.closest('.request').getAttribute('data-email');

      let toLocalStorage = JSON.parse(localStorage.getItem('removedInactivesEmail'));
      toLocalStorage.push(email);

      localStorage.setItem('removedInactivesEmail', JSON.stringify(toLocalStorage));

      addingRequests();
    });
  });
};
function deleteBtnFunction() {
  deleteBtn.forEach(v => {
    v.addEventListener('click', () => {
      const confirmMessage = confirm('خلى بالك انت كدة هتمسح الحساب دة بشكل نهائى وهيتم تنبيه صاحب الحساب انه اترفض بشكل نهائى')
      if (confirmMessage) {
        const email = v.closest('.request');
        api.updateSpecificData('accounts', 'email', email.getAttribute('data-email'), { state: 'deleted' });
        totalUsersNo.innerHTML = Number(totalUsersNo.innerHTML) - 1;

        inactiveUsers = inactiveUsers.filter(v => v.email != email.getAttribute('data-email'));
      };
      addingRequests();
    });
  });
};


// all users section
const userSearchInput = document.querySelector('#accountsSearch input');
const searchIcon = document.querySelector('#accountsSearch .icon-search');
const clearIcon = document.querySelector('#accountsSearch .icon-clear');

let searchList = [];
function updateSearchList() {
  searchList = [];

  allUsers.forEach((v, i) => {
    searchList.push({ [v.userName.toLowerCase()]: i });
    searchList.push({ [v.email.toLowerCase()]: i })
  })
}
updateSearchList();

userSearchInput.addEventListener('input', inputSearch => {
  if (inputSearch.target.value == '') {
    searchIcon.style.opacity = '1';
    clearIcon.style.opacity = '0';
  } else {
    searchIcon.style.opacity = '0';
    clearIcon.style.opacity = '1';
    clearIcon.style.zIndex = '2';
  }
  clearIcon.addEventListener('click', () => {
    userSearchInput.value = '';
    searchIcon.style.opacity = '1';
    clearIcon.style.opacity = '0';
  })

  let toDisplay = [];
  let indexToAdd = [];

  console.log(searchList);

  searchList.forEach(v => {
    if (Object.keys(v).toString().includes(inputSearch.target.value.toLowerCase())) {
      if (!indexToAdd.includes(Object.values(v)[0])) {
        indexToAdd.push(Object.values(v)[0]);
      }
    }
  })
  console.log(indexToAdd);
  indexToAdd.forEach(v => {
    toDisplay.push(allUsers[v]);
  })

  console.log(toDisplay);
  addUsersToDom(toDisplay);
})

const usersConainer = document.getElementById('usersContainer');
function addUsersToDom(users) {
  let usersToDom = '';

  users.forEach(v => {
    let state, gender, picState;

    v.state == '' ? state = 'pending' : v.state == 'active' ? state = 'active' : state == 'admin' ? state = 'admin' : state = v.state;

    v.gender == 'm' ? gender = 'user1' : gender = 'user2';

    v.profilePicture == '' ? picState = '0' : picState = '1';

    usersToDom += text.dom.dashboardUsers(v.userName, v.email, state, gender, v.profilePicture, picState)
  })
  usersConainer.innerHTML = usersToDom;
}
addUsersToDom(allUsers);


const filterButton = document.querySelectorAll('#accountsSearchCategorys>div');

filterButton.forEach(v => {
  v.addEventListener('click', clicked => {
    filterButton.forEach(v => { v.removeAttribute('data-state') })

    clicked.target.setAttribute('data-state', 'selected');
    clicked = clicked.target.getAttribute('id');
    console.log(clicked);

    searchList = [];
    if (clicked == 'activeAccounts') {
      allUsers.forEach((v, i) => {
        if (v.state == 'active') {
          searchList.push({ [v.userName.toLowerCase()]: i });
          searchList.push({ [v.email.toLowerCase()]: i });
        }
      })
    } else if (clicked == 'adminAccounts') {
      allUsers.forEach((v, i) => {
        if (v.state == 'admin') {
          searchList.push({ [v.userName.toLowerCase()]: i });
          searchList.push({ [v.email.toLowerCase()]: i });
        }
      })
    } else if (clicked == 'pendingAccounts') {
      allUsers.forEach((v, i) => {
        if (v.state == '') {
          searchList.push({ [v.userName.toLowerCase()]: i });
          searchList.push({ [v.email.toLowerCase()]: i });
        }
      })
    } else {
      allUsers.forEach((v, i) => {
          searchList.push({ [v.userName.toLowerCase()]: i });
          searchList.push({ [v.email.toLowerCase()]: i });
      })
    }

    addUsersToDom(checkDuplicate(searchList));
  })
})

function checkDuplicate(inputData) {
  let tempData = [];

  console.log(inputData);
  inputData.forEach(v=>{
    if (!tempData.includes(Object.values(v)[0])) {
      tempData.push(Object.values(v)[0]);
    }
  })
  console.log(tempData);

  let data = [];
  tempData.forEach(v=>{
    data.push(allUsers[v])
  })
  return data;
}