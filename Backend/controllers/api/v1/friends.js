const User = require("../../../model/user");
const Friendships = require("../../../model/friendship");

module.exports.addandremoveFriend = async function (req, res) {
  if (req.user.userId !== req.query.user_id) {
    let existingFriendship = await Friendships.findOne({
      from_user: req.user.userId,
      to_user: req.query.user_id,
    });

    let toUser = await User.findById(req.user.userId);
    let fromUser = await User.findById(req.query.user_id);

    let deleted = false;

    if (existingFriendship) {
      toUser.friend.pull(existingFriendship._id);
      fromUser.friend.pull(existingFriendship._id);
      toUser.save();
      fromUser.save();
       // existingFriendship.remove();
       await Friendships.deleteOne({ _id:existingFriendship._id });
      deleted = true;
      removeFriend = true;
    } else {
      let friendship = await Friendships.create({
        to_user: req.query.user_id,
        from_user: req.user.userId,
      });

      toUser.friend.push(friendship);
      fromUser.friend.push(friendship);
      toUser.save();
      fromUser.save();
      
    }
    
    if(deleted){
      return res.status(200).json({
        success: true,
        message: "friends Removed",
      });  
    }else{
      let NewFriendship = await(await Friendships.findOne({
        from_user: req.user.userId,
        to_user: req.query.user_id,
      }).populate('from_user')).populate('to_user');
   
      return res.status(200).json({
        success: true,
        message: `Now you're friends with ${NewFriendship.to_user.name}`,
        data:{
          friendship:NewFriendship
        }
      });
    }

  
  }else{
    
    return res.status(200).json({
        success: true,
        message: "You cannot send freind request to own",
      });
  }
};

module.exports.getallfriends = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).populate({
      path:'friend',
      populate:{
        path:'to_user'
      }
    });
    return res.status(200).json({
      success: true,
      message: "friend list",
      data: {
        friends: [...user.friend],
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};
