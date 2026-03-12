import { text } from "./text.js";
import { createAD } from "./index.js";

export const apiURL = "https://script.google.com/macros/s/AKfycbwFBGJOmxqxDW8v3V4mKMuMWSRVjTs7QHYBGGXkEwa_CnTqC43DJwEVdwxLRFB-2vad/exec";

let rawdata;
export async function fetchData(target) {
  try {
    const res = await fetch(`${apiURL}?page=${target}`);
    rawdata = await res.json();
    return rawdata;
  } catch (err) {
    console.error("error on getting data:");
    createAD(text.activitysFailed);

    return rawdata = 'error';
  }
}
export let newData;

export async function getData(target) {
  try {
    await fetchData(target);
    //console.log(rawdata);

    function organiseData() {
      let tempData;
      newData = {}; // the data

      rawdata.forEach((v) => {
        tempData = (v.activityDate).toString();

        if (!newData[tempData]) {

          newData[tempData] = [];
        }
        newData[tempData].push(v);
      })
    };
    organiseData();

    //console.log(newData);

    return newData;

  } catch (err) {
    //console.log('no data to deal with');
    Array.from(document.getElementsByClassName('notice')).forEach((v, i) => {
      document.getElementsByClassName('notice')[i].style.display = 'flex';
    })
    newData = [];
  }
  //console.log(newData);
}


// profile data
export let emailData;
export async function getAccountData(page, target) {
  try {
    const res = await fetch(`${apiURL}?page=${page}&email=${target}`);
    emailData = await res.json();

    //console.log(emailData);
    return emailData;
  } catch (err) {
    console.error("erro on getting data:");
  }
}

export async function postAccountData(enteredData) {

  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(enteredData)
    })
    const res = await response.json();
    //console.log(res);

    return res;
  } catch (err) {
    console.log(err);

  }
}

export async function getSpecificData(page, target, data) {
  try {
    const res = await fetch(`${apiURL}?page=${page}&searchKey=${target}&searchValue=${data}`);
    let getSpecificData = await res.json();

    // console.log(getSpecificData);
    return getSpecificData;
  } catch (err) {
    return console.error("erro on getting data:");
  }
}

export async function updateSpecificData(page, target, data, dataToAdd) {
  const dataToUpdate = {
    page: `${page}`,
    action: 'update',
    searchKey: `${target}`,
    searchValue: `${data}`,
    data: dataToAdd
  }
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(dataToUpdate)
    })
    const res = await response.json();
    //console.log(res);

    return res;
  } catch (err) {
    console.log(err);

  }
}
export async function addSpecificData(page, data){
  const toAPI = {
    page: page,
    action: 'add',
    data: data
  }
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(toAPI)
    })
    const res = await response.json();
    //console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}