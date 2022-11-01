import appConfig from "config/app.config";

const api = appConfig.baseApi;

const authServices = {
  login: {
    url: `${api}/auth/login`,
    method: "POST",
  },
  refresh: {
    url: `${api}/auth/refresh`,
    method: "POST",
  },
};

export default authServices;
