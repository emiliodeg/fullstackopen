import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h2>create new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
}
