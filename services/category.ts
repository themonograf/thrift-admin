import appConfig from "config/app.config";

const api = appConfig.baseApi;

const categoryServices = {
  getAll: {
    url: `${api}/product-category`,
    method: "GET",
  },
  createCategory: {
    url: `${api}/product-category`,
    method: "POST",
  },
  updateCategory: {
    url: `${api}/product-category`,
    method: "PUT",
  },
  deleteCategory: {
    url: `${api}/product-category`,
    method: "DELETE",
  },
};

export default categoryServices;
