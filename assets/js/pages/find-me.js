import * as text from './text.js';
import * as api from '../dashboard/dashboard-api.js';


if (localStorage.getItem('played') == 'true') {
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
// console.log(verses, versesNo);

let getPlayerNo = localStorage.getItem('playerNo')
// console.log(getPlayerNo);

if (!getPlayerNo || getPlayerNo === '') {
  getPlayerNo = Math.floor(Math.random() * versesNo);
  localStorage.setItem('playerNo', getPlayerNo.toString());
  localStorage.setItem('playedVerse', JSON.stringify([]))
  // console.log(getPlayerNo);
} else {
  getPlayerNo = Number(getPlayerNo);
  // console.log(getPlayerNo);

}

const playerVerse = verses[getPlayerNo];
// console.log(playerVerse, playerVerse.verseWords.length);


// adding word number dom
let openedTextDom = '';
for (let index = 1; index <= playerVerse.verseWords.length;) {
  openedTextDom += text.dom.guessResult(index)
  index++;
}
document.getElementById('openedVerseText').innerHTML = openedTextDom;


function shuffleVerse(verse) {
  let tempNoS = [];
  let newVerse = []

  verse.forEach(v => {
    for (let complete = 0; complete !== 1;) {
      let tempNo = Math.floor(Math.random() * 20)

      if (!(tempNoS.find(check => tempNo === check)) && tempNo !== 0) {
        complete = 1;
        newVerse.push({ [tempNo]: v })
        tempNoS.push(tempNo)
      }

    }
  })
  return newVerse
}


const newVerse = shuffleVerse(playerVerse.verseWords);
// console.log(newVerse);


let score = localStorage.getItem('findMeScore') ? localStorage.getItem('findMeScore') : 25;
// console.log(score);


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
  // console.log(wordI, word);

  wordI !== 0 ? document.querySelector(`#openedVerseText .verseTextArea[data-wordNo="${wordI}"] #verseWord`).innerHTML = word : null;
  document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"] .word-text`).innerHTML = word;

  word !== 'فاضية' ? playedVerse.push(word) : null;
  localStorage.setItem('playedVerse', JSON.stringify(playedVerse))

  score -= 1;
  localStorage.setItem('findMeScore', score);
  document.querySelector('#points #cocsNo').innerHTML = score;

}



let playedVerse = localStorage.getItem('playedVerse') ? JSON.parse(localStorage.getItem('playedVerse')) : [];
// console.log(playedVerse);



// open last progress
function completeProgress(playedVerse) {
  playedVerse.forEach(v => {
    // let wordIndex = newVerse.findIndex(obj => Object.values(obj).includes(v)) + 1;

    let wordValue = Object.keys(newVerse.find(obj => Object.values(obj).includes(v)))[0];


    let word = newVerse.find(verse => wordValue in verse) ? newVerse.find(verse => wordValue in verse)[wordValue] : 'فاضية';
    const wordI = newVerse.findIndex(verse => wordValue in verse) + 1;
    // console.log(wordI, word);

    wordI !== 0 ? document.querySelector(`#openedVerseText .verseTextArea[data-wordNo="${wordI}"] #verseWord`).innerHTML = word : null;
    document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"] .word-text`).innerHTML = word;

    document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"]`).classList.add('openedCard');

    document.querySelector('#points #cocsNo').innerHTML = score;
  })

  openedPlankCards();
}
completeProgress(playedVerse);

function openedPlankCards() {
  let plankNoS = [];

  for (let temp = 1; temp < 21; temp++) {

    !(newVerse.find(verse => temp in verse)) ? plankNoS.push(temp) : null;

  }

  let openedPlanks = (25 - score) - (JSON.parse(localStorage.getItem('playedVerse'))).length;
  // console.log(openedPlanks);

  for (let index = 1; index <= openedPlanks;) {

    document.querySelector(`#cardSection .card[data-wordNo="${plankNoS[index]}"]`).classList.add('openedCard');
    document.querySelector(`#cardSection .card[data-wordNo="${plankNoS[index]}"] .word-text`).innerHTML = 'فاضية';

    index++;
  }

}

// answes

document.querySelector('#answerFiled #submit').addEventListener('click',async (click) => {
  click.preventDefault();

  let formData = Object.fromEntries(new FormData(document.getElementById('answerFiled')));

  // checking inserted data
  let allGood;
  !formData.bibleBooks || formData.bibleBooks == '' ? createAD('اختار السفر') : !formData.chapter || formData.chapter == '' ? createAD('اختار الأصحاح') : !formData.verse || formData.verse == '' ? createAD('اختار رقم الاية') : allGood = true;

  if (allGood) {
    // console.log(formData);

    if (formData.bibleBooks == playerVerse.verseChapter.book) {
      if (Number(formData.chapter) == playerVerse.verseChapter.chapter) {
        if (Number(formData.verse) == playerVerse.verseChapter.verse) {
          createAD('الله ينور يا باباشا الاجابة صح<br>دقيقة بس نحسبلك النقاط', 'green');
          const newCocs = await addPoints(score);
          localStorage.setItem('played', 'true')

          createAD(`تمام كدة دن<br>الكوكس الى معاك دولقتى ${newCocs}<br> هيتم تحويلك الى الصفحة الرئيسية دولتقى`, 'green');

          setTimeout(()=> location.href = '../../', 10000)
          return
        }
      }
    }
    createAD('للاسف  الاجابة غلط!!<br>حاول تانى')
    
  }
})

async function addPoints(points) {
  try {
    const accountData = await api.getSpecificData('accounts', 'email', (JSON.parse(localStorage.getItem('profile'))).email);
    const accountCocs = accountData[0].cocs
    // console.log(accountCocs);
    const newScore = Number(accountCocs) + Number(points);

    const updateData = await api.updateSpecificData('accounts','email', (JSON.parse(localStorage.getItem('profile'))).email, {'cocs': [newScore]})

    const updateTaskState = await api.updateSpecificData('profileTask','email', (JSON.parse(localStorage.getItem('profile'))).email, {'tsk113489': 'ok'});

    const addNotification = await api.addSpecificData('notifications', text.notificationsdata.findMe(points, (JSON.parse(localStorage.getItem('profile'))).email))  
    
    return newScore
  } catch (error) {
    console.log(error);
    
  }
}