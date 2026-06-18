import * as text from './text.js'


// creating ADs
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

// the game

const verses = text.bibleVerses;
const versesNo = verses.length;
console.log(verses, versesNo);

let getPlayerNo = localStorage.getItem('playerNo')
console.log(getPlayerNo);

if (!getPlayerNo || getPlayerNo === '') {
  getPlayerNo = Math.floor(Math.random() * versesNo);
  localStorage.setItem('playerNo', getPlayerNo.toString())
  console.log(getPlayerNo);
} else {
  getPlayerNo = Number(getPlayerNo);
  console.log(getPlayerNo);

}

const playerVerse = verses[getPlayerNo];
console.log(playerVerse);

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
console.log(newVerse);



// card clicked

document.querySelectorAll('#cardSection .card').forEach(v => v.addEventListener('click', click => {
  if (!v.classList.contains('openedCard')) {
    console.log(v);
    v.classList.add('openedCard');
    const cardValue = v.dataset.wordno;
    console.log(cardValue);

    addWords(cardValue)
  }
}))

function addWords(wordValue) {
  let word = newVerse.find(verse => wordValue in verse) ? newVerse.find(verse => wordValue in verse)[wordValue] : 'فاضية';
  const wordI = newVerse.findIndex(verse => wordValue in verse) + 1;
  console.log(wordI, word);

  wordI !== 0 ? document.querySelector(`#openedVerseText .verseTextArea[data-wordNo="${wordI}"] #verseWord`).innerHTML = word : null;
  document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"] .word-text`).innerHTML = word;

  word !== 'فاضية' ? playedVerse.push(word) : null;
  localStorage.setItem('playedVerse', JSON.stringify(playedVerse))
}

let playedVerse = localStorage.getItem('playedVerse') ? JSON.parse(localStorage.getItem('playedVerse')) : [];
console.log(playedVerse);

// open last progress
function completeProgress(playedVerse) {
  playedVerse.forEach(v => {    
    // let wordIndex = newVerse.findIndex(obj => Object.values(obj).includes(v)) + 1;

    let wordValue = Object.keys(newVerse.find(obj => Object.values(obj).includes(v)))[0];
    

    let word = newVerse.find(verse => wordValue in verse) ? newVerse.find(verse => wordValue in verse)[wordValue] : 'فاضية';
    const wordI = newVerse.findIndex(verse => wordValue in verse) + 1;
    console.log(wordI, word);

    wordI !== 0 ? document.querySelector(`#openedVerseText .verseTextArea[data-wordNo="${wordI}"] #verseWord`).innerHTML = word : null;
    document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"] .word-text`).innerHTML = word;

    document.querySelector(`#cardSection .card[data-wordNo="${wordValue}"]`).classList.add('openedCard');   
  })
}
completeProgress(playedVerse);