import { createSlice } from "@reduxjs/toolkit";

export const apiData = createSlice({
  name: "API DATA",
  initialState: {
    subCategories: null,
    mainCategories: null,
  },

  reducers: {
    addSubCategories: (state, action) => {
      state.subCategories = action.payload;
    },

    addMainCategories: (state, action) => {
      state.mainCategories = action.payload;
    },
  },
});

export const { addSubCategories, addMainCategories } = apiData.actions;
export default apiData.reducer;
