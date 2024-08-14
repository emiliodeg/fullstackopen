export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    payload: filter,
  };
};

const reducer = (state = "", action) => {
  if (action.type === "SET_FILTER") {
    return action.payload;
  }

  return state;
};

export default reducer;
