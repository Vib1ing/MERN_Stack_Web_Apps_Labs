import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createJoke } from "../services/api";
import { useContext } from "react";
import NotificationContext from "../context/NotificationContext";

const JokeForm = () => {
  const queryClient = useQueryClient();
  const { dispatch } = useContext(NotificationContext);

  const addMutation = useMutation({
    mutationFn: createJoke,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["jokes"]);
      dispatch({
        type: 'SHOW',
        payload: { message: `Added joke: "${data.joke}"`, type: 'info' }
      });
    },
    onError: () => console.log("Error while adding a joke")
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const newJoke = event.target.joke.value;
    if (newJoke.trim() === "") return null;

    console.log("Joke Submitted");
    addMutation.mutate({ joke: newJoke, favorite: false, vote: 0 });
    event.target.joke.value = "";
  };

  return (
    <div>
      <h3>Why not another joke?</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter a new joke" name="joke" />
        <button type="submit">Add Joke</button>
      </form>
    </div>
  );
};

export default JokeForm;
