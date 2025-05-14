import Joke from "./Joke";
import { useJokesQuery } from "../hooks/useJokesQuery";
import FilterContext from "../context/FilterContext";
import { useContext } from "react";


const JokeList = () => {
  const { data: jokes, isLoading, isError } = useJokesQuery();
  const { filter } = useContext(FilterContext);
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error Fetching Jokes!!!!!</p>
  const filteredJoke = filter === "favorites"
    ? jokes.filter(j => j.favorite) :
      jokes;
  return (
    <div>
      {filteredJoke.map((joke) => (
        <Joke key={joke.id} joke={joke} />
      ))}
    </div>
  );
};

export default JokeList;
