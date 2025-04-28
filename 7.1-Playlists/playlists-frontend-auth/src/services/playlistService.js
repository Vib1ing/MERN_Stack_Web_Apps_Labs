import axios from 'axios';
const API_URL = "http://localhost:3001/api/playlists";

const getPlaylist = async () => {
    const response = await axios.get(API_URL);
    return response.data;
  };
  
const createPlaylist = async (playlist, token) => {
    const authorization = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(API_URL, playlist, authorization);
    return response.data;
  };

const likePlaylist = async (playlistId, token) => {
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(`${API_URL}/${playlistId}/like`, {}, authorization);
  return response.data;
}

const deletePlaylists = async (playlistId, token) => {
  const authorization = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(`${API_URL}/${playlistId}`, authorization);
  return response.data;
}

export default { getPlaylist, createPlaylist, likePlaylist, deletePlaylists };