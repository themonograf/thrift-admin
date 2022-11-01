import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  accessToken: null,
  refreshToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { data, accessToken, refreshToken } = action.payload;
      state.data = data;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
  },
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;

export const selectAuthUser = (state) => state.auth.user;
export const selectAccessToken = (state) => state.auth.accessToken;
export const selectRefreshToken = (state) => state.auth.refreshToken;
