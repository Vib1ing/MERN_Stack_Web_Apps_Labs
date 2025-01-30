const express = require("express");
const playlistRouter = express.Router();
const Playlist = require("../models/playlist");



playlistRouter.get("/", async (req, res) => {
    const playlists = await Playlist.find({});
    res.json(playlists);
});

playlistRouter.post("/", async (req, res,next) => {
    try {
        const { name, creator,numOfSongs,likes } = req.body;
        if (!name) {
          return res.status(400).json({ error: "Playlist Name is required" });
        } 
        if (!creator) {
          return res.status(400).json({ error: "Creator is required" });
        } 
        if (!numOfSongs) {
          return res.status(400).json({ error: "Number of Songs are required" });
        } 
        if (!likes) {
          return res.status(400).json({ error: "Likes are required" });
        } 
        else {
          const playlist=new Playlist({name, creator, numOfSongs, likes})
          const savedPlaylist=await playlist.save();
          res.json(savedPlaylist);
        }
      } catch (error) {
        next(error);
      }
});
module.exports = playlistRouter;