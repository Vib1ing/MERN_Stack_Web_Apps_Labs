import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateJoke, deleteJoke, upvoteJoke, downvoteJoke } from "../services/api";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const Joke = ({ joke }) => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);

  const notify = (message, type = 'info') => {
    dispatch({ type: 'SHOW', payload: { message, type } });
  };

  const toggleMutation = useMutation({
    mutationFn: updateJoke,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["jokes"]);
      const action = data.favorite ? 'added to' : 'removed from';
      const type = data.favorite ? 'info' : 'warning';
      notify(`Joke ${action} favorites: "${data.joke}"`, type);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: deleteJoke,
    onSuccess: () => {
      queryClient.invalidateQueries(["jokes"]);
      notify(`Deleted joke: "${joke.joke}"`, 'warning');
    }
  });

  const upvoteMutation = useMutation({
    mutationFn: upvoteJoke,
    onSuccess: () => {
      queryClient.invalidateQueries(["jokes"]);
      notify(`Upvoted joke: "${joke.joke}"`, 'info');
    }
  });

  const downvoteMutation = useMutation({
    mutationFn: downvoteJoke,
    onSuccess: () => {
      queryClient.invalidateQueries(["jokes"]);
      notify(`Downvoted joke: "${joke.joke}"`, 'warning');
    }
  });

  return (
    <div>
      <p>{joke.joke}</p>
      <div>
        <button onClick={() => upvoteMutation.mutate(joke)}>Upvote</button>
        <span>{joke.vote}</span>
        <button onClick={() => downvoteMutation.mutate(joke)}>Downvote</button>
      </div>
      <div>
        <span>
          <em>{joke.favorite ? "Favorite Joke " : ""}</em>
        </span>
        <span
          style={{ textDecoration: "underline", cursor: "pointer" }}
          onClick={() => toggleMutation.mutate({ ...joke, favorite: !joke.favorite })}
        >
          {joke.favorite ? "Remove from favorites" : "Add to Favorites"}
        </span>
        <span>
          <button onClick={() => deleteMutation.mutate(joke)}>Remove</button>
        </span>
      </div>
      <hr />
    </div>
  );
};

export default Joke;
