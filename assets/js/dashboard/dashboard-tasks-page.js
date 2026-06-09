import * as api from "./dashboard-api.js";

const apiTasks = await api.getData('tasks');
// const apiTasks = [
//     {
//         "activityDate": "2026/06/06",
//         "title": "الفقرة رقم 1",
//         "description": "المكان رقم 1",
//         "startingTime": "00:00:00",
//         "endingTime": "24:00:00",
//         "type": "inprogress",
//         "buttonName": "hello",
//         "buttonLink": "",
//         "notification": "",
//         "id": "tsk123456"
//     },
//     {
//         "activityDate": "2026/06/07",
//         "title": "الفقرة رقم 2",
//         "description": "المكان رقم 2",
//         "startingTime": "01:00:00",
//         "endingTime": "24:00:00",
//         "type": "limitedTime",
//         "buttonName": "",
//         "buttonLink": "",
//         "notification": "",
//         "id": "tsk123457"
//     },
//     {
//         "activityDate": "2026/06/06",
//         "title": "الفقرة رقم 3",
//         "description": "المكان رقم 3",
//         "startingTime": "02:00:00",
//         "endingTime": "24:00:00",
//         "type": "inprogress",
//         "buttonName": "",
//         "buttonLink": "",
//         "notification": "",
//         "id": "tsk123458"
//     },
//     {
//         "activityDate": "2026/06/08",
//         "title": "الفقرة رقم 4",
//         "description": "المكان رقم 4",
//         "startingTime": "03:00:00",
//         "endingTime": "24:00:00",
//         "type": "inprogress",
//         "buttonName": "",
//         "buttonLink": "",
//         "notification": "",
//         "id": "tsk123459"
//     },
//     {
//         "activityDate": "2026/06/07",
//         "title": "الفقرة رقم 5",
//         "description": "المكان رقم 5",
//         "startingTime": "04:00:00",
//         "endingTime": "15:00:00",
//         "type": "limitedTime",
//         "buttonName": "hello",
//         "buttonLink": "",
//         "notification": "yes",
//         "id": "tsk123460"
//     }
// ]
console.log(apiTasks);


function arrangeTasks(oldTasks) {
  let newTasksList = [];
  oldTasks.forEach((v)=>{
    
    let currentTask = newTasksList.find(task => typeof task ==='object' && task !== null && v.activityDate in task);
     
    if (currentTask) {
      currentTask[v.activityDate].push(v);
      
    }else{
      if(newTasksList.length === 0){
        newTasksList.push({[v.activityDate]: [v]});
        
      }else{
        let currentValueDate = new Date(v.activityDate).getTime();

        let tempIndex = newTasksList.findIndex(value=>{
          let tempV = Object.keys(value)[0];
          return currentValueDate < new Date(tempV).getTime();
        })
        console.log(tempIndex);
        if (tempIndex === -1) {
          newTasksList.push({[v.activityDate]: [v]})
        }else{
          newTasksList.splice(tempIndex, 0, {[v.activityDate]: [v]})
        }
      }
    }    
  })
  return newTasksList;
}

console.log(arrangeTasks(apiTasks));


