import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export default function AnecdoteList() {
  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (!filter) return anecdotes;

    return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
  });
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`you voted for ${anecdote.content}`));    
  };

  return (
    <>
      {[...anecdotes]
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </>
  );
}
