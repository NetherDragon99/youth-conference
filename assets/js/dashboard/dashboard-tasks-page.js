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



const title = document.getElementById('createTaskTitle');
const description = document.getElementById('createTaskDes');
const date = document.getElementById('dateF');
const timeStateBtn = document.getElementById('timerButton');
const startTime = document.querySelector('#startTime>input');
const endTime = document.querySelector('#endTime>input');
const actionStateBtn = document.getElementById('actionBtnLink');
const actionName = document.querySelector('#actionBtnBody>#btnName>input');
const actionLink = document.querySelector('#actionBtnBody>#btnLink>input');


document.getElementById('confirmTask').addEventListener('click', async () => {
  let taskData = getTaskData();
  try {
    if (taskData) {
      if (document.getElementById('makeTask').dataset.type === 'create') {
        const result = await api.addSpecificData('tasks', taskData);
        result ? dashboard.createAD(text.text.taskMakeDone, 'green') : dashboard.createAD(text.text.taskMakeError);

        clearTaskForm();
        functionSaftyCheacker();
        return


      } else if (document.getElementById('makeTask').dataset.type === 'edit') {
        taskData = getTaskData(document.getElementById('makeTask').dataset.id);
        const result = await api.updateSpecificData('tasks', 'id', taskData.id, taskData);
        result ? dashboard.createAD(text.text.taskMakeDone, 'green') : dashboard.createAD(text.text.taskMakeError);
        console.log(result, taskData);

        clearTaskForm();
        functionSaftyCheacker();
        return
      }
      dashboard.createAD('حصلت مشكلة')
    }
  } catch (error) {
    console.log(error);
    dashboard.createAD(text.text.taskMakeError)
  }
});

let waiting = 0;
document.getElementById('cancelTask').addEventListener('click', () => {
  if (waiting === 1) {
    clearTaskForm();
  } else {
    waiting = 1;
    dashboard.createAD(text.text["confirm-cancel-task"], 'green');
  }
  setTimeout(() => {
    waiting = 0;
  }, 5000)
})

function clearTaskForm() {
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
}

startTime.value = '00:00:00';
endTime.value = '23:59:59';
date.value = (time.getCurrentDate()).replaceAll('/', '-')



actionStateBtn.addEventListener('click', () => {
  actionStateBtn.getAttribute('data-state') === 'active' ? actionStateBtn.setAttribute('data-state', 'disactive') : actionStateBtn.setAttribute('data-state', 'active')

})

timeStateBtn.addEventListener('click', () => {
  timeStateBtn.getAttribute('data-state') === 'active' ? timeStateBtn.setAttribute('data-state', 'disactive') : timeStateBtn.setAttribute('data-state', 'active')

})

function getTaskData(id) {
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
      taskData.buttonLink = actionLink.value;
    } else {
      taskData.buttonName = '';
      taskData.buttonLink = '';
    }

    // console.log('all done', taskData);
    taskData.id = id ? id : `tsk${((Math.random()) * 1000000).toFixed(0)}`;

    return taskData;
  } catch (error) {
    dashboard.createAD(error.message)
    console.error(error)
  }
}


function arrangeTasks(oldTasks) {
  let newTasksList = [];
  oldTasks.forEach(currentTask => {

    // add task if empty
    if (newTasksList.length === 0) {
      newTasksList.push({ [currentTask.activityDate]: [currentTask] })
    } else {
      // if not empty
      let currentCategoryDate = newTasksList.find(task => typeof task === 'object' && task !== null && currentTask.activityDate in task);

      // if category found
      if (currentCategoryDate) {
        let valueIndex = currentCategoryDate[currentTask.activityDate].findIndex(v => {
          return new Date(`${currentTask.activityDate.replaceAll('/', '-')} ${currentTask.startingTime}`).getTime() < new Date(`${v.activityDate} ${v.startingTime}`).getTime()
        })

        // add value organized by date
        if (valueIndex === -1) {
          currentCategoryDate[currentTask.activityDate].push(currentTask)
        } else {
          currentCategoryDate[currentTask.activityDate].splice(valueIndex, 0, currentTask)
        }
      } else {
        // if category not found
        let categoryIndex = newTasksList.findIndex(value => {
          return new Date(Object.keys(value)[0]).getTime() > new Date(currentTask.activityDate).getTime();
        })

        if (categoryIndex === -1) {
          newTasksList.push({ [currentTask.activityDate]: [currentTask] })
        } else {
          newTasksList.splice(categoryIndex, 0, { [currentTask.activityDate]: [currentTask] })
        }
      }

    }
  });
  return newTasksList;
}


