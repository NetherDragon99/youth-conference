// get dd/mm/yyyy
export const getCurrentDate = () => {
  const days = new Date().getDate().toString().padStart(2, '0');
  const months = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const years = new Date().getFullYear();
  return `${years}/${months}/${days}`;
}
console.log(getCurrentDate());

let currentTime, startTime, endTime, timeProgress, enteredStartTime, enteredendTime;

export const getTimeProgress = (enteredStartTime, enteredendTime) => {
  let tempenteredStartTime = (`${getCurrentDate()} ${enteredStartTime}`);
  let tempenteredendTime = (`${getCurrentDate()} ${enteredendTime}`);
  //console.log(tempenteredStartTime, tempenteredendTime);

  startTime = `${new Date(tempenteredStartTime).getTime()}`;
  endTime = new Date(tempenteredendTime).getTime();
  //console.log(startTime, endTime);

  currentTime = new Date(`${getCurrentDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`).getTime();
  //console.log(currentTime);

  timeProgress = ((currentTime - startTime) / (endTime - startTime) * 100).toFixed();
  if (timeProgress >= 100) {
    timeProgress = 100;
  }else if(timeProgress <= 0){
    timeProgress = 0;
  }
  return timeProgress;
}
console.log(getTimeProgress("00:00:00", "00:05:00"));

getTimeProgress();