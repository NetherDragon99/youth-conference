import { getData, newData } from "./api.js";
import { putData, autoRefresh, scrollFunction, autoScroll, activitySession} from "./functions.js";


async function todaysActivity() {
  await getData('conferenceActivitys');
  await putData(newData);
  //console.log(htmlActivitys);
  //await setCurrentActivity(newData);
  autoRefresh(newData)
  autoScroll()
  scrollFunction();
  activitySession()
}
todaysActivity();
