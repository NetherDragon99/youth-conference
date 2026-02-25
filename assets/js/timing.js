// get dd/mm/yyyy
export const getCurrentDate = () => {
  const days = new Date().getDate().toString().padStart(2, '0');
  const months = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const years = new Date().getFullYear();
  return `${years}/${months}/${days}`;
}
// console.log(getCurrentDate());

let currentTime, startTime, endTime, timeProgress;

export const getTimeProgress = (enteredStartTime, enteredendTime) => {
  let tempenteredStartTime = (`${getCurrentDate()} ${enteredStartTime}`);
  let tempenteredendTime = (`${getCurrentDate()} ${enteredendTime}`);
  //console.log(tempenteredStartTime, tempenteredendTime);

  startTime = `${new Date(tempenteredStartTime).getTime()}`;
  endTime = new Date(tempenteredendTime).getTime();
  //console.log(startTime, endTime);

  currentTime = new Date(`${getCurrentDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`).getTime();
  //console.log(currentTime);

  timeProgress = ((currentTime - startTime) / (endTime - startTime) * 100).toFixed(3);
  if (timeProgress >= 100) {
    timeProgress = 100;
  } else if (timeProgress <= 0) {
    timeProgress = 0;
  }
  return timeProgress;
}
// console.log(getTimeProgress("00:00:00", "00:05:00"));

getTimeProgress();

// make time from 00:00:00 to 0:00
export const cleanTime = (time) => {

  if (time.slice(0, 2) == '00' || time.slice(0, 2) == '24') {
    time = `12:${time.slice(3, 8)}am`;

  } else if (Number(time.slice(0, 2)) > 12) {
    time = `${Number(time.slice(0, 2)) - 12}:${time.slice(3, 8)}pm`
  } else {
    time = `${time}am`
  }

  if (time.charAt(0) == 0) {
    time = `${time.slice(1, 5)}${time.slice(-2)}`;
  } else if (time.slice(0, 2) == '12') {
    time = `${time.slice(0, 5)}${time.slice(-2)}`;
  } else {
    time = `${time.slice(0, 4)}${time.slice(-2)}`;
  }

  return time;
}