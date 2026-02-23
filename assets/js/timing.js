// get dd/mm/yyyy
export const getCurrentDate = () => {
  const days = new Date().getDate().toString().padStart(2, '0');
  const months = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const years = new Date().getFullYear();
  return `${years}/${months}/${days}`;
}
console.log(getCurrentDate());

let currentTime, startTime, endTime, timeProgress, enteredStartTime, enteredendTime;

enteredStartTime = (`${getCurrentDate()} 17:00:00`);
enteredendTime = (`${getCurrentDate()} 18:13:00`);

export const getTimeProgress = (enteredStartTime, enteredendTime) => {
  startTime = new Date(enteredStartTime).getTime();
  endTime = new Date(enteredendTime).getTime();
  currentTime = new Date(`${getCurrentDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`).getTime();
  timeProgress = ((currentTime - startTime) / (endTime - startTime) * 100).toFixed();
}

getTimeProgress();
console.log(timeProgress);