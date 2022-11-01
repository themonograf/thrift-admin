import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

const initialState = {
  data: null,
  query: {
    limit: 5,
    page: 0,
  },
};

const userManagementSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    setUserManagementData: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    setUserManagementQuery: (state, action) => {
      const query = action.payload;
      state.query = { ...state.query, ...query };
    },
  },
});

export const { setUserManagementData, setUserManagementQuery } =
  userManagementSlice.actions;
export default userManagementSlice.reducer;

export const selectAllUsers = (state: RootState) => state.userManagement.data;
