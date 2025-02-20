const express = require("express");
const playlistRouter = express.Router();
const Playlist = require("../models/playlist");
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const {userIdentifier } = require("../utils/middleware");


playlistRouter.get("/", async (req, res) => {
  const playlists = await Playlist.find({}).populate("user", { username: 1, name: 1 });
  res.json(playlists);
});

playlistRouter.post("/", userIdentifier,async (req, res) => {
  const { name, creator, numOfSongs, likes } = req.body;
  const tokenPayload = jwt.verify(req.token, process.env.JWT_SECRET)
  if (!tokenPayload.id) return res.status(401).json({ error: "invalid token" })
  const user = await User.findById(tokenPayload.id);
  console.log(user.playlists)
  if (!user) {
    return res.status(404).json({ error: "user not found" });
  }
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
    const playlist = new Playlist({ name, creator, numOfSongs, likes, user: user._id })
    const savedPlaylist = await playlist.save();
    user.playlists = [...user.playlists, savedPlaylist._id]
    await user.save();
    res.json(savedPlaylist);
  }
});
playlistRouter.delete("/:id",userIdentifier, async (req, res) => {
  const tokenPayload = jwt.verify(req.token, process.env.JWT_SECRET);
  if (!tokenPayload.id) return res.status(401).json({ error: "invalid token" });
  const user = await User.findById(tokenPayload.id);
  if (!user) {
    return res.status(400).json({ error: "user not found" });
  }

  const playlist = await Playlist.findById(req.params.id);
  if (!playlist) {
    return res.status(404).json({ error: "playlist not found" });
  }
  if (user._id.toString() !== playlist.user.toString()) {
    return res.status(401).json({ error: "Unauthorized Access" });
  }

  const removedPlaylist = await Playlist.findByIdAndDelete(req.params.id);
  user.playlists = user.playlists.filter(playlistId => playlistId.toString() !== req.params.id);
  await user.save();
  return res.status(200).json({ message: `The playlist [${removedPlaylist.name}] deleted successfully.` });
});
module.exports = playlistRouter;