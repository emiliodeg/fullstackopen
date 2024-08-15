import { useDispatch } from "react-redux";
import { create } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes";

export default function AnecdoteForm() {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";

    const anecdote = await anecdoteService.create(content);

    dispatch(create(anecdote));
    dispatch(setNotification(`you created '${anecdote.content}'`));
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
