import { createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: { users: [] },
  reducers: {
    getAllUsers: function (state, action) {
      state.users = action.payload.arr;
    },
  },
});

export const { getAllUsers } = usersSlice.actions;

export default usersSlice.reducer;
