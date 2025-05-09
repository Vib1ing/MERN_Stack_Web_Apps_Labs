import { createSlice } from "@reduxjs/toolkit";
import {addJokeToDB, fetchJokes, toggleOnDB,upvoteJoke,downvoteJoke} from "../services/jokeServices"
const jokeSlice = createSlice({
  name: "jokes",
  initialState: [],
  reducers: {
    setInitialJokes: (state, action) => {
      return action.payload;
    },
    add: (state, action) => {
      state.push(action.payload);
    },
    toggle: (state, action) => {
      return state.map((joke) =>
        joke.id === action.payload ? { ...joke, favorite: !joke.favorite } : joke
      );
    },
    upvote: (state, action) => {
      return state.map((joke) =>
        joke.id === action.payload ? { ...joke, vote: joke.vote+1  } : joke
      );
    },
    downvote: (state, action) => {
      return state.map((joke) =>
        joke.id === action.payload ? { ...joke, vote: joke.vote-1 } : joke
      );
    },
  },
});

export const fetchDBStore=()=>{
  return async(dispatch)=>{
    const jokes=await fetchJokes();
    dispatch(setInitialJokes(jokes))
  }
}
export const addJoke=(newJoke)=>{
  return async(dispatch)=>{
    const joke=await addJokeToDB(newJoke);
    dispatch(add(joke))
  }
}

export const toggleJokes=(joke)=>{
  return async(dispatch)=>{
    const jokes=await toggleOnDB({ ...joke, favorite: !joke.favorite });
    dispatch(toggle(jokes.id));
  }
}
export const upvoteJokes=(joke)=>{
  return async(dispatch)=>{
    const jokes=await upvoteJoke({ ...joke, vote: !joke.vote+1 });
    dispatch(upvote(jokes.id));
  }
}
export const downvoteJokes=(joke)=>{
  return async(dispatch)=>{
    const jokes=await downvoteJoke({ ...joke, vote: !joke.vote-1 });
    dispatch(downvote(jokes.id));
  }
}
export const { add, toggle, setInitialJokes,upvote,downvote } = jokeSlice.actions;
export default jokeSlice.reducer;

