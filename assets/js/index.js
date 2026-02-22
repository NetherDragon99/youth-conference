import { getData ,newData} from "./api.js";


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
todayActivity.addEventListener("mouseleave", () => {autoScroll()})
todayActivity.addEventListener("touchend", () => {autoScroll()})

function autoScroll(){
  setTimeout(()=>{
    if (activeTask) {
    activeTask.scrollIntoView({
      inline: "center",
      behavior: "smooth"
    });
  }
  },1000)
}
async function gettingData() {
  await getData('conferenceActivitys');
  console.log(newData);

  
}
gettingData();
