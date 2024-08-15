import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const reducer = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    append: (state, action) => {
      return state.concat(action.payload);
    },
    vote: (state, action) => {
      const id = action.payload;
      return state.map((anecdote) => (anecdote.id === id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote));
    },
    setAll(state, action) {
      return action.payload;
    }
  },
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAll(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create(content);
    dispatch(append(anecdote));
  };
};

export const { vote, setAll, append } = reducer.actions;
export default reducer.reducer;
