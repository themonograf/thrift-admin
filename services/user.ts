import appConfig from "config/app.config";

const api = appConfig.baseApi;

const userServices = {
  getAll: {
    url: `${api}/users`,
    method: "GET",
  },
  createUser: {
    url: `${api}/users`,
    method: "POST",
  },
  updateUser: {
    url: `${api}/users`,
    method: "PUT",
  },
  deleteUser: {
    url: `${api}/users`,
    method: "DELETE",
  },
};

export default userServices;
