import { createSlice } from "@reduxjs/toolkit";

const reducer = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotification: (state, action) => {
      return action.payload;
    },
  },
}) 

export const { setNotification } = reducer.actions;
export default reducer.reducer;
