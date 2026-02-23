import { getData, newData } from "./api.js";
import { getCurrentDate, getTimeProgress } from "./timing.js";


const todayActivity = document.querySelector("#todayActivity");

todayActivity.addEventListener("wheel", (x) => {
  x.preventDefault();
  todayActivity.scrollBy({
    left: x.deltaY,
    behavior: "smooth",
  })
}, { passive: false });
const activeTask = document.querySelector(".activeTask");
window.addEventListener('load', () => {
  autoScroll();
})
todayActivity.addEventListener("mouseleave", () => { autoScroll() })
todayActivity.addEventListener("touchend", () => { autoScroll() })

function autoScroll() {
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
  console.log(activitys , tempDate);
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
      <div class="currentActivityProgress"><div style="width: 40"></div></div>
    </div>
    `
  });
}

const setCurrentActivity = () => {
  
}

async function todaysActivity() {
  await getData('conferenceActivitys');
  console.log(newData);
  await putData(newData)
  document.querySelector("#todayActivity").innerHTML = htmlActivitys;
  console.log(htmlActivitys);
  
}
todaysActivity();