// tasks history

// open category function

function openTaskCategory() {
  const adayTasksDate = document.querySelectorAll('#tasksHistoryContainer>.adayTasks>.adayTaskDate');

  adayTasksDate.forEach(category => {

    category.addEventListener('click', () => {
      const adayTasks = category.closest('.adayTasks');

      if (adayTasks.dataset.state === 'opened') {
        adayTasks.style.maxHeight = 'calc(1rem + 20px)';
        adayTasks.dataset.state = 'closed'
      } else {
        adayTasks.style.maxHeight = '50000px';
        adayTasks.dataset.state = 'opened'
      }
    })
  })
}

// open users list function

function openUsersList() {
  const tasksSummary = document.querySelectorAll('#tasksHistoryContainer .taskSummary');

  tasksSummary.forEach(allTasks => {
    allTasks.addEventListener('click', clickedTask => {
      const tasksListContainer = clickedTask.target.closest('.task').querySelector('.tasksUsersList');

      if (tasksListContainer.dataset.state === 'opened') {
        tasksListContainer.style.maxHeight = '0px';
        tasksListContainer.style.overflow = 'hidden';
        tasksListContainer.dataset.state = 'closed'
      } else {
        tasksListContainer.style.maxHeight = '500px';
        tasksListContainer.style.overflow = 'scroll';
        tasksListContainer.dataset.state = 'opened';
      }
    })
  })
}


// adding data

let apiTasks, tasks, apiUsers;

let apiUsersTask = await api.getData('profileTask');

const taskHistoryContainer = document.getElementById('tasksHistoryContainer')

async function getData() {
  apiTasks = await api.getData('tasks');
  tasks = arrangeTasks(apiTasks);
  apiUsers = await api.getData('accounts');
  apiUsersTask = await api.getData('profileTask');
  // console.log(tasks);

}
async function functionSaftyCheacker() {
  await getData();

  let allUsers = [];
  apiUsers.forEach(user => {
    allUsers.push(user.email)
  })

  let tasksUser = [];
  apiUsersTask.forEach(user => {
    tasksUser.push(user.email);
  })

  for (const user of allUsers) {
    if (!tasksUser.includes(user)) {
      let emailapi = await api.addSpecificData('profileTask', { email: [user] })
      console.log(user, emailapi);
    }
  }
  prepareFinalTasks();
  editTasks();
  deleteTasks();
  markTaskforUsers();
}


function prepareTasks(categoryDate) {
  let finalDom = '';
  const current = tasks.find(obj => categoryDate in obj)

  current[categoryDate].forEach(task => {
    // console.log(task);
    finalDom += `${text.dom.tasks(task.id, task.title, task.description, task.startingTime, prepareUsersDOM(task.id))}`
  })
  return finalDom;
}

function prepareFinalTasks(users) {
  let finalDom = '';

  tasks.forEach(task => {
    // console.log((Object.keys(task)).toString());

    finalDom += `${text.dom.taskContainer(time.dayNameDate((Object.keys(task)).toString()), prepareTasks((Object.keys(task)).toString()))}`
  })
  taskHistoryContainer.innerHTML = finalDom;
  // console.log(finalDom);
  openTaskCategory();
  openUsersList();
}

function prepareUsersDOM(id) {
  let finalDom = ''

  let doneTasks = []
  apiUsers.forEach(v => {
    doneTasks.push({ [v.email]: 'no' })
  })
  // console.log(doneTasks);

  apiUsersTask.forEach(userTask => {
    // console.log(doneTasks.find(val => userTask.email in val));

    userTask[id] === 'ok' ? doneTasks.find(val => userTask.email in val)[userTask.email] = 'ok' : null;
    // console.log(userTask[id], doneTasks);

  })

  function userState(email) {
    if (doneTasks.find(allEmails => email in allEmails)[email] === 'ok') {
      return 'ok'
    } else {
      return 'no'
    }
  }

  apiUsers.forEach(v => {
    finalDom += text.dom.taskUsers(v.userName, v.email, v.gender, v.profilePicture, userState(v.email), id);
    // console.log(userState[v.email]);

  })

  return finalDom
}

