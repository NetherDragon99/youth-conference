import * as timing from "./timing.js"

export const text = {
  otherGender: 'أحنا هنستعبط ولا اية !!؟؟<br> اختار عدل ويلا متزعلنيش منك<br>معروفة يا ولد يا بنت',
  preferNotToSayGender: "خير مش عاوز تقول لية<br>معلش اتعب شوية واختار ال Gender بتاعك",
  activitysFailed: 'حصلت مشكلة فى تحميل البرنامج اليومى حاول مرة تانى معلش او كلم ستيفين',
  noActivities: 'مفيش جدول انشطة معمول للنهاردة',
  noName: 'تقريبا كدة نسيت تختار اسم البروفايل بتاعك',
  noEmail: 'تقريبا كدة نسيت تكتب الايميل بتاعك',
  noPassword: 'تقريبا كدة نسيت تكتب الباسورد بتاعك<br>لو ايميل جديد اكتب الباسورد الى عاوزة بس خليك فاكرة',
  noPasswordUpdate: 'تقريبا كدة نسيت تكتب الباسورد بتاعك',
  accountCreatingFailed: 'فى مشكلة والاكونت متعملش<br>معلش حاول تانى',
  accountCreated: 'الاكونت اتعمل وكله زى الفل يا باشا',
  newAccount: 'اكونت جديد!!<br>دخل اسمك واختار الgender علشان نعمل الاكونت',
  loginSucces: 'تم تسجيل الدخول بنجاح',
  wrongPassword: 'الباسورد غلط !!<br>حاول تفتكر او راجع الحروف كويس',
  accountUpdated: 'تم تحديث بياناتك بنجاح'
}

export const dom = {
  updateDataForm: `<fieldset>
            <legend class="accountProfileData">My Account</legend>
            <div>
              <label for="profileUserName">Name:</label>
              <input type="text" id="profileUserName" placeholder="Guest" name="userName">
            </div>
            <div>
              <label for="profileGender">Gender:</label>
              <select name="gender" id="profileGender">
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="p">Prefer not to say</option>
                <option value="o">Other</option>
              </select>
            </div>
            <div>
              <label for="profileGmail">G-Mail:</label>
              <input type="email" id="profileGmail" placeholder="guest@gmail.com" name="email" readonly>
            </div>
            <div>
              <label for="profilePassoword">password:</label>
              <input type="password" id="profilePassoword" placeholder="**********" name="password" required>
            </div>
            <input type="submit" id="updateProfileSubmitButton" value="Update your data">
            <button id='logOutBtn'>Log Out</button>
          </fieldset>`,
  notificationDOM: (v)=>`
                  <div class="notification ${v.state}" id="${v.id}">
                    <div class="notificationHeader">
                      <div class="notificationIcon ${v.icon}"></div>
                      <div class="notificationData">
                        <h4 class="notificationTitle">${v.title}</h4>
                        <h5 class="notificationDescription">${v.description}</h5>
                      </div>
                    </div>
                    <div class="notificationDetails">
                      <p>${v.details}</p>
                      <div class="notificationTime">${timing.timeText(v.time)}</div>
                      <button class="notificationExit icon-exit"><div>Close</div></button>
                    </div>
                  </div>
                  `,
  noNotifications: `<h3>Notifications</h3>
        <div class="noNotificationsMs">You don't have any notifications for now</div>`,
  notificationLoadingError: `<h3>Notifications</h3>
        <div class="noNotificationsMs">Unexpectied Error</div>`,
  sinInNotifications: `<h3>Notifications</h3>
        <div class="noNotificationsMs">please sign in to see your notifications</div>`,
  tasksDOM: (v, icon, progress, displayBtn)=>`
  <button class="task ${v.type}Task" data-id="${v.id}">
            <div class="taskHeader">
              <div class="taskIcon">
                <div class="icon-${icon}"></div>
              </div>
              <div class="taskDetails">
                <div class="taskTitle">${v.title}</div>
                <div class="taskTimeing">
                  <div class="taskTime">من ${timing.cleanTime(v.startingTime)} لحد ${timing.cleanTime(v.endingTime)}</div>
                  <div class="taskProgress">
                    <div style="width: ${progress}%"></div>
                    <div class="taskProgressNumber">${progress}%</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="taskDescription">
              <p class="extraDetails">${v.description}</p>
              <div class="taskActionBtn" ${displayBtn}>${v.buttonName}</div>
              <div class="taskExitButton icon-exit">
                <p>Exit</p>
              </div>
            </div>
          </button>`
}

export const notificationsdata = {
  welcomeGift: {
    title: `اهلا بيك فى مؤتمر الشباب`,
    description: `تم اضافة الهدية الترحيبية`,
    details: `اهلا بيك فى مؤتمر الشباب<br>قررنا فى المؤتمر دة انه يكون مؤتمر مميز وفية افكرا اول مرة تتعمل فى مؤتمر والعاب تكون جديدة بحيث يكون ديما فى تشويق وانشطة مطلوب منك تعملها طول اليوم <br>الابلكيشن دة هو اول خطوة فى المؤتمر دة و كا هدية ترحيبية ضيفنالك 10 نقاط هدية واللى لازم تحافظ عليهم ومتفرطش فيهم بسهولة لاى حد`,
    icon: 'icon-done'
  }
}