import * as text from './text.js';
import * as api from '../dashboard/dashboard-api.js';

if (localStorage.getItem('playeda') == 'true') {
  alert('للاسف اللعبة معمولة انها تتلعب مرة واحدة بس بعد ما تكسب مش ها ينفع تعيد تانى');
  location.href = '../../index.html'
}

// creating ADs
let adBannerNumber = 0;
export function createAD(inputText, inputColor) {

  let color = 'red';
  if (inputColor) {
    color = inputColor
  }
  adBannerNumber += 1;

  document.getElementsByClassName('adBanner')[0].insertAdjacentHTML("beforeend", `<div class="adDiv ${color}">${inputText}</div>`);

  removeAD();
}

function removeAD() {
  for (adBannerNumber; adBannerNumber > 0; adBannerNumber--) {
    setTimeout(() => {
      document.querySelector('.adDiv:first-child').remove()
    }, 10000)

  }
}

document.querySelector('#welcomeMsg button').addEventListener('click', click => document.getElementById('welcomeMsg').remove())

// the game
const verses = text.bibleVerses;
const versesNo = verses.length;

let getPlayerNo = localStorage.getItem('playerNoa')

if (!getPlayerNo || getPlayerNo === '') {
  getPlayerNo = Math.floor(Math.random() * versesNo);
  localStorage.setItem('playerNoa', getPlayerNo.toString());
  localStorage.setItem('playedVersea', JSON.stringify([]))
} else {
  getPlayerNo = Number(getPlayerNo);
}

const playerVerse = verses[getPlayerNo];

// adding word number dom
let openedTextDom = '';
for (let index = 1; index <= playerVerse.verseWords.length;) {
  openedTextDom += text.dom.guessResult(index)
  index++;
}
document.getElementById('openedVerseText').innerHTML = openedTextDom;


// ✅ تم الإصلاح: توزيع الأرقام بشكل سليم بدون أخطاء
function shuffleVerse(verse) {
  let tempNoS = [];
  let newVerse = [];

  verse.forEach(v => {
    let complete = false;
    while (!complete) {
      let tempNo = Math.floor(Math.random() * 20) + 1;

      if (!tempNoS.includes(tempNo)) {
        complete = true;
        newVerse.push({ [tempNo]: v });
        tempNoS.push(tempNo);
      }
    }
  });
  return newVerse;
}

const newVerse = shuffleVerse(playerVerse.verseWords);

// ✅ تم الإصلاح: التأكد من إن السكور رقم مش نص
let score = localStorage.getItem('findMeScorea') ? Number(localStorage.getItem('findMeScorea')) : 25;


// card clicked
document.querySelectorAll('#cardSection .card').forEach(v => v.addEventListener('click', click => {
  if (!v.classList.contains('openedCard')) {
    v.classList.add('openedCard');
    const cardValue = v.dataset.wordno;

    addWords(cardValue)
  }
}))

function addWords(wordValue) {
  let word = newVerse.find(verse => wordValue in verse) ? newVerse.find(verse => wordValue in verse)[wordValue] : 'فاضية';
  const wordI = newVerse.findIndex(verse => wordValue in verse) + 1;

  wordI !== 0 ? document.querySelector(`#openedVerseText .verseTextArea[data-wordNo="${wordI}"] #verseWord`).innerHTML = word : null;
  document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"] .word-text`).innerHTML = word;

  word !== 'فاضية' ? playedVerse.push(word) : null;
  localStorage.setItem('playedVersea', JSON.stringify(playedVerse))

  score -= 1;
  localStorage.setItem('findMeScorea', score);
  document.querySelector('#points #cocsNo').innerHTML = score;
}

let playedVerse = localStorage.getItem('playedVerses') ? JSON.parse(localStorage.getItem('playedVersea')) : [];

