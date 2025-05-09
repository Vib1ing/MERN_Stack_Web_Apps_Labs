import { useSelector } from "react-redux";
import Joke from "./Joke";
import FilterJoke from "./FilterJoke";

const JokeList = () => {
  const jokes = useSelector((state) => state.jokes);
  const filter = useSelector((state => state.filter));
  const filteredJokes = filter === "all" ? jokes : filter === "favorites" ? jokes.filter(task => task.favorite) : jokes.filter(task => !task.favorite);
  return (
    <div>
      <FilterJoke />
      {filteredJokes.map((joke) => (
        <Joke key={joke.id} joke={joke} />
      ))}
    </div>
  );
};

export default JokeList;
