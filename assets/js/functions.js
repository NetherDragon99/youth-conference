import { getCurrentDate, getTimeProgress, cleanTime } from "./timing.js";


//scroll
let userScroll = 0;
setInterval(() => {
  if (userScroll > 0) {
    userScroll -= 1;
  } else if (userScroll == 0) {
    setTimeout(() => {
      autoScroll();
    }, 3000)
  }
}, 1000)
export const scrollFunction = () => {
  const todayActivity = document.querySelector("#todayActivity");

  todayActivity.addEventListener("wheel", (x) => {
    x.preventDefault();
    todayActivity.scrollBy({
      left: x.deltaY,
      behavior: "smooth",
    })
    userScroll = 5;
  }, { passive: false });

  window.addEventListener('load', () => {
    autoScroll();
  })
  todayActivity.addEventListener("mousemove", () => { autoScroll(); userScroll = 5; })
  todayActivity.addEventListener("touchmove", () => { autoScroll(); userScroll = 5; })
}
export const autoScroll = () => {
  const activeTask = document.querySelector(".activeTask");
  if (activeTask && userScroll <= 0) {
    activeTask.scrollIntoView({
      inline: "center",
      behavior: "smooth"
    });
  }
}

// put the data on the page depends on the today activitys
export let htmlActivitys = '';
export const putData = (data) => {

  let tempDate = getCurrentDate();
  let activitys = data[tempDate];
  let tempEndingTime, tempStartingTime;

  //console.log(activitys, tempDate);
  try{
    activitys.forEach(act => {
    tempStartingTime = cleanTime(act.startingTime.toString());
    tempEndingTime = cleanTime(act.endingTime.toString());

    htmlActivitys += `
    <div class="${(act.activityDate).toString()}">
      <div class="activityDataContainer">
        <div><span class="icon-pause activityIcon"></span></div>
        <div class="activityInfo">
          <h3 id="activityState">الفقرة الحالية</h3>
          <h2 id="activityTitle">${((act.activityName).toString())}</h2>
          <p id="activityTiming">من ${tempStartingTime} الى ${tempEndingTime}</p>
          <p id="activityPlace">${(act.activityPlace).toString()}</p>
        </div>
      </div>
      <div class="currentActivityProgress"><div style="width: ${getTimeProgress((act.startingTime).toString(), (act.endingTime).toString())}%"></div></div>
    </div>
    `
    // console.log(act.activityDate);
  });
}catch(err){
  console.log(err);
  htmlActivitys = '';
}
  document.querySelector("#todayActivity").innerHTML = htmlActivitys;

  setCurrentActivity(data);
}

// detect the current active activity and select it to work with
export const setCurrentActivity = (data) => {
  let currentTime = new Date().getTime();
  const currentData = data[getCurrentDate()];
  //console.log(data);
  //console.log(currentData);

  //remove all play and add pause icon
  document.querySelectorAll(".activityIcon").forEach(span => span.classList.remove("icon-play"))
  document.querySelectorAll(".activityIcon").forEach(span => span.classList.add("icon-pause"))


  if (currentData) {
    currentData.forEach((v, i) => {

    if (document.querySelector(`#todayActivity>div:nth-child(${i + 1}) .currentActivityProgress > div`).style.width = "100%") {
      document.querySelector(`#todayActivity>div:nth-child(${i + 1})`).classList.remove("activeTask");
    }

    const tempstart = new Date(`${getCurrentDate()} ${v.startingTime}`).getTime();
    const tempend = new Date(`${getCurrentDate()} ${v.endingTime}`).getTime();
    const activediv = document.querySelector(`#todayActivity>div:nth-child(${i + 1})`)

    document.querySelector(`#todayActivity>div:nth-child(${i + 1}) .currentActivityProgress > div`).style.width = `${getTimeProgress((v.startingTime).toString(), (v.endingTime).toString())}%`

    //console.log(document.querySelector(`#todayActivity>div:nth-child(${i + 1}) .currentActivityProgress > div`).style.width);



    if (tempstart <= currentTime && currentTime <= tempend) {

      if (activediv) {
        activediv.classList.add("activeTask")
        document.querySelector('.activeTask span').classList.remove("icon-pause");
        document.querySelector('.activeTask span').classList.add("icon-play");
      }
      //console.log(activediv);

    } else if (activediv) {

      //console.log('not pass here', currentTime);
    }
  })
  }
  autoScroll();
}

// auto refreshing activities
export const autoRefresh = (data) => {
  setInterval(() => {
    setCurrentActivity(data);
    activitySession();
  }, 5000)
}

export const activitySession = () => {
  let activitiesLength = document.querySelectorAll("#todayActivity>div").length;
  let activeItemIndex, temp1;

  Array.from(document.getElementById('todayActivity').children).forEach((v, i) => {
    if (v.classList.contains('activeTask')) {
      activeItemIndex = i;
    }
  })

  if (activeItemIndex) {
    Array.from(document.getElementById('todayActivity').children).forEach((v, i) => {

      if (i < activeItemIndex) {
        document.querySelector(`#todayActivity>div:nth-child(${i + 1}) #activityState`).innerHTML = 'فقرة سابقة';
      } else if (i == activeItemIndex) {
        document.querySelector(`#todayActivity>div:nth-child(${i + 1}) #activityState`).innerHTML = 'الفقرة الحالية';
      } else if (i > activeItemIndex && i <= (activitiesLength + 1)) {
        document.querySelector(`#todayActivity>div:nth-child(${i + 1}) #activityState`).innerHTML = 'فقرة قادمة';
      }
    })
  }
}
