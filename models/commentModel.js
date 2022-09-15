const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "commenter must have a name"],
  },
  email: {
    type: String,
    required: [true, "commenter must have an email"],
  },
  body: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment",
  },
  id: Number,
  size: Number,
  postId: Number,
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
