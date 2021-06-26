const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require('validator');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Name is Required.'],
  },
  userName: {
    type: String,
    required: [true, 'Username is Required.'],
    unique: [true, 'Username already exits. Choose another one']
  },
  email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: [true, 'Email is already exits with another id.'],
    lowercae: true,
    validate: [validator.isEmail, 'Please enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minLenght: 8
  },
  register_date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model("User", userSchema);
