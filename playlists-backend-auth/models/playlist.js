// require dotenv
require("dotenv").config();
// require mongoose
const mongoose = require("mongoose");
// require config
const config = require("../utils/config");

// create todo schema
const playlistSchema = new mongoose.Schema({
  name: String,
  creator: String,
  numOfSongs: Number,
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});


// configure toJSON method
playlistSchema.set("toJSON", {
  transform: (doc, ret) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const Playlist = mongoose.model("Playlist", playlistSchema);


module.exports = Playlist;