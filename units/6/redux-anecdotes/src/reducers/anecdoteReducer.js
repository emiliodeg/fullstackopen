import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const reducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    append: (state, action) => {
      return state.concat(action.payload);
    },
    update: (state, action) => {
      const anecdote = action.payload;
      return state.map((item) => (item.id === anecdote.id ? anecdote : item));
    },
    setAll(state, action) {
      return action.payload;
    },
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAll(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content);
    dispatch(append(anecdote));
  };
};

export const vote = (anecdote) => {
  return async (dispatch) => {
    const result = await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 });
    dispatch(update(result));
  };
};

export const { update, setAll, append } = reducer.actions;
export default reducer.reducer;
