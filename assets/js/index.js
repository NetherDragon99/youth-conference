import { getData, newData } from "./api.js";
import { getCurrentDate, getTimeProgress } from "./timing.js";

const todayActivity = document.querySelector("#todayActivity");

const scrollFunction = () => {
  todayActivity.addEventListener("wheel", (x) => {
    x.preventDefault();
    todayActivity.scrollBy({
      left: x.deltaY,
      behavior: "smooth",
    })
  }, { passive: false });
  
  window.addEventListener('load', () => {
    autoScroll();
  })
  todayActivity.addEventListener("mouseleave", () => { autoScroll() })
  todayActivity.addEventListener("touchend", () => { autoScroll() })
}
function autoScroll() {
  const activeTask = document.querySelector(".activeTask");
    setTimeout(() => {
      if (activeTask) {
        activeTask.scrollIntoView({
          inline: "center",
          behavior: "smooth"
        });
      }
    }, 1000)
  }

let htmlActivitys = '';
const putData = (data) => {
  let tempDate = getCurrentDate();
  let activitys = data[tempDate];
  console.log(activitys, tempDate);
  activitys.forEach(act => {
    htmlActivitys += `
    <div class="${act}">
      <div class="activityDataContainer">
        <div><span class="icon-pause activityIcon"></span></div>
        <div class="activityInfo">
          <h3 id="activityState">الفقرة الحالية</h3>
          <h2 id="activityTitle">${act.activityName}</h2>
          <p id="activityTiming">من ${act.startingTime} الى ${act.endingTime}</p>
          <p id="activityPlace">${act.activityPlace}</p>
        </div>
      </div>
      <div class="currentActivityProgress"><div style="width: ${getTimeProgress(act.startingTime, act.endingTime)}%"></div></div>
    </div>
    `
  });
}
const setCurrentActivity = (data) => {
  let currentTime = new Date().getTime();
  const currentData = data[getCurrentDate()];
  console.log(data);
  console.log(currentData);



  currentData.forEach((v, i) => {
    console.log(v.startingTime);
    const tempstart = new Date(`${getCurrentDate()} ${v.startingTime}`).getTime();
    const tempend = new Date(`${getCurrentDate()} ${v.endingTime}`).getTime();
    console.log(tempstart, tempend);

    if (tempstart <= currentTime && currentTime <= tempend) {
      console.log('pass here');

      const activediv = document.querySelector(`#todayActivity>div:nth-child(${i + 1}`)
      if (activediv) {
        activediv.classList.add("activeTask")
      }
      console.log(activediv);

    } else {
      console.log('not pass here', currentTime);
    }
  })
}

async function todaysActivity() {
  await getData('conferenceActivitys');
  console.log(newData);
  await putData(newData)
  document.querySelector("#todayActivity").innerHTML = htmlActivitys;
  //console.log(htmlActivitys);
  await setCurrentActivity(newData);
  autoScroll()
  scrollFunction();
}
todaysActivity();