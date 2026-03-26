import * as api from "./dashboard-api.js";
import * as text from "../text.js";


let allUsers = await api.getData('accounts');
let activeUsers = [];
console.log(allUsers);

activeUsers = allUsers.filter(v=>v.state == 'active');
allUsers = allUsers.filter(v=>v.state != 'deleted');
console.log(activeUsers, allUsers);


const totalUsersNo = document.querySelector('#totalAccountsNo>p:last-child');
const activeUsersNo = document.querySelector('#totalUsersNo>p:last-child');

// adding acconts numbers
totalUsersNo.innerHTML = allUsers.length;
activeUsersNo.innerHTML = activeUsers.length;
console.log(activeUsers, allUsers);

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