// open last progress
function completeProgress(playedVerse) {
  playedVerse.forEach(v => {
    let wordValue = Object.keys(newVerse.find(obj => Object.values(obj).includes(v)))[0];

    let word = newVerse.find(verse => wordValue in verse) ? newVerse.find(verse => wordValue in verse)[wordValue] : 'فاضية';
    const wordI = newVerse.findIndex(verse => wordValue in verse) + 1;

    wordI !== 0 ? document.querySelector(`#openedVerseText .verseTextArea[data-wordNo="${wordI}"] #verseWord`).innerHTML = word : null;
    document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"] .word-text`).innerHTML = word;

    document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"]`).classList.add('openedCard');

    document.querySelector('#points #cocsNo').innerHTML = score;
  })

  openedPlankCards();
}
completeProgress(playedVerse);

// ✅ تم الإصلاح: حل مشكلة اللوب والاندكس 0 في الكروت الفاضية
function openedPlankCards() {
  let plankNoS = [];

  for (let temp = 1; temp <= 20; temp++) {
    let exists = newVerse.find(verse => temp in verse);
    if (!exists) {
      plankNoS.push(temp);
    }
  }

  let playedVerseCount = localStorage.getItem('playedVersea') ? JSON.parse(localStorage.getItem('playedVersea')).length : 0;
  let openedPlanks = (25 - score) - playedVerseCount;

  for (let index = 0; index < openedPlanks; index++) {
    let cardTarget = document.querySelector(`#cardSection .card[data-wordNo="${plankNoS[index]}"]`);
    if (cardTarget) {
      cardTarget.classList.add('openedCard');
      cardTarget.querySelector('.word-text').innerHTML = 'فاضية';
    }
  }
}

// ✅ تم الإصلاح: منع الريفريش 100% عن طريق استخدام حدث submit للفورم
document.getElementById('answerFiled').addEventListener('submit', async (e) => {
  e.preventDefault();
  document.querySelector('#answerFiled #submit').setAttribute('disabled', 'true');

  let formData = Object.fromEntries(new FormData(document.getElementById('answerFiled')));

  // checking inserted data
  let allGood;
  !formData.bibleBooks || formData.bibleBooks == '' ? createAD('اختار السفر') : !formData.chapter || formData.chapter == '' ? createAD('اختار الأصحاح') : !formData.verse || formData.verse == '' ? createAD('اختار رقم الاية') : allGood = true;

  if (allGood) {
    if (formData.bibleBooks == playerVerse.verseChapter.book &&
      Number(formData.chapter) == playerVerse.verseChapter.chapter &&
      Number(formData.verse) == playerVerse.verseChapter.verse) {

      createAD('الله ينور يا باشا الاجابة صح<br>دقيقة بس نحسبلك النقاط', 'green');
      const newCocs = await addPoints(score);
      localStorage.setItem('playeda', 'true');

      createAD(`تمام كدة دن<br>الكوكس الى معاك دلوقتي ${newCocs}<br> هيتم تحويلك الى الصفحة الرئيسية دلوقتي`, 'green');

      setTimeout(() => location.href = smartLink(''), 10000);
      return;
    }
    createAD('للاسف الاجابة غلط!!<br>حاول تاني');
  }
  document.querySelector('#answerFiled #submit').removeAttribute('disabled');
});

async function addPoints(points) {
  try {
    const accountData = await api.getSpecificData('accounts', 'email', (JSON.parse(localStorage.getItem('profile'))).email);
    const accountCocs = accountData[0].cocs;

    const newScore = Number(accountCocs) + Number(points);

    const updateData = await api.updateSpecificData('accounts', 'email', (JSON.parse(localStorage.getItem('profile'))).email, { 'cocs': [newScore] });

    const updateTaskState = await api.updateSpecificData('profileTask', 'email', (JSON.parse(localStorage.getItem('profile'))).email, { 'tsk113489': 'ok' });

    const addNotification = await api.addSpecificData('notifications', text.notificationsdata.findMe(points, (JSON.parse(localStorage.getItem('profile'))).email));

    return newScore;
  } catch (error) {
    console.log(error);
  }
}

function smartLink(link) {
  // github pages function
  if (link.startsWith('http')) {
    console.log('gloabal link');
    return link;
  }
  if ((location.origin).includes('netherdragon99')) {
    console.log('contains netherdragon99');

    return `${window.origin}/youth-conference/${link}`;
  }
  return `${window.origin}/${link}`;
}
