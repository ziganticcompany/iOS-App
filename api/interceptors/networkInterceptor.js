async function apiNetworkRequest(config) {
  if (!config.headers.authorization) {
    config.headers.Authorization = `Basic UUFQbGF0Zm9ybTI6YXBZUGZUNkhOT05wRFJVajNDTEdXWXQ3Z3ZJSE9OcERSVVlQZlQ2SGo=`;
  }

  //console.log("config=>", config);
  return config;
}

function requestNetworkError(error) {
  //console.log("requestNetworkError", error);
  return Promise.reject(error);
}

const apiNetworkResponse = response => {
  try {
    return response;
  } catch (error) {
    return responseNetworkError(error);
  }
};

function responseNetworkError(error) {
  //console.log("error in responseNetworkError", error);
  return Promise.reject(typeof error === "string" ? new Error(error) : error);
}

export {
  apiNetworkRequest,
  requestNetworkError,
  apiNetworkResponse,
  responseNetworkError
};
