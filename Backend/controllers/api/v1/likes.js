const Like = require("../../../model/Likes");
const Comment = require("../../../model/Comment");
const Post = require("../../../model/post");

module.exports.toggleLike = async function (req, res) {
  try {
    //likes/toggle/?id=heffh&type=Post

    let likeable;
    let deleted = false;
    if (req.query.likeable_type == "Post") {
      likeable = await Post.findById(req.query.likeable_id).populate("likes");
      
    } else {
      likeable = await Comment.findById(req.query.likeable_id).populate("likes");
    }
    //check if a like already exsits
    let existingLike = await Like.findOne({
      likeable: req.query.likeable_id,
      onModel: req.query.likeable_type,
      user: req.user.userId,
    });
    //if a like alredy exists then delte it
    if (existingLike) {
      likeable.likes.pull(existingLike._id);
      likeable.save();
      // existingLike.remove();
      await Like.deleteOne({ _id: existingLike._id });
      deleted = true;
      
    } else {
      //else make a new like

      let newLike = await Like.create({
        user:  req.user.userId,
        likeable: req.query.likeable_id,
        onModel: req.query.likeable_type,
      });

      likeable.likes.push(newLike);
      likeable.save();
    }
    
    return res.status(200).json({
        success:true,
      message: "yuy!! your like are toggled!!",
      data: {
        deleted: deleted,
        length:likeable.likes.length
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

module.exports.getLikes = async (req, res) => {
  try {
    let likes;
    if (req.query.likeable_type == "Post") {
      likes = await Post.findById(req.query.likeable_id).populate("likes");
    } else {
        likes = await Comment.findById(req.query.likeable_id).populate("likes");
    }
    res
      .status(200)
      .json({
        success:true,
        message: `List of likes on ${req.query.likeable_id} :: ${req.query.likeable_type}`,
        data:{
            likes
        }
      });
  } catch (error) {
     return res.status(500).json(error);
  }
};
