import { useDispatch } from "react-redux";
import { add,addJoke } from "../reducers/jokeReducer";
import { addJokeToDB } from "../services/jokeServices";
const JokeForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Joke Submitted :", event.target.joke.value);
    const addJokes = {
      joke: event.target.joke.value,
      vote:0,
      favorite: false,
    };
    dispatch(addJoke(addJokes));
    event.target.joke.value = "";
  };

  return (
    <div>
      <h3>Create a new joke </h3>
      <form onSubmit={handleSubmit}>
        <input name="joke" type="text" placeholder="Enter Joke Description" />
        <button type="submit">Add Joke</button>
      </form>
    </div>
  );
};

export default JokeForm;
