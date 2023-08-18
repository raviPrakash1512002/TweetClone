const Post = require("../../../model/post");

const User = require("../../../model/user");

module.exports.createpost = async (req, res) => {
  try {
    const mergedata={
      user:req.user.userId,
      content:req.body.content
    }
    const newpost = new Post(mergedata);
    const post = await (await newpost.save()).populate('user');
    res.status(200).json({
      message: "Post created Successfully!!!",
      success: true,
      data: { post: post },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getpost = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const skip = (page - 1) * limit;
    const post = await Post.find().skip(skip).limit(limit).populate('user').populate({path:'comments',populate:{path:'user'}});
    
    res.status(200).json({
      success: true,
      message: "all post get successfully",
      data: {
        next: {
          page: 2,
          limit: 5,
        },
        posts: post,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};
