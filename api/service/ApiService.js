import api from "axios";
import qs from "qs";
import {
  apiNetworkRequest,
  apiNetworkResponse,
  requestNetworkError,
  responseNetworkError
} from "../interceptors/networkInterceptor";

const singletonNetwork = Symbol("singletonNetwork");
const singletonEnforcer = Symbol("singletonEnforcer");

class ApiService {
  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) {
      throw new Error("Cannot construct singleton");
    }

    this.apiNetworkInstance = api.create({
      baseURL: "https://integration-api.tangocard.com/raas/v2"
    });
    this.apiNetworkInstance.interceptors.request.use(
      apiNetworkRequest,
      requestNetworkError
    );
    this.apiNetworkInstance.interceptors.response.use(
      apiNetworkResponse,
      responseNetworkError
    );
  }

  static get instance() {
    // Try to get an efficient singleton
    if (!this[singletonNetwork]) {
      this[singletonNetwork] = new ApiService(singletonEnforcer);
    }

    return this[singletonNetwork];
  }

  get = params =>
    this.apiNetworkInstance({
      method: "GET",
      ...params
    });

  post = ({ data, ...rest }) =>
    this.apiNetworkInstance({
      method: "POST",
      data: qs.stringify(data),
      ...rest
    });

  put = ({ data, ...rest }) =>
    this.apiNetworkInstance({
      method: "PUT",
      data: qs.stringify(data),
      ...rest
    });

  patch = rest =>
    this.apiNetworkInstance({
      method: "PATCH",
      ...rest
    });

  delete = params =>
    this.apiNetworkInstance({
      method: "DELETE",
      ...params
    });

  multiPartPost = ({ params, ...rest }) =>
    this.apiNetworkInstance({
      method: "POST",
      data: qs.stringify(data),
      ...rest
    });
}

export default ApiService.instance;
