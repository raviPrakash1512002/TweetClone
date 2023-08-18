const User = require("../../../model/user");
const Friendships = require("../../../model/friendship");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
module.exports.signup = async (req, res) => {
  try {
    const { name, email, password, confirm_password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res
        .status(409)
        .json({ message: "User already exists with this email" });
    }

    if (!name || !email || !password || !confirm_password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }

    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(200).json({
      message: "New account created successfully",
      success: true,
      data: {
        user: savedUser,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// module.exports.signup = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email});

//     if (!user) {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(req.body.password, salt);

//       const hashedconfirm_password = await bcrypt.hash(
//         req.body.confirm_password,
//         salt
//       );

//       if (hashedPassword === hashedconfirm_password) {
//         const newUser = new User({
//           name: req.body.name,
//           email: req.body.email,
//           password: hashedPassword,
//           confirm_password: hashedconfirm_password,
//         });
//         console.log(newUser);
//         console.log("1");
//         const user = await newUser.save();
//         console.log("2");
//         return res.status(200).json({
//           message: "New account created successfully",
//           success: true,
//           data: {
//             user: user,
//           },
//         });
//       }
//       return res.status(401).json({
//         message: "Password and confirm passowrd not match",
//       });
//     }
//     return res.status(401).json({
//         message: "User already exit with this email",
//       });

//   } catch (error) {
//     console.log("3");
//     return res.status(500).json( error);
//   }
// };

module.exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json("email not found!!");
    }
    const validpassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validpassword) {
      res.status(422).json("wrong credentials!!");
    }
    const payload = {
      userId: user._id,
      name: user.name,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);
    const { password, ...others } = user.toJSON();
    res.status(200).json({
      message: "login Successfullyyyy!!",
      success: true,
      data: {
        token: token,
        user: others,
      },
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports.getUser = async (req, res) => {
  try {
    let user = await User.findById({ _id: req.params.id }).select(
      "id name email"
    );
    // const {password,...otherInformation}=user.toJSON()
    return res.status(200).json({
      message: "User found",
      success: true,
      data: {
        user: user,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id, name, password, confirm_password } = req.body;
    if (!id || !name || !password || !confirm_password) {
      return res
        .status(400)
        .json({ message: "Please provide all the required fields" });
    }
    if (password !== confirm_password) {
      return res
        .status(400)
        .json({ message: "Password and confirm password do not match" });
    }
    let usertoupdate = await User.findById(req.body.id);
    if (!usertoupdate) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    usertoupdate.name = name;
    usertoupdate.password = hashedPassword;

    const savedUser = await usertoupdate.save();
    const payload = {
      userId: savedUser._id,
      name: savedUser.name,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY);

    return res.status(200).json({
      message: "Upadate successfully",
      success: true,
      data: {
        user: savedUser,
        token: token,
      },
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports.search = async (req, res) => {
  try {
    const searchText = req.query.text;

    // Build the query to find users with names starting with the searchText using the $regex operator
    const query = { name: { $regex: `^${searchText}`, $options: "i" } };
    const user = await User.find(query);

    return res.status(200).json({
      success: true,
      data: {
        users: user,
      },
    });
  } catch (error) {
    console.log("hellosearchneg");
    return res.status(500).json(error);
  }
};
