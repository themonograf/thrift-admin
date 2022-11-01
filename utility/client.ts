import axios from "axios";
import appConfig from "config/app.config";
import { getSession, signOut } from "next-auth/react";

const BASE_URL = appConfig.baseApi;

const client = axios.create({
  baseURL: `${BASE_URL}`,
});

const hasAccessTokenHeader = (): boolean => {
  return client.defaults.headers.common["Authorization"] !== undefined
    ? true
    : false;
};

// Add a request interceptor
client.interceptors.request.use(
  async function (config) {
    const isTokenExist = await hasAccessTokenHeader();
    if (!isTokenExist) {
      const session = await getSession();
      if (session) {
        // @ts-ignore
        config.headers.Authorization = `Bearer ${session?.accessToken}`;
      }
    }
    config.headers.Accept = "*/*";
    return config;
  },
  function (error) {
    // Do something with request error
    console.log(error);
    return Promise.reject(error);
  }
);

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    // This is for refresh token function
    // const originalConfig = error.config;
    // if (error.response) {
    //   if (error.response?.status === 401 && !originalConfig._retry) {
    //     console.log("refreshing")
    //     originalConfig._retry = true;
    //     try {
    //       const currentRefreshToken = Cookies.get("refreshToken");
    //       const rs = await client.post('/v1/auth/refresh-token', {
    //         refreshToken: currentRefreshToken,
    //       });
    //       const {accessToken} = rs.data;
    //       if (accessToken) {
    //         const date = new Date();
    //         let accessTokenExpireDate=  new Date(date.getTime() +(60*1000));
    //         Cookies.set("accessToken", accessToken, {expires: accessTokenExpireDate})
    //         return client(originalConfig);
    //       }
    //     } catch (_error) {
    //       return Promise.reject(_error);
    //     }
    //   }
    // }

    if (error?.response?.status === 401) {
      await signOut({
        redirect: true,
        callbackUrl: `${process.env.NEXT_PUBLIC_URL}/auth/login`,
      });
    }
    return Promise.reject(error);
  }
);

export const axiosBaseQuery =
  () =>
  async ({ url, method, data }) => {
    try {
      const result = await client({ url, method, data });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: { status: err.response?.status, data: err.response?.data },
      };
    }
  };

export default client;
