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
  accountUpdated: 'تم تحديث بياناتك بنجاح',
  noImage: 'خلى بالك ان كدة مفيش صورة مرفوعة',
  notAdmin: 'الحساب دة مش مفعل كا ادمن',
  toAdminPage: 'سيتم تحويلك الى صفحة الادمن',
  noTransactionTargete: 'اختار الحساب الى هتحول له',
  noTransactionAmount: 'اختار الكمية المطلوبة',
  defaultAddTransactioDescription: amount => `تم اضافة ${amount} كوكس`,
  defaultremoveTransactioDescription: amount => `تم خصم ${amount} كوكس`,
  defaultTransactionDetails: 'تمت هذه العملية من قبل الادمن',
  transactionFaild: 'حصلت مشكلة فى التحويل',
  transactionUserNotAvailable: 'الشخص دة مش مودود او انت كتبته يدوى<br>معلش اختار الشخص من القائمة',
  accountActivated: 'تم تفعيل الحساب',
  accountDeactivated: 'تم الغاء تفعيل الحساب',
  accountWillDeleted: 'فى حالة مسح او حظر الحساب هيتم تنبيه صاحب الحساب وهيختفى من عندك وهيتم مسحة بشكل نهائى بمجرد ما صاحب الحساب يحاول يخش',
  accountDeleted: 'تم مسح الاكونت بنجاح',
  error: 'حصلت مشكلة',
  dataUpdated: 'تم تحديث البيانات بنجاح',
  userAccountDeleted: `للاسف الاكونت بتاعك الادمن عمل طلب لمسحة
  تقدر تحاول تعمل اكونت تانى او تعرف سبب تبنيد حسابك`,
  'confirm-cancel-task': `لو انت كاتب حاجة هتروح !!<br>متأكد انك عاوز تكنسل ؟؟<br>دوس تانى فى خلال 5 ثوانى علشان تكنسل`,
  taskMakeError: `للاسف حصلت مشكلة والتاسك متنفذش`,
  taskMakeDone: `تمام كدة يا باشا اتعمل`
}

