import * as loadingData from './loading-account-data.js';

const cocs = document.getElementById('cocsNO');
const transactionCocs = document.getElementById('transactionCocsNO');
const userRank = document.getElementById('rank');
const transactionRank = document.querySelector('#transactionRank p')

// user data
export const cocsAndRank = () => {
  cocs.innerHTML = loadingData.allUserData[0].cocs;
  transactionCocs.innerHTML = loadingData.allUserData[0].cocs;
  userRank.innerHTML = `#${loadingData.allUserData[0].rank}`;
  transactionRank.innerHTML = `${loadingData.allUserData[0].rank}${checkingRank(loadingData.allUserData[0].rank)}`;
}
function checkingRank(rankNo) {
  if (rankNo == 1) {
    return 'st'
  }else if (rankNo == 2) {
    return 'nd'
  }else if (rankNo == 3) {
    return 'rd'
  }else{
    return 'th'
  }
}


// search
const search = document.getElementById('transactionSearchBar');
const transactionIconSearch = document.querySelector('#transactionSearch .icon-search');

search.addEventListener('input', (input)=>{
  if (input.target.value == '') {
    transactionIconSearch.style.opacity = '1';
  }else{
    transactionIconSearch.style.opacity = '0';
  }
})