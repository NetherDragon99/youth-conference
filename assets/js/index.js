import { getData, newData } from "./api.js";
import { putData, autoRefresh, scrollFunction, autoScroll, activitySession} from "./functions.js";

scrollFunction();

async function todaysActivity() {
  let start = await getData('conferenceActivitys');
  if (start) {
    await putData(newData);
  autoRefresh(newData)
  activitySession();
  }
}
todaysActivity();
