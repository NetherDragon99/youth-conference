import * as text from '../text.js';
import * as api from './dashboard-api.js';
import * as dashboard from './dashboard.js';
import * as timing from '../timing.js';


let allUsersData;
const usersNo = document.getElementById('usersNo');

export async function transactionPage() {
  addTransactionHistory();
  transactionDescriptionF();
  transactionDetailsF();
  allUsersData = await api.getSpecificData('accounts', 'state', 'active');
  // console.log(allUsersData);

  usersNo.innerHTML = allUsersData.length;
  transactionUsersSearch();

}

let transactionSearchBar = document.getElementById('transactionSearchBar');
const searchSuggestionsContainer = document.getElementById('usersSearchSuggestions');
const usersSearchExit = document.querySelector('#transactionUsersSearch .exitSearchMenu');
const iconSearch = document.querySelector('#transactionUsersSearch .icon-search');

function transactionUsersSearch() {
  const allUsersSearch = [];
  allUsersData.forEach((v, i) => {
    allUsersSearch.push({ text: v.userName.toLowerCase(), index: i });
    allUsersSearch.push({ text: v.email.toLowerCase(), index: i });
  })

  transactionSearchBar.onfocus = () => {
    searchSuggestionsContainer.style.display = 'flex';
    if (searchSuggestionsContainer.children.length == 0) {
      addSearchResults('')
    }

  }
  transactionSearchBar.onblur = () => {
    setTimeout(() => { searchSuggestionsContainer.style.display = 'none'; }, 200)
  }
  usersSearchExit.onclick = () => {
    transactionSearchBar.value = '';
    searchSuggestionsContainer.style.display = 'none';
    iconSearch.style.opacity = '1'
    usersSearchExit.style.opacity = '0';
  }

  transactionSearchBar.addEventListener('keyup', (word) => {
    const typedWord = word.target.value.trim().toLowerCase();
    transactionSearchBar.setAttribute('data-targetedUser', word.target.value);

    if (word.target.value == '') {
      iconSearch.style.opacity = '1'
      usersSearchExit.style.opacity = '0';
    } else {
      iconSearch.style.opacity = '0'
      usersSearchExit.style.opacity = '1';
    }

    addSearchResults(typedWord);

  })

  function addSearchResults(typedWord) {
    let tempsearchResults = [];
    allUsersSearch.forEach((v) => {
      const checkDuplicate = tempsearchResults.includes(v.index);

      if (v.text.includes(typedWord)) {
        if (!checkDuplicate) {
          tempsearchResults.push(v.index);

        }
      }
    })

    let toDisplay = '';
    tempsearchResults.forEach((v) => {
      toDisplay += (text.dom.usersSearchResults(allUsersData[v]));
    })
    searchSuggestionsContainer.innerHTML = toDisplay;

    const searchSuggestionsResult = document.querySelectorAll('.usersSearchSuggestion');
    searchSuggestionsResult.forEach((v) => {
      v.onclick = () => {
        transactionSearchBar.value = v.children[0].innerHTML;
        searchSuggestionsContainer.style.display = 'none';
        transactionSearchBar.setAttribute('data-targetedUser', v.children[1].innerHTML)
      }
    })
  }
}

let amountTransactionBar = document.getElementById('insertedTransactionAmount');
const amountTransactionTypeBtn = document.getElementById('transfereTypeButton');
const fastTransactionValue = document.querySelectorAll('.fastTransactionValue')

amountTransactionTypeBtn.onclick = () => {
  if (amountTransactionTypeBtn.getAttribute('data-state') == 'addCocs') {
    amountTransactionTypeBtn.setAttribute('data-state', 'removeCocs');

    fastTransactionValue[0].children[1].innerHTML = '-5';
    fastTransactionValue[1].children[1].innerHTML = '-10';
    fastTransactionValue[2].children[1].innerHTML = '-20';
    fastTransactionValue[3].children[1].innerHTML = '-50';
  } else {
    amountTransactionTypeBtn.setAttribute('data-state', 'addCocs')

    fastTransactionValue[0].children[1].innerHTML = '+5';
    fastTransactionValue[1].children[1].innerHTML = '+10';
    fastTransactionValue[2].children[1].innerHTML = '+20';
    fastTransactionValue[3].children[1].innerHTML = '+50';
  }
}

fastTransactionValue.forEach((v) => {
  v.onclick = () => {
    console.log('clicked');
    amountTransactionBar.value = v.getAttribute('data-value');
  }
})

const transactionDescription = document.getElementById('transactionDescription');
const transactionDescriptionContainer = document.getElementById('transactionDescriptionSuggestions');

