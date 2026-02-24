import { getData, newData } from "./api.js";
import { putData, autoRefresh, scrollFunction, autoScroll} from "./functions.js";


async function todaysActivity() {
  await getData('conferenceActivitys');
  console.log(newData);
  await putData(newData);
  //console.log(htmlActivitys);
  //await setCurrentActivity(newData);
  autoRefresh(newData)
  autoScroll()
  scrollFunction();
}
todaysActivity();