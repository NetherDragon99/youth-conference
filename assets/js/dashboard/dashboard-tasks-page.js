import * as api from "./dashboard-api.js";
import * as dashboard from './dashboard.js';
import * as time from '../timing.js';

let createTaskHeadder = document.getElementById('createTaskHeader');
let createTaskDiv = document.getElementById('createTask');

createTaskHeadder.addEventListener('click', () => {
  if (createTaskDiv.getBoundingClientRect().height > 90) {
    createTaskDiv.style.minHeight = '90px';
    createTaskDiv.style.overflow = 'hidden';

  } else {
    createTaskDiv.style.minHeight = 'calc(100dvh - 160px)';
    createTaskDiv.style.overflow = 'scroll';
  }
})

// const apiTasks = await api.getData('tasks');
const apiTasks = [
  {
    "activityDate": "2026/06/06",
    "title": "الفقرة رقم 1",
    "description": "المكان رقم 1",
    "startingTime": "00:00:00",
    "endingTime": "24:00:00",
    "type": "inprogress",
    "buttonName": "hello",
    "buttonLink": "",
    "notification": "",
    "id": "tsk123456"
  },
  {
    "activityDate": "2026/06/07",
    "title": "الفقرة رقم 2",
    "description": "المكان رقم 2",
    "startingTime": "01:00:00",
    "endingTime": "24:00:00",
    "type": "limitedTime",
    "buttonName": "",
    "buttonLink": "",
    "notification": "",
    "id": "tsk123457"
  },
  {
    "activityDate": "2026/06/06",
    "title": "الفقرة رقم 3",
    "description": "المكان رقم 3",
    "startingTime": "02:00:00",
    "endingTime": "24:00:00",
    "type": "inprogress",
    "buttonName": "",
    "buttonLink": "",
    "notification": "",
    "id": "tsk123458"
  },
  {
    "activityDate": "2026/06/08",
    "title": "الفقرة رقم 4",
    "description": "المكان رقم 4",
    "startingTime": "03:00:00",
    "endingTime": "24:00:00",
    "type": "inprogress",
    "buttonName": "",
    "buttonLink": "",
    "notification": "",
    "id": "tsk123459"
  },
  {
    "activityDate": "2026/06/07",
    "title": "الفقرة رقم 5",
    "description": "المكان رقم 5",
    "startingTime": "04:00:00",
    "endingTime": "15:00:00",
    "type": "limitedTime",
    "buttonName": "hello",
    "buttonLink": "",
    "notification": "yes",
    "id": "tsk123460"
  }
]
console.log(apiTasks);



const title = document.getElementById('createTaskTitle');
const description = document.getElementById('createTaskDes');
const date = document.getElementById('dateF');
const timeStateBtn = document.getElementById('timerButton');
const startTime = document.querySelector('#startTime>input');
const endTime = document.querySelector('#endTime>input');
const actionStateBtn = document.getElementById('actionBtnLink');
const actionName = document.querySelector('#actionBtnBody>#btnName>input');
const actionLink = document.querySelector('#actionBtnBody>#btnLink>input');

document.getElementById('confirmTask').addEventListener('click', ()=>{
  let taskData = getTaskData();
  try {
    if (taskData) {
      api.addSpecificData('tasks', taskData)
    }
  } catch (error) {
    console.log(error);
    dashboard.createAD('للاسف حصلت مشكلة والتاسك متنفذش')
  }
});

startTime.value = '00:00:00';
endTime.value = '23:59:59';
date.value = (time.getCurrentDate()).replaceAll('/', '-')



actionStateBtn.addEventListener('click',()=>{
  actionStateBtn.getAttribute('data-state') === 'active'?actionStateBtn.setAttribute('data-state', 'disactive'):actionStateBtn.setAttribute('data-state', 'active')
  
})

timeStateBtn.addEventListener('click',()=>{
  timeStateBtn.getAttribute('data-state') === 'active'?timeStateBtn.setAttribute('data-state', 'disactive'):timeStateBtn.setAttribute('data-state', 'active')
  
})

function getTaskData() {
  let taskData = {};

  try {
    if (title.value !== '') {
      taskData.title = title.value
    } else {
      throw new Error('العنوان مطلوب')
    }

    if (description.value !== '') {
      taskData.description = description.value
    } else {
      throw new Error('الوصف مطلوب')
    }

    if (date.value !== '') {
      taskData.activityDate = (date.value).replaceAll('-', '/');
    } else {
      throw new Error('التاريخ مطلوب')
    }

    taskData.type = "inprogress";

    if (startTime.value === '') {
        throw new Error("من فضلك حدد وقت البداية");
      } else if (endTime.value === '') {
        throw new Error("من فضلك حدد وقت النهاية");
      }
      taskData.startingTime = startTime.value;
      taskData.endingTime = endTime.value

    if (timeStateBtn.getAttribute('data-state') === 'active') {
      taskData.type = "limitedTime";
    }

    if (actionStateBtn.getAttribute('data-state') === 'active') {
      if (actionName.value === '') {
        throw new Error("من فضلك حدد اسم الزر");
      } else if (actionLink.value === '') {
        throw new Error("من فضلك حدد لينك الزر");
      }
      taskData.buttonName = actionName.value;
      taskData.buttonLink = actionLink.value
    }

    console.log('all done', taskData);
    taskData.id = `tsk${((Math.random()) * 1000000).toFixed(0)}`

    return taskData;
  } catch (error) {
    dashboard.createAD(error.message)
    console.error(error)
  }
}

function arrangeTasks(oldTasks) {
  let newTasksList = [];
  oldTasks.forEach((v) => {

    let currentTask = newTasksList.find(task => typeof task === 'object' && task !== null && v.activityDate in task);

    if (currentTask) {
      currentTask[v.activityDate].push(v);

    } else {
      if (newTasksList.length === 0) {
        newTasksList.push({ [v.activityDate]: [v] });

      } else {
        let currentValueDate = new Date(v.activityDate).getTime();

        let tempIndex = newTasksList.findIndex(value => {
          let tempV = Object.keys(value)[0];
          return currentValueDate < new Date(tempV).getTime();
        })
        console.log(tempIndex);
        if (tempIndex === -1) {
          newTasksList.push({ [v.activityDate]: [v] })
        } else {
          newTasksList.splice(tempIndex, 0, { [v.activityDate]: [v] })
        }
      }
    }
  })
  return newTasksList;
}

