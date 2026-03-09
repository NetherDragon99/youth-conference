import { text } from "./text.js";
import { createAD } from "./index.js";

export const apiURL = "https://script.google.com/macros/s/AKfycbyg42i1HzKbeoSxwwl9Qh4wGRg7IsJcLxD4StjPJEaIcgcLRI531X1YE4zktov5EHuW/exec";

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
    await organiseData();

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
