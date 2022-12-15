import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: null, token: null, id: null };

const personSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setPerson(state, action) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removePerson(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});

export const { setPerson, removePerson } = personSlice.actions;
export default personSlice.reducer;
