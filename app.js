const config = require("./utils/config");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const logger = require("./utils/logger");
const postsRouter = require("./controllers/postsController");
// const commentsRouter = require("./controllers/commentsControllers");

logger.info("connecting to", config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((err) => logger.error("error connecting to MongoDB:", err.message));

app.use(express.json());

app.use("/api/posts", postsRouter);
// app.use("/comments", commentsRouter);

module.exports = app;
