let currentTime , startTime , endTime ,timeProgress ,enteredStartTime ,enteredendTime;

enteredStartTime = [2026, 1, 21, 1, 26, 0];
enteredendTime = [2026, 1, 21, 2, 26, 0];

startTime = new Date(...enteredStartTime).getTime();
endTime = new Date(...enteredendTime).getTime();
currentTime = new Date().getTime();


timeProgress = ((currentTime - startTime) / (endTime - startTime) *100).toFixed();

console.log(timeProgress);
