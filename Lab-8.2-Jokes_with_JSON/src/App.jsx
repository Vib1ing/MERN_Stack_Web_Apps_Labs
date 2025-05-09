import React from 'react'
import { useEffect } from 'react'
import { fetchDBStore } from './reducers/jokeReducer'
import { useDispatch } from 'react-redux'
import Joke from './components/Joke'
import JokeList from './components/JokeList'
import JokeForm from './components/JokeForm'
const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDBStore());
  }, []);
  return (
    <div>
      <h1>Programmer Jokes</h1>
      <h2>Jokes</h2>
      
      <JokeList />
      <JokeForm />
      
    </div>
  )
}

export default App