import { createSlice } from "@reduxjs/toolkit";
import reducers from "./../../../store/reducers/index";

export const user = createSlice({
  name: "user",
  initialState: {
    user: null,
  },

  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { addUser } = user.actions;
export default user.reducer;