export const dom = {
  updateDataForm: `<fieldset>
            <legend class="accountProfileData">My Account</legend>
            <div>
              <label for="profileUserName">name:</label>
              <input type="text" id="profileUserName" placeholder="Guest" name="userName">
            </div>
            <div>
              <label for="profileGender">gender:</label>
              <select name="gender" id="profileGender">
                <option value="m">Male</option>
                <option value="f">Female</option>
                <option value="p">Prefer not to say</option>
                <option value="o">Other</option>
              </select>
            </div>
            <div>
              <label for="profilePicture" id="profilePictureLable">picture:
                <div>
                  Select your profile picture...
                  <div id="removeImage">
                    <img src="assets/imgs/picture.ico" alt="images icon">
                    <div class="icon-clear"></div>
                  </div>
                </div>
              </label>
              <input type="file" id="profilePicture" name="profilePicture" accept="image/*">
              <input type="text" name="profilePicture" style="display: none;" id="profilePictureUrl">
            </div>
            <div>
              <label for="profileGmail">email:</label>
              <input type="email" id="profileGmail" placeholder="guest@gmail.com" name="email" readonly>
            </div>
            <div>
              <label for="profilePassoword">password:</label>
              <input type="password" id="profilePassoword" placeholder="**********" name="password" required>
            </div>
            <input type="submit" id="updateProfileSubmitButton" value="Update your data">
            <button id='logOutBtn'>Log Out</button>
          </fieldset>`,
  notificationDOM: (v) => `
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
  tasksDOM: (v, icon, progress, displayBtn) =>
    `<button class="task ${v.type}Task" data-id="${v.id}">
            <div class="taskHeader">
              <div class="taskIcon">
                <div class="icon-${icon}"></div>
              </div>
              <div class="taskDetails">
                <div class="taskTitle">${v.title}</div>
                <div class="taskTimeing">
                  <div class="taskTime">من ${timing.cleanTime(v.startingTime)} <br>لحد ${timing.cleanTime(v.endingTime)}</div>
                  <div class="taskProgress">
                    <div style="width: ${progress}%"></div>
                    <div class="taskProgressNumber">${Number(progress).toFixed() === '100' ? 'TimeUp' : Number(progress).toFixed() + '%'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="taskDescription">
              <p class="extraDetails">${v.description}</p>
              <div class="taskActionBtn" data-btnId="${v.id}" ${displayBtn} data-buttonLink="${v.buttonLink}">${v.buttonName}</div>
              <div class="taskExitButton icon-exit">
                <p>Exit</p>
              </div>
            </div>
          </button>`,
  noTaskDOM: `<button class="task inprogressTask">
            <div class="taskHeader">
              <div class="taskIcon">
                <div class="icon-tongue"></div>
              </div>
              <div class="taskDetails">
                <div class="taskTitle">مفيش حاجة النهاردة</div>
                <div class="taskTimeing">
                  <div class="taskTime">خليك مستعد هنبدأ قريب</div>
                  <div class="taskProgress">
                    <div></div>
                    <div class="taskProgressNumber">24/6/2026</div>
                  </div>
                </div>
              </div>
            </div>
          </button>`,
  searchResultDOM: v =>
    `<div class="searchResult">
        <div class="searchResultName">${v.userName}</div>
        <div class="searchResultEmal">${v.email}</div>
      </div>`,
  rankedUsersDom: (v, imageAtt) =>
    `<div class="rankedProfile">
            <div class="rankPlaceNo">${v.rank}</div>
            <div class="rankProfilePicture">
              <div class="icon-${v.gender == 'f' ? 'user2' : 'user1'}"><img ${imageAtt}></div>
            </div> 
            <div class="rankUserDetails">
              <div class="rankUserNameRanked">${v.userName}</div>
              <div class="rankUserCocsNo">${v.cocs} COCs</div>
            </div>
          </div>`,
  usersSearchResults: v =>
    `<div class="usersSearchSuggestion">
              <h4 class="userSearchName">${v.userName}</h4>
              <h4 class="userSearchEmail">${v.email}</h4>
            </div>`,
  transactiionDescription: v => `<div class="transactionDescriptionSuggestion">${v}</div>`,
  transactiionLastDescription: v =>
    `<div class="transactionDescriptionSuggestion lastDescription">
              <p class="lastDescriptionTitle">الوصف السابق</p>
              <p class="lastDescriptionText">${v}</p>
            </div>`,
  transactiionDetails: v =>
    `<div class="transactionDescriptionSuggestion">${v}</div>`,
  transactiionLastDetails: v =>
    `<div class="transactionDescriptionSuggestion lastDescription">
              <p class="lastDescriptionTitle">الوصف السابق</p>
              <p class="lastDescriptionText">${v}</p>
            </div>`,
  transactionHistory: (state, time, description, email, icon, admin) =>
    `<div class="transaction ${state}" data-adminName="${admin}">
            <div id="trransactionDate">${time}</div>
            <div id="transactionDetails">
              <h3>${description}</h3>
              <h4>${email}</h4>
            </div>
            <div id="transactionIcon" class="icon-${icon}"></div>
          </div>`,
  requestDOM: (userName, email, img, imgDisplay, gender) =>
    `<div class="request" data-email="${email}">
            <div class="requestDetail">
              <div id="requestProfilePic" class="icon-user${gender == 'm' ? '1' : '2'}"><img src="${img}" alt="profile picture" ${imgDisplay}>
              </div>
              <div class="requestProfileData">
                <h4 id="requestUserName">${userName}</h4>
                <h4 id="requestEmail">${email}</h4>
              </div>
            </div>
            <div class="requestAction">
              <button class="approve">قبول
                <div class="icon-checkmark"></div>
              </button>
              <button class="remove">حذف
                <div class="icon-trash"></div>
              </button>
              <button class="delete">مسح
                <div class="icon-blocked"></div>
              </button>
            </div>
          </div>`,
  dashboardUsers: (userName, email, state, gender, profielPicture, picState, acceptDisplay) => `
  <div class="user" data-email="${email}">
            <div class="userProfilePic icon-${gender}">
              <img src="${profielPicture}" alt="profile picture" style="opacity: ${picState};">
            </div>
            <div class="userDetails">
              <div class="upperSection">
                <p>${userName}</p>
                <div id="userState" data-state="${state}">${state}</div>
              </div>
              <div class="lowerSection">${email}</div>
            </div>
            <div class="userActions">
              <span class="icon-actionDots"></span>
              <div class="actionsMenue">
                <div id="actionMenueContainer">
                  <div id="viewUserDetails">
                    <p>عرض التفاصيل</p>
                    <span class="icon-info"></span>
                  </div>
                  <div id="acceptUser" ${acceptDisplay}>
                    <p>قبول الحساب</p>
                    <span class="icon-user-approved"></span>
                  </div>
                  <div id="deleteAccount">
                    <p>حظر الحساب</p>
                    <span class="icon-blocked"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>`,
  dashboardUsersDetails: (genderIcon, img, imgDisplay, userName, email, gender, cocs, rank, updateState) => `
  <div id="editUserWindow" data-email="${email}">
      <div id="popUpupperProfile">
        <div id="popUpProfilePic" class="icon-${genderIcon}">
          <img src="${img}" alt="profile Picture" style="${imgDisplay}">
        </div>
        <h4>${userName}</h4>
      </div>
      <div id="popUplowerProfile">
        <form id="popUpForm">
          <div id="popUpUserNameFiled">
            <label for="popUpUserName">username: </label>
            <input type="text" placeholder="username" id="popUpUserName" value="${userName}" name="userName">
          </div>
          <div id="popUpEmailFiled">
            <label for="popUpEmail">email: </label>
            <input type="email" placeholder="username@email.com" id="popUpEmail" value="${email}" name="email">
          </div>
          <div id="popUpGenderFiled">
            <label for="popUpGender">gender:</label>
            <select name="gender" id="popUpGender">
              <option value="m" ${gender == 'm' ? 'selected' : ''}>Male</option>
              <option value="f" ${gender == 'f' ? 'selected' : ''}>Female</option>
            </select>
          </div>
          <div id="popUpPictureFiled">
            <label for="popUpProfilePicture" id="popUpProfilePictureLable">picture:
              <div>
                Select your profile picture...
              </div>
            </label>
            <div id="popUpRemovePic">
              <img src="assets/imgs/picture.ico" alt="remove image">
              <span class="icon-clear"></span>
            </div>
            <input type="file" id="popUpProfilePicture" name="profilePicture" accept="image/*" style="display: none;">
            <input type="text" name="profilePicture" style="display: none;" id="popUpProfilePictureUrl" value="${img}" id="imgToDisplat">
          </div>
        </form>
        <p id="cocsNo">COCS: <span>${cocs}</span></p>
        <p id="rankNo">Rank: <span>#${rank}</span></p>
        <button id="popUpUpdateData">Update Account Data</button>
        <button id="popUp${updateState}">${updateState} Account</button>
        <Button id="popUpDelete">Delete Account</Button>
        <Button id="popUpExit">Exit Menue</Button>
      </div>
    </div>`,
  taskContainer: (date, tasks) => `
    <div class="adayTasks" data-state="opened">
      <div class="adayTaskDate">${date}</div>
      <div class="adayTasksList">
        ${tasks}
      </div>
    </div>`,
  tasks: (id, title, desc, time, usersList)=> `
    <div class="task" data-id="${id}">
      <div class="taskActionBtn">
        <button class="icon-edit editTaskBtn"></button>
        <button class="icon-trash deleteTaskBtn"></button>
      </div>
      <div class="taskSummary">
        <h4>${title}</h4>
        <p>${desc}</p>
        <p>${time}</p>
      </div>
      <div class="tasksUsersList" data-state="closed">${usersList}</div>
    </div>`,
  taskUsers: (name, email, gender, pic, state, tskId) => `
    <div class="taskUser" data-email="${email}" data-state="${state === 'ok'?'finished':'unfinished'}" data-tskId="${tskId}">
      <div class="taskPic icon-${gender==='m'?'user1':gender==='f'?'user2':'user'}">
        <img src="${pic}">
      </div>
      <div class="taskProfileData">
        <h4>${name}</h4>
        <p>${email}</p>
      </div>
      <button class="userTaskBtn">
        <div class="icon-${state==='ok'?'clear':'checkmark'}"></div>
      </button>
    </div>`
}

export const notificationsdata = {
  welcomeGift: {
    title: `اهلا بيك فى مؤتمر الشباب`,
    description: `تم اضافة الهدية الترحيبية`,
    details: `اهلا بيك فى مؤتمر الشباب<br>قررنا فى المؤتمر دة انه يكون مؤتمر مميز وفية افكرا اول مرة تتعمل فى مؤتمر والعاب تكون جديدة بحيث يكون ديما فى تشويق وانشطة مطلوب منك تعملها طول اليوم <br>الابلكيشن دة هو اول خطوة فى المؤتمر دة و كا هدية ترحيبية ضيفنالك 10 نقاط هدية واللى لازم تحافظ عليهم ومتفرطش فيهم بسهولة لاى حد`,
    icon: 'icon-done'
  }
}

export const tasksActionBtn = {
  tsk123456: () => {
    console.log('hi');
  }
}