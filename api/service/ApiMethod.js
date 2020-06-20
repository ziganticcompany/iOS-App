import api from "./ApiService";

const restApiGet = (url, params) => {
  return api.get({
    url,
    params
  });
};

const restApiPost = (url, data) => {
  return api.post({
    url,
    data
  });
};

const restApiPut = (url, data) => {
  return api.put({
    url,
    data
  });
};

const restApiPatch = (url, data) => {
  return api.patch({
    url,
    data
  });
};

const restApiDelete = (url, params) => {
  return api.patch({
    url,
    params
  });
};

const restApiMultiPartPost = (url, data) => {
  return api.multiPartPost({
    url,
    data
  });
};

export {
  restApiGet,
  restApiPost,
  restApiPut,
  restApiPatch,
  restApiDelete,
  restApiMultiPartPost
};
