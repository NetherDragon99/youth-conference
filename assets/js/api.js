const apiURL = "https://script.google.com/macros/s/AKfycbyx9GYA8Vv3kJ91oZd2ZU4T7U88JFwOgp0HfM3JU8XX_zBPotxsNTmpsvmah735RPq_/exec";

export function displayError(error){
  console.log('error');
}

let rawdata;

export async function fetchData(target) {
    try {
        const res = await fetch(`${apiURL}?page=${target}`);
        rawdata = await res.json();
        return rawdata; // بنرجع الداتا عشان الملف التاني يستلمها
    } catch (err) {
        console.error("فيه غلط حصل:", err);
        return [];
    }
}
export let newData;
export async function getData(target){
  try{
    await fetchData(target);
    console.log(rawdata);
    function organiseData(){
      let tempData;
      newData = {}; // the data

      rawdata.forEach((v) => {
        tempData = v.activityDateDate;
        if (!newData[tempData]) {
          
          newData[tempData] = [];
        }
        newData[tempData].push(v);
      })
      
    };
    
    return organiseData();
    
  }catch(err){
    console.log(err);
  }
}
