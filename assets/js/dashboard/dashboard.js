import * as dashboardProfile from "./dashboard-profile-page.js"
import * as dashboardLoading from "./dashboard-loading-data.js"

// ad banner
let adBannerNumber = 0;
export function createAD(inputText, inputColor) {

  let color = 'red';
  if (inputColor) {
    color = inputColor
  }
  adBannerNumber += 1;

  document.getElementsByClassName('adBanner')[0].insertAdjacentHTML("beforeend", `<div class="adDiv ${color}">${inputText}</div>`);
  console.log('AD created');

  removeAD();
}
function removeAD() {
  for (adBannerNumber; adBannerNumber > 0; adBannerNumber--) {
    setTimeout(() => {
      document.querySelector('.adDiv:first-child').remove()
    }, 10000)

  }
}

const footerNavIcons = document.querySelectorAll('body footer a');
addEventListener('hashchange', () => {
  const currentPage = location.hash;

  localStorage.setItem('historyPage', currentPage);

  footerNavIcons.forEach((v) => {
    v.querySelector(`span`).classList.remove('activePage');

    if (`${v.getAttribute('href')}` == `${currentPage}`) {
      v.setAttribute('class', 'active');
      v.querySelector(`span`).classList.add('activePage');
    }
  })
})

window.addEventListener('load', () => {
  location.hash = '';
  location.hash = localStorage.getItem('historyPage');
})

