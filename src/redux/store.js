import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./usersSlice";
import personSlice from "./personSlice";
import postSlice from "./postSlice";

export const store = configureStore({
  reducer: { users: usersSlice, person: personSlice, posts: postSlice },
});
