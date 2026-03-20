import * as text from '../text.js';
import * as api from './dashboard-api.js';


const usersNo = document.getElementById('usersNo');

 
export async function putUsersNo() {
  const totalUsersNo = await api.getSpecificData('accounts', 'state', 'active');
  usersNo.innerHTML = totalUsersNo.length;  
}