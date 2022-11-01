import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import appConfig from "config/app.config";
import { getSession } from "next-auth/react";

const baseQuery = fetchBaseQuery({
  baseUrl: appConfig.baseApiLocal,
  prepareHeaders: async (headers) => {
    const { accessToken }: any = await getSession();
    headers.set("Content-Type", `application/json`);
    if (accessToken) {
      headers.set("authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  // if (result?.error?.status === 401) {
  //   const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
  //   if (refreshResult.data) {
  //     const dataResult = refreshResult.data as any;
  //     const { data } = api.getState().auth;
  //     const accessToken = dataResult?.accessToken;
  //     const refreshToken = dataResult?.refreshToken;
  //     api.dispatch(
  //       setCredentials({
  //         data,
  //         accessToken,
  //         refreshToken,
  //       })
  //     );
  //     result = await baseQuery(args, api, extraOptions);
  //   } else {
  //     api.dispatch(logout());
  //   }
  // }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithAuth,
  endpoints: () => ({}),
});