functionSaftyCheacker()


// edit tasks
function editTasks() {
  const editBtn = document.querySelectorAll('.taskActionBtn .editTaskBtn');

  let data;
  editBtn.forEach(btn => btn.addEventListener('click', click => {
    if (waiting === 1) {
      let clickId = click.target.closest('.task').dataset.id;
      data = idTaskData(clickId);
      document.getElementById('makeTask').dataset.id = clickId;
      console.log(clickId);

      editTaskData(data);
    } else {
      waiting = 1;
      dashboard.createAD(text.text["confirm-cancel-task"], 'green');
    }
    setTimeout(() => {
      waiting = 0;
    }, 5000)
  }))
}

// get task data by id
function idTaskData(tskId) {
  let finalData;
  let data = tasks.forEach((task, index1) => {
    let date = Object.keys(task)[0]

    const search = task[date].find(tskData => tskData.id === tskId);
    search ? finalData = search : null;
  })
  return finalData;
}

// replace data
function editTaskData(data) {
  document.querySelector('#createTaskHeader>h2').innerHTML = 'تعديل مهمة';
  document.querySelector('#createTaskHeader>div').classList.add('icon-edit');
  document.querySelector('#createTaskHeader>div').classList.remove('icon-task');
  createTaskDiv.dataset.type = 'edit';

  title.value = data.title;
  description.value = data.description;
  date.value = (data.activityDate.replaceAll('/', '-'));
  timeStateBtn.dataset.state = `${data.endingTime === '23:59:59' || data.startTime === '24:00:00' ? 'disactive' : 'active'}`;
  startTime.value = time.suitableTime(data.activityDate, data.startingTime);
  endTime.value = time.suitableTime(data.activityDate, data.endingTime);
  actionStateBtn.dataset.state = `${data.buttonName !== '' ? 'active' : 'disactive'}`;
  actionName.value = data.buttonName;
  actionLink.value = data.buttonLink;

  createTaskDiv.style.minHeight = 'calc(100dvh - 160px)';
  createTaskDiv.style.overflow = 'scroll';

  document.getElementById('dashboard-tasks-page').scrollTo({
    top: 0,
    behavior: "smooth"
  })
}

// delete task
function deleteTasks() {
  const deleteBtn = document.querySelectorAll('.taskActionBtn .deleteTaskBtn');

  deleteBtn.forEach(btn => btn.addEventListener('click', async (click) => {
    let clickId = click.target.closest('.task').dataset.id;
    console.log(clickId);

    let confirmAction = confirm('متاكد انك عاوز تمسح التاسك؟؟')

    if (confirmAction) {
      let deleteData = await api.deleteSpecificData('tasks', 'id', clickId);

      if ((deleteData.result).includes('Error')) {
        console.log(deleteData);
        dashboard.createAD('حصلت مشكلة')
      } else {
        dashboard.createAD(text.text.taskMakeDone, 'green')
        functionSaftyCheacker();
      }
    }
  }))
}



// mark users task as done or incompleted
function markTaskforUsers() {
  let allBtns = document.querySelectorAll('.tasksUsersList .taskUser .userTaskBtn')

  allBtns.forEach(btn => btn.addEventListener('click', async (click) => {
    let tskId = (click.target.closest('.taskUser')).dataset.tskid;
    let email = (click.target.closest('.taskUser')).dataset.email;
    let state = (click.target.closest('.taskUser')).dataset.state;
    let btnIcon = document.querySelector(`.taskUser[data-email="${email}"][data-tskid="${tskId}"] .userTaskBtn div`);
    let userState = document.querySelector(`.taskUser[data-email="${email}"][data-tskid="${tskId}"]`);


    if (state === 'unfinished') {
      await api.updateSpecificData('profileTask', 'email', email, { [tskId]: 'ok' })

      btnIcon.classList.add('icon-clear');
      btnIcon.classList.remove('icon-checkmark');
      userState.dataset.state = 'finished'

      dashboard.createAD(text.text.taskMakeDone, 'green')
    } else {
      await api.updateSpecificData('profileTask', 'email', email, { [tskId]: '' })

      btnIcon.classList.add('icon-checkmark');
      btnIcon.classList.remove('icon-clear');
      userState.dataset.state = 'unfinished'

      dashboard.createAD(text.text.taskMakeDone, 'green')
    }

  }))
}