const postsRouter = require("express").Router();
const Post = require("../models/postModel");
const Comment = require("../models/CommentModel");
const { getPost, getCommentsByPost } = require("../utils/api/jsonPlaceholder");

postsRouter.get("/:postId", async (req, res, next) => {
  try {
    const post = await Post.aggregate([
      {
        $match: {
          id: Number(req.params.postId),
        },
      },
      { $limit: 1 },
      {
        $lookup: {
          from: "comments",
          localField: "id",
          foreignField: "postId",
          pipeline: [
            {
              $sort: {
                size: -1,
              },
            },
            {
              $limit: 3,
            },
          ],
          as: "comments",
        },
      },
      {
        $project: {
          title: 1,
          body: 1,
          "comments.name": 1,
          "comments.email": 1,
          "comments.body": 1,
        },
      },
    ]);
    res.json(post[0]);
  } catch (error) {
    next(error);
  }
});

postsRouter.post("/:postId", async (req, res, next) => {
  try {
    const post = await getPost(req.params.postId);
    let createdPost = null;
    await Post.create(post, function (err, document) {
      if (err) {
        console.log(err);
      } else {
        createdPost = document;
      }
    });
    const comments = await getCommentsByPost(req.params.postId);
    comments.forEach((comment) => (comment.post = createdPost._id));
    await Comment.create(comments, function (err) {
      console.log(err);
    });
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});

module.exports = postsRouter;
