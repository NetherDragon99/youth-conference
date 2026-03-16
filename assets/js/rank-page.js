import * as api from './api.js';
import * as text from './text.js';

const rankAutoRefreshBtn = document.getElementById('rankRefreshButton');
const rankAutoRefreshIcon = document.querySelector('#rankRefreshButton>div');

let allUsersRankData, getUsersDataInterval;
async function getUsersDataIntervalfunction() {
  getUsersDataInterval = setInterval(async () => {
    allUsersRankData = await api.getAllUsersData();
    putRankData(allUsersRankData);
  }, 10000)
}

rankAutoRefreshBtn.addEventListener('click', () => {
  console.log('clicked');

  if (rankAutoRefreshIcon.classList.contains('spinner')) {
    rankAutoRefreshBtn.style.backgroundColor = 'rgb(83, 38, 38)';
    rankAutoRefreshBtn.style.border = 'rgb(134, 5, 5) solid';
    rankAutoRefreshIcon.style.right = `5px`;
    rankAutoRefreshIcon.classList.remove('spinner');
    clearInterval(getUsersDataInterval);
  } else {
    activeAutoRefrshBtn();
  }
})
activeAutoRefrshBtn();

function activeAutoRefrshBtn() {
  rankAutoRefreshBtn.style.backgroundColor = 'rgb(38, 83, 42)';
  rankAutoRefreshBtn.style.border = 'rgb(9, 134, 5) solid';
  rankAutoRefreshIcon.style.right = `calc(50%)`;
  rankAutoRefreshIcon.classList.add('spinner');

  getUsersDataIntervalfunction();
}

const leftPositionPic = document.querySelector('#rankLeftPlace .profilePic');
const leftPositionName = document.querySelector('#rankLeftPlace #rankUserName');
const leftPositionCocs = document.querySelector('#rankLeftPlace #rankCocsNo');
const middlePositionPic = document.querySelector('#rankMiddlePlace .profilePic');
const middlePositionName = document.querySelector('#rankMiddlePlace #rankUserName');
const middlePositionCocs = document.querySelector('#rankMiddlePlace #rankCocsNo');
const rightPositionPic = document.querySelector('#rankRightPlace .profilePic');
const rightPositionName = document.querySelector('#rankRightPlace #rankUserName');
const rightPositionCocs = document.querySelector('#rankRightPlace #rankCocsNo');
const rankleftNo = document.getElementById('rankLeftNo');
const rankRightNo = document.getElementById('rankRightNo');
const leftPositionColor = document.querySelector('#topThree>#rankLeftPlace .rankDetails>div:first-child');
const leftPositionBorder = document.querySelector('#rankLeftPlace .rankProfile>div:first-child');
const rightPositionColor = document.querySelector('#topThree>#rankRightPlace .rankDetails>div:first-child');
const rightPositionBorder = document.querySelector('#rankRightPlace .rankProfile>div:first-child');

const rankedUsersContainer = document.getElementsByClassName('rankUsers')[0];



function putRankData(usersRankData) {

  usersRankData.sort((a, b) => a.rank - b.rank);

  middlePositionPic.setAttribute('class', `icon-user profilePic`)
  middlePositionName.innerHTML = 'unranked';
  middlePositionCocs.innerHTML = ``;
  leftPositionPic.setAttribute('class', `icon-user profilePic`)
  leftPositionName.innerHTML = 'unranked';
  leftPositionCocs.innerHTML = ``;
  rightPositionPic.setAttribute('class', `icon-user profilePic`)
  rightPositionName.innerHTML = 'unranked';
  rightPositionCocs.innerHTML = ``;

  let rankedUsers = '';

  let firstPlaceData, secondPlaceData, thirdPlaceData;

  resetTop3Colors();
  usersRankData.forEach((v, i) => {

    if (!firstPlaceData && v.cocs >= 50) {
      // first place
      middlePositionPic.setAttribute('class', `icon-${usersRankData[i].gender == 'f' ? 'user2' : 'user1'} profilePic`)
      middlePositionName.innerHTML = usersRankData[i].userName;
      middlePositionCocs.innerHTML = `${usersRankData[i].cocs} COCs`;
      firstPlaceData = true;
    } else if (!secondPlaceData && v.cocs >= 50) {

      // second place
      leftPositionPic.setAttribute('class', `icon-${usersRankData[i].gender == 'f' ? 'user2' : 'user1'} profilePic`)
      leftPositionName.innerHTML = usersRankData[i].userName;
      leftPositionCocs.innerHTML = `${usersRankData[i].cocs} COCs`;
      rankleftNo.innerHTML = `${v.rank}`;
      secondPlaceData = true;

      if (v.rank == '1') {
        leftPositionColor.style.cssText = 'background: linear-gradient(to right, rgb(192, 164, 6), rgb(209, 198, 133), gold);';
        leftPositionBorder.style.cssText = 'border: gold solid;';
        leftPositionCocs.style.cssText = 'color: gold;';
        rankleftNo.style.cssText = 'color: gold;';
      }
    } else if (!thirdPlaceData && v.cocs >= 50) {
      console.log(v);

      // third place
      rightPositionPic.setAttribute('class', `icon-${usersRankData[i].gender == 'f' ? 'user2' : 'user1'} profilePic`)
      rightPositionName.innerHTML = usersRankData[i].userName;
      rightPositionCocs.innerHTML = `${usersRankData[i].cocs} COCs`;
      rankRightNo.innerHTML = `${usersRankData[i].rank}`;
      thirdPlaceData = true;

      if (v.rank == '1') {
        rightPositionColor.style.cssText = 'background: linear-gradient(to right, rgb(192, 164, 6), rgb(209, 198, 133), gold);';
        rightPositionBorder.style.cssText = 'border: gold solid;';
        rightPositionCocs.style.cssText = 'color: gold;';
        rankRightNo.style.cssText = 'color: gold;';
      } else if (v.rank == '2') {
        rightPositionColor.style.cssText = 'background: linear-gradient(to right, rgb(138, 138, 138), rgb(255, 255, 255), silver);';
        rightPositionBorder.style.cssText = 'border: silver solid;';
        rightPositionCocs.style.cssText = 'color: silver;';
        rankRightNo.style.cssText = 'color: silver;';
      }
    } else {
      rankedUsers += text.dom.rankedUsersDom(v);

    }
  })
  rankedUsersContainer.innerHTML = rankedUsers;
}

function resetTop3Colors() {
  leftPositionColor.style.cssText = 'background: linear-gradient(to right, rgb(138, 138, 138), rgb(255, 255, 255), silver);';
  leftPositionBorder.style.cssText = 'border: silver solid;';
  leftPositionCocs.style.cssText = 'color: silver;';
  rankleftNo.style.cssText = 'color: silver;';
  rightPositionColor.style.cssText = 'background: linear-gradient(to right, rgb(109, 77, 17), rgb(124, 83, 7), rgb(228, 169, 59));';
  rightPositionBorder.style.cssText = 'border: rgb(168, 116, 20) solid;';
  rightPositionCocs.style.cssText = 'color: rgb(168, 116, 20);';
  rankRightNo.style.cssText = 'color: rgb(168, 116, 20);';
}