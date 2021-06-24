const User = require('../models/UserModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../Utils/generateToken');

exports.loginUser = asyncHandler(async (req,res, next) => {
    console.log('loging user.. ..')
    const {email, password} = req.body;
    const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    // const token = generateToken(user._id);
    const secondsInWeek = 604800;

    // res.cookie("token", token, {
    //   httpOnly: true,
    //   maxAge: secondsInWeek * 1000
    // });

    res.status(200).json({
      success: {
        user: {
          id: user._id,
          userName: user.userName,
          email: user.email,
          fullName: user.fullName
        }
      }
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
//   
})

exports.registerUser = asyncHandler(async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.status(201).json({status: 'success', user: newUser})
    }catch(err){
        console.log(err)
        res.status(400).json({status: 'fail', message: 'Something went wrong..'})
    }
})