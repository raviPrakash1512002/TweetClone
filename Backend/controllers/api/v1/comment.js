const Comment = require("../../../model/Comment");
const Post = require("../../../model/post");
const Like = require("../../../model/Likes");

module.exports.creates = async function (req, res) {
  try {
    let post = await Post.findById(req.body.post_id);
    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post_id,
        user: req.user.userId,
      });

      post.comments.push(comment);
      post.save();
      comment = await comment.populate("user", "name email");
      return res.status(200).json({
        success:true,
        data: {
          comment: comment,
        },
        message: "Post created!",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports.destroy = async function (req, res) {
  try {
    let comment = await Comment.findById(req.query.comment_id);
    if (comment.user == req.user.id) {
      let postId = comment.post;

      comment.remove();
      let post = Post.findByIdAndUpdate(postId, {
        $pull: { comments: req.query.comment_id },
      });
      //delete the associated likes for this comment
      await Like.deleteMany({ likeable: comment._id, onModel: "Comment" });
      // send the comment id which was deleted back to the views

      return res.status(200).json({
        success:true,
        data: {
          comment_id: req.query.comment_id,
        },
        message: "Post deleted",
      });
    }
  } catch (err) {
  
    return res.status(500).json(err);
  }
};
