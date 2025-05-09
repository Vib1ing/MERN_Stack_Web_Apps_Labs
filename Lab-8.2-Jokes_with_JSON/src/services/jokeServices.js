import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:3001/programmerJokes" });

export const fetchJokes = async () => {
  const res = await api.get("/");
  return res.data;
};

export const toggleOnDB = async (joke) => {
  const res = await api.put(`/${joke.id}`, joke);
  return res.data;
};
export const downvoteJoke = async (joke) => {
  const res = await api.put(`/${joke.id}`, joke);
  return res.data;
};
export const upvoteJoke = async (joke) => {
  const res = await api.put(`/${joke.id}`, joke);
  return res.data;
};

export const addJokeToDB = async (joke) => {
  const res = await api.post("/", joke);
  return res.data;
};
