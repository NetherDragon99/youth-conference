export const apiURL = "https://script.google.com/macros/s/AKfycbzmBmnavjHrSoaeQmrgT4mjZg8Yi7wH90E44n8Mn1oOEz3unPdF2dRcqr40KXaxOb6T/exec";

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