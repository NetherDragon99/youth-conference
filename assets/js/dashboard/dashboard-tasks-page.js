import * as api from "./dashboard-api.js";
import * as dashboard from './dashboard.js';
import * as time from '../timing.js';
import * as text from '../text.js';

let createTaskHeadder = document.getElementById('createTaskHeader');
let createTaskDiv = document.getElementById('makeTask');

createTaskHeadder.addEventListener('click', () => {
  if (createTaskDiv.getBoundingClientRect().height > 90) {
    createTaskDiv.style.minHeight = '90px';
    createTaskDiv.style.overflow = 'hidden';
    createTaskDiv.scrollTo({
      top: 0,
      behavior: "smooth"
    })
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
    "startingTime": "05:00:00",
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
    "startingTime": "06:00:00",
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


document.getElementById('confirmTask').addEventListener('click', () => {
  let taskData = getTaskData();
  try {
    if (taskData) {
      document.getElementById('createTaskContainer') ? api.addSpecificData('tasks', taskData) : null;
    }
  } catch (error) {
    console.log(error);
    dashboard.createAD('للاسف حصلت مشكلة والتاسك متنفذش')
  }
});

let waiting = 0;
document.getElementById('cancelTask').addEventListener('click', () => {
  if (waiting === 1) {
    document.querySelector('#createTaskHeader>h2').innerHTML = 'انشاء مهمة جديدة';
    document.querySelector('#createTaskHeader>div').classList.add('icon-task');
    document.querySelector('#createTaskHeader>div').classList.remove('icon-edit');
    createTaskDiv.dataset.type = 'create';

    title.value = '';
    description.value = '';
    date.value = time.getCurrentDate().replaceAll('/', '-');
    timeStateBtn.dataset.state = 'disactive';
    startTime.value = '00:00:00';
    endTime.value = '23:59:59';
    actionStateBtn.dataset.state = 'disactive';
    actionName.value = '';
    actionLink.value = '';

    createTaskDiv.style.minHeight = '90px';
    createTaskDiv.style.overflow = 'hidden';

    createTaskDiv.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  } else {
    waiting = 1;
    dashboard.createAD(text.text["confirm-cancel-task"], 'green');
  }
  setTimeout(() => {
    waiting = 0;
  }, 5000)
})

startTime.value = '00:00:00';
endTime.value = '23:59:59';
date.value = (time.getCurrentDate()).replaceAll('/', '-')



actionStateBtn.addEventListener('click', () => {
  actionStateBtn.getAttribute('data-state') === 'active' ? actionStateBtn.setAttribute('data-state', 'disactive') : actionStateBtn.setAttribute('data-state', 'active')

})

timeStateBtn.addEventListener('click', () => {
  timeStateBtn.getAttribute('data-state') === 'active' ? timeStateBtn.setAttribute('data-state', 'disactive') : timeStateBtn.setAttribute('data-state', 'active')

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

function arrangeTasks(oldTasks){
  let newTasksList = [];
  oldTasks.forEach(currentTask => {

    // add task if empty
    if (newTasksList.length === 0) {
      newTasksList.push({[currentTask.activityDate]: [currentTask]})
    }else{
      // if not empty
      let currentCategoryDate = newTasksList.find(task => typeof task === 'object' && task !== null && currentTask.activityDate in task);
      
      // if category found
      if (currentCategoryDate) {
        let valueIndex = currentCategoryDate[currentTask.activityDate].findIndex(v=>{
          return new Date(`${currentTask.activityDate.replaceAll('/', '-')} ${currentTask.startingTime}`).getTime() < new Date(`${v.activityDate} ${v.startingTime}`).getTime()
        })
        
        // add value organized by date
        if (valueIndex === -1) {
          currentCategoryDate[currentTask.activityDate].push(currentTask)
        }else{
          currentCategoryDate[currentTask.activityDate].splice(valueIndex, 0, currentTask)
        }
      }else{
        // if category not found
        let categoryIndex = newTasksList.findIndex(value=>{
          return new Date(Object.keys(value)[0]).getTime() > new Date(currentTask.activityDate).getTime();
        })

        if (categoryIndex === -1) {
          newTasksList.push({[currentTask.activityDate]: [currentTask]})
        }else{
          newTasksList.splice(categoryIndex, 0, {[currentTask.activityDate]: [currentTask]})
        }
      }

    }
  });
  // console.log(newTasksList);
}

// arrangeTasks(apiTasks)



// tasks history

// open category function
const adayTasksDate = document.querySelectorAll('#tasksHistoryContainer>.adayTasks>.adayTaskDate');

adayTasksDate.forEach(category => {
  
  category.addEventListener('click', ()=>{
    const adayTasks = category.closest('.adayTasks');
    console.log('done');
    if (adayTasks.dataset.state === 'opened') {
      adayTasks.style.maxHeight = 'calc(1rem + 20px)';
      adayTasks.dataset.state = 'closed'
    }else{
      adayTasks.style.maxHeight = '50000px';
      adayTasks.dataset.state = 'opened'
    }
  })
})

// open users list function
const tasksSummary = document.querySelectorAll('#tasksHistoryContainer .taskSummary');

tasksSummary.forEach(allTasks => {
  allTasks.addEventListener('click', clickedTask =>{
    const tasksListContainer = clickedTask.target.closest('.task').querySelector('.tasksUsersList');
    console.log('done', clickedTask, tasksListContainer);

    if (tasksListContainer.dataset.state === 'opened') {
      tasksListContainer.style.maxHeight = '0px';
      tasksListContainer.style.overflow = 'hidden';
      tasksListContainer.dataset.state = 'closed'
    }else{
      tasksListContainer.style.maxHeight = '500px';
      tasksListContainer.style.overflow = 'scroll';
      tasksListContainer.dataset.state = 'opened';
    }
  })
})