const express = require("express");
const app = express();
require("express-async-errors");
const cors = require("cors");
const { errorHandler, requestLogger } = require("./utils/middleware");
const logger = require("./utils/logger");
// routes
const playlistRouter = require("./routes/playlists");
// Todo model
const Playlist = require("./models/playlist");

// require mongoose
const mongoose = require("mongoose");
// require config
const config = require("./utils/config");

const DB_URI = config.dbUri;
// mongoose setup and connection
mongoose.set("strictQuery", false);
mongoose
  .connect(DB_URI)
  .then(() => logger.log("DB Connection Established"))
  .catch((e) => {
    logger.error("Error connecting the DB: ", e.message);
  });

// middleware for parsing body into js object
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// utilize requestLogger middleware
app.use(requestLogger);
app.use("/api/playlists", playlistRouter);

app.use(errorHandler);

module.exports = app;