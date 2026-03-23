export const apiURL = "https://script.google.com/macros/s/AKfycbxFrpgsy_WTpNL6Vn3ySVMj1LeBshR4ChgxYUFyWHKYXfLvebzpjfBVIRWFlQkCrzLy/exec";

export async function deleteSpecificData(page, target, data) {
  const dataToUpdate = {
    page: `${page}`,
    action: 'delete',
    searchKey: `${target}`,
    searchValue: `${data}`,
  }
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(dataToUpdate)
    })
    const res = await response.json();
    //console.log(res);

    return res;
  } catch (err) {
    console.log(err);

  }
}

export async function getWith2Data(page, data1Key, data1Value, data2Key, data2Value) {
  try {
    const fetchedData = await fetch(`${apiURL}?page=${page}&${data1Key}=${data1Value}&${data2Key}=${data2Value}`);

    return fetchedData.json();
  } catch (err) {
    console.log(err);
  }
}

export async function updateSpecificData(page, target, data, dataToAdd) {
  const dataToUpdate = {
    page: `${page}`,
    action: 'update',
    searchKey: `${target}`,
    searchValue: `${data}`,
    data: dataToAdd
  }
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(dataToUpdate)
    })
    const res = await response.json();
    //console.log(res);

    return res;
  } catch (err) {
    console.log(err);

  }
}

export async function getSpecificData(page, target, data) {
  try {
    const res = await fetch(`${apiURL}?page=${page}&searchKey=${target}&searchValue=${data}`);
    let getSpecificData = await res.json();

    // console.log(getSpecificData);
    return getSpecificData;
  } catch (err) {
    return console.error("erro on getting data:");
  }
}

export async function getColumn(page, target) {
  try {
    const res = await fetch(`${apiURL}?page=${page}&column=${target}`);
    let getSpecificData = await res.json();

    // console.log(getSpecificData);
    return getSpecificData;
  } catch (err) {
    return console.error("erro on getting data:");
  }
}

export async function addSpecificData(page, data) {
  const toAPI = {
    page: page,
    action: 'add',
    data: data
  }
  try {
    const response = await fetch(apiURL, {
      method: 'POST',
      body: JSON.stringify(toAPI)
    })
    const res = await response.json();
    // console.log(res);
    return res;
  } catch (err) {
    console.log(err);
  }
}

export async function getData(page) {
  const fetchedData = (await fetch(`${apiURL}?page=${page}`)).json();
  return fetchedData;
}