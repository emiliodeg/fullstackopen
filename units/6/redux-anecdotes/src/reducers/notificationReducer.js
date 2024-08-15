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

export const setNotification =  (message, time = 5) => {
  return (dispatch) => {
    dispatch(reducer.actions.setNotification(message));
    setTimeout(() => {
      dispatch(reducer.actions.setNotification(null));
    }, time * 1000);
  };
}

export default reducer.reducer;
