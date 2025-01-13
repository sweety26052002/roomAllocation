import Axios from "axios";
const BASE_URL = process.env.REACT_APP_API_URL ;
const DOWNLOAD_EXCEL_TEMPLATE = process.env.REACT_APP_DOWNLOAD_EXCEL_TEMPLATE;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postCall = (url: string, payload: any) => {
  return Axios.post(BASE_URL + url, payload, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // },
  })
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error)
    );
};

// export const deleteCall = (url: string, payload: any) => {
//   console.log('payload', payload);
//   return Axios.delete(BASE_URL + url, { data: payload })
//   .then(response => response)
//   .catch(error => Promise.reject(error?.response?.data?.body?.message || error));
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putCall = (url: string, payload: any) => {
  return Axios.put(BASE_URL + url, payload, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // },
  })
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error),
    );
};

export const getCall = (url: string) => {
  return Axios.get(BASE_URL + url)
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error),
    );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putCallFileUpload = (url: string, payload: any) => {
  return Axios.put(url, payload, {
    // headers: {
    //   Authorization: `Bearer ${localStorage.getItem('token')}`,
    // },
  })
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error),
    );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteCall = (url: string, payload: any) => {
  return Axios.delete(BASE_URL + url, {
    data: payload,
  })
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error),
    );
};

export const getCallToDownloadExcelTemplate = (url: string) => {
  return Axios.get(DOWNLOAD_EXCEL_TEMPLATE + url, { responseType: "blob" })
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error),
    );
};

export const getCallToDownloadInventoryReport = (url: string) => {
  return Axios.get(url, { responseType: "blob" })
    .then((response) => response)
    .catch((error) =>
      Promise.reject(error?.response?.data?.body?.message || error),
    );
};