async function transactionDescriptionF() {
  const allDescriptionSuggestion = await api.getColumn('text', 'transactionDescription');
  // console.log(allDescriptionSuggestion);


  transactionDescription.onfocus = () => {
    transactionDescriptionContainer.style.display = 'flex';

    let toDisplay = '';
    if (localStorage.getItem('transactionDescription') && localStorage.getItem('transactionDescription') !== '') {
      toDisplay += text.dom.transactiionLastDescription(localStorage.getItem('transactionDescription'));
    }

    allDescriptionSuggestion.forEach((v) => {
      toDisplay += text.dom.transactiionDescription(v);
    })
    transactionDescriptionContainer.innerHTML = toDisplay;
    onClickSuggestion();
  }
  window.addEventListener('click', (click) => {
    if (!click.target.closest('.transactionDescriptionSuggestion') &&
      !click.target.closest('#transactionDescription')) {
      setTimeout(() => { transactionDescriptionContainer.style.display = 'none'; }, 200)
    }
  })

  transactionDescription.addEventListener('keyup', (word) => {
    const typedWord = word.target.value.trim().toLowerCase();
    let searchResults = [];

    allDescriptionSuggestion.forEach((v) => {
      if (v.includes(typedWord)) {
        searchResults.push(v);
      }
    })
    let toDisplay = '';
    if (localStorage.getItem('transactionDescription') && localStorage.getItem('transactionDescription') !== '') {
      toDisplay += text.dom.transactiionLastDescription(localStorage.getItem('transactionDescription'));
    }

    searchResults.forEach((v) => {
      toDisplay += text.dom.transactiionDescription(v);
    })
    transactionDescriptionContainer.innerHTML = toDisplay;
    onClickSuggestion();
  })

  function onClickSuggestion() {
    setTimeout(() => {
      const suggestions = document.querySelectorAll('.transactionDescriptionSuggestion');
      // console.log(suggestions);


      suggestions.forEach((v) => {
        v.addEventListener('click', () => {
          if (v.classList.contains('lastDescription')) {
            transactionDescription.value = v.querySelector('.lastDescriptionText').innerHTML.replace(/\<br>/g, '\n');
            return transactionDescriptionContainer.style.display = 'none';
          }
          transactionDescription.value = v.innerHTML.replace(/\<br>/g, '\n');
          transactionDescriptionContainer.style.display = 'none';
        })
      })
    }, 200)
  }
}

const transactionDetails = document.getElementById('transactionDetailsMessage');
const transactionDetailsContainer = document.getElementById('transactionDetailsSuggestions');

transactionDetails.addEventListener('input', function(){
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
})

async function transactionDetailsF() {
  const allDescriptionSuggestion = await api.getColumn('text', 'transactionDetails');
  // console.log(allDescriptionSuggestion);


  transactionDetails.onfocus = () => {
    transactionDetailsContainer.style.display = 'flex';

    let toDisplay = '';
    if (localStorage.getItem('transactionDetails') && localStorage.getItem('transactionDetails') !== '') {
      toDisplay += text.dom.transactiionLastDetails(localStorage.getItem('transactionDetails'));
    }

    allDescriptionSuggestion.forEach((v) => {
      v = v.replace(/\\n/g, '<br>');
      toDisplay += text.dom.transactiionDetails(v);
    })
    transactionDetailsContainer.innerHTML = toDisplay;
    onClickSuggestion();
  }
  window.addEventListener('click', (click) => {
    if (!click.target.closest('.transactionDescriptionSuggestion') &&
      !click.target.closest('#transactionDetailsMessage')) {
      setTimeout(() => { transactionDetailsContainer.style.display = 'none'; }, 200)
    }
  })

  transactionDetails.addEventListener('keyup', (word) => {
    const typedWord = word.target.value.trim().toLowerCase();
    let searchResults = [];

    allDescriptionSuggestion.forEach((v) => {
      if (v.includes(typedWord)) {
        v = v.replace(/\\n/g, '<br>');
        searchResults.push(v);
      }
    })
    // console.log(searchResults);
    let toDisplay = '';
    if (localStorage.getItem('transactionDescription') && localStorage.getItem('transactionDetails') !== '') {
      toDisplay += text.dom.transactiionLastDetails(localStorage.getItem('transactionDetails'));
    }

    searchResults.forEach((v) => {
      toDisplay += text.dom.transactiionDescription(v);
    })
    transactionDetailsContainer.innerHTML = toDisplay;
    onClickSuggestion();
  })

  function onClickSuggestion() {
    setTimeout(() => {
      const suggestions = document.querySelectorAll('.transactionDescriptionSuggestion');

      suggestions.forEach((v) => {
        v.addEventListener('click', () => {
          if (v.classList.contains('lastDescription')) {
          transactionDetails.value = v.querySelector('.lastDescriptionText').innerHTML.replace(/\<br>/g, '\n');
          return transactionDetailsContainer.style.display = 'none';
        }

          transactionDetails.value = v.innerHTML.replace(/\<br>/g, '\n');
          transactionDetailsContainer.style.display = 'none';
        })
      })
    }, 200)
  }
}

const transactionSendBtn = document.getElementById('transactionButton');
const transactionHistoryContainer = document.getElementById('transactionHistoryContainer');


transactionSendBtn.onclick = async () => {
  transactionSendBtn.setAttribute('disabled', 'true');

  let userTargeted, amount, description, details, confirmMessage;
  const type = document.getElementById('transfereTypeButton').getAttribute('data-state');
  const admin = JSON.parse(localStorage.getItem('adminProfile')).userName;

  userTargeted = document.getElementById('transactionSearchBar').getAttribute('data-targetedUser');
  amount = document.getElementById('insertedTransactionAmount').value;
  description = document.getElementById('transactionDescription').value;
  details = document.getElementById('transactionDetailsMessage').value;

  if (userTargeted == '') {
    dashboard.createAD(text.text.noTransactionTargete);
    transactionSendBtn.removeAttribute('disabled');
    return;
  }
  if (amount == '' || amount == '0') {
    dashboard.createAD(text.text.noTransactionAmount);
    transactionSendBtn.removeAttribute('disabled');
    return;
  }

  description == ''? description = text.text.defaultAddTransactioDescription(amount) : description;

  details == ''? details = text.text.defaultTransactionDetails : details;

    if (type == 'addCocs') {
      confirmMessage = text.text.defaultAddTransactioDescription(amount)
    } else {
      confirmMessage = text.text.defaultremoveTransactioDescription(amount);
    }

  type == 'addCocs' ? amount = Number(amount) : amount = Number(amount) * -1;

  let getUserCocs = await api.getSpecificData('accounts', 'email', userTargeted);
  if (getUserCocs.length == 0) {
    transactionSendBtn.removeAttribute('disabled');
    return dashboard.createAD(text.text.transactionUserNotAvailable)
  } else {
    getUserCocs = getUserCocs[0].cocs;
  }
  transactionSendBtn.querySelector('div').style.animation = 'sendBtn 2s forwards';

  const updateData = await api.updateSpecificData('accounts', 'email', userTargeted, { cocs: Number(getUserCocs) + amount })
  transactionSendBtn.removeAttribute('disabled');

  if (updateData.result == 'Success: Updated') {
    dashboard.createAD(confirmMessage, 'green');
    addTransactionHistory();

    localStorage.setItem('transactionDescription', description);
    localStorage.setItem('transactionDetails', details);
  } else {
    return dashboard.createAD(text.text.transactionFaild);
  }


  function addTransactionHistory() {
    let state, time, description, email, icon;
    amount < 0 ? amount = amount * -1 : amount = amount;
    
    if (type == 'addCocs') {
      state = 'add';
      icon = 'plus';
      description = `اضافة <span class="transactionType">+${amount}</span> الى ${transactionSearchBar.value}`
    } else{
      state = 'remove';
      icon = 'minus';
      description = `خصم <span class="transactionType">-${amount}</span> من ${transactionSearchBar.value}`
    }

    time = timing.timeText(new Date())
    email = userTargeted;
    transactionHistoryContainer.insertAdjacentHTML('afterbegin', text.dom.transactionHistory(state, time, description, email, icon, admin))

    if (document.getElementById('transactionDescription').value == '') {
      type == 'addCocs' ? description = text.text.defaultAddTransactioDescription(amount) : description = text.text.defaultremoveTransactioDescription(amount);
    }else{
      description = document.getElementById('transactionDescription').value;
    }

    api.addSpecificData('transactionsHistory',{
      date: time,
      state: state,
      description: description,
      email: email,
      icon: icon,
      adminName: admin,
      userName: transactionSearchBar.value,
      amount: amount,
      details: details
    })

    let title
    state == 'add'? title = `تم اضافة ${amount} كوكس` : title = `تم خصم ${amount} كوكس`
    api.addSpecificData('notifications',{
      email: email,
      title: title,
      description: description,
      details: details,
      icon: `icon-${icon}`,
      time: new Date(),
      state: 'unreadedNotification',
      id: `userNotic${(Math.random() * 100000).toFixed().toString()}`
    })
  }  
}


// add history from the server
async function addTransactionHistory(){
  const fetchedData = await api.getData('transactionsHistory');
  let description;
  transactionHistoryContainer.innerHTML = '';

  fetchedData.forEach((v)=>{
    if (v.state == 'add') {
      description = `اضافة <span class="transactionType">+${v.amount}</span> الى ${v.userName}`
    }else if (v.state == 'remove') {
      description = `خصم <span class="transactionType">-${v.amount}</span> من ${v.userName}`
    }else{
      return
    }
    transactionHistoryContainer.insertAdjacentHTML('afterbegin', text.dom.transactionHistory(v.state, timing.timeText(v.date), description, v.email, v.icon, v.adminName))
  })

}
const refreshHistory = document.querySelector('#transactionHistory header div');

refreshHistory.onclick = async () => {
  refreshHistory.style.animation = 'spinner 1s infinite ease-in-out';
  await addTransactionHistory();
  refreshHistory.style.animation = 'none';
}
