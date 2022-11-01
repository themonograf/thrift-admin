import { combineReducers } from "@reduxjs/toolkit";
import { apiSlice } from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";
import userManagementReducer from "./features/user-management/userManagementSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  userManagement: userManagementReducer,
});

export default rootReducer;
