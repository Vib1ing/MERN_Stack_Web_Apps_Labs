import { useDispatch } from "react-redux";
import { toggle,toggleJokes,upvote,upvoteJokes,downvote,downvoteJokes } from "../reducers/jokeReducer";
import { toggleOnDB } from "../services/jokeServices";

const Joke = ({ joke }) => {
  const dispatch = useDispatch();
  const handleFavorite = async () => {
    dispatch(toggleJokes(joke));
  };
  const handleUpvote=async()=>{
    dispatch(upvoteJokes(joke))
  }
  const handleDownvote=async()=>{
    dispatch(downvoteJokes(joke))
  }
  return (
    <div>
      <span>{joke.joke}</span>
      <br />
      
      
      <button onClick={handleUpvote}>
        Upvote
      </button>
      <span> {joke.vote} </span>
      <button onClick={handleDownvote}>
        Downvote
      </button>
      <br />
      <span>
        <em>{joke.favorite ? "(Favorite) " : ""}</em>
      </span>
        <span
        style={{ textDecoration: "underline", cursor: "pointer" }}
        onClick={handleFavorite}
      >
        {joke.favorite ? "Remove from Favorites" : "Add to Favorites"}
      </span>
      <hr></hr>
    </div>
  );
};

export default Joke;
