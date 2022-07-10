const user_model = require("../../model/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Profile = require("../../model/Profile");
require("dotenv").config();
//jwt creator
const createToken = (id) => {
  const age = 3 * 24 * 60 * 60;
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: age });
};

//user registration
module.exports.register = async (req, res) => {
  const user = req.body;
  //console.log("in register:", user);
  new_user = new user_model(user);
  new_user.save((err, doc) => {
    if (!err) {
      const token = createToken(doc._id);
      //console.log(token);
      res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 3 * 24 * 60 * 60 * 1000,
      });
      console.log(user.name);
      new_profile = new Profile({ user: doc._id, name: user.name });
      new_profile.save((err, doc) => {
        if (!err) res.status(200).json({ user: doc });
        else res.status(400).json(err);
      });
    } else {
      console.log(err);
      res.status(400).json({ error: err });
    }
  });
};

//user update
module.exports.update = async (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with such id");

  try {
    const user = await user_model.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};

//user details
module.exports.details = async (req, res) => {
  const id = req.params.id;
  console.log(req.cookies);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "no user found" });

  try {
    const user = await user_model.findById(id);
    if (user) res.status(200).json(user);
    else res.status(404).json({ message: "no user found" });
  } catch (e) {
    console.log(e);
  }
};

//delete user
module.exports.delete_user = async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).json({ message: "No user with such id" });

  try {
    const data = await user_model.findByIdAndDelete(id);
    res.status(200).json({ message: "user deleted successfully" });
  } catch (e) {
    console.log(e);
  }
};

//deactivate user
module.exports.deactivate = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No user with such id");

  try {
    let body = await user_model.findById(id);
    body = { ...body, active: false };
    const user = await user_model.findByIdAndUpdate(id, body, { new: true });
    res.status(200).json(user);
  } catch (e) {
    console.log(e);
  }
};
//user singin
module.exports.signin = async (req, res) => {
  const detail = req.body;
  //console.log(detail);
  try {
    const user = await user_model.findOne({ username: detail.username });
    if (user) {
      const auth = await bcrypt.compare(detail.password, user.password);
      if (auth) {
        const token = createToken(user._id);
        // console.log(token);
        res.cookie("jwt", token, {
          httpOnly: true,
          maxAge: 3 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({ user: user });
      } else {
        res.status(400).json({
          error:
            "Sorry, your password was incorrect. Please double-check your password.",
        });
      }
    } else
      res.status(400).json({
        error:
          "Sorry, your username was incorrect. Please double-check your username.",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//user sign out
module.exports.signout = async (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).json({ message: "logged out" });
};

//user validator
module.exports.validate_user = async (req, res) => {
  const doc = req.body;
  const errors = {};
  try {
    let user = await user_model.findOne({ username: doc.username });

    if (user) errors["username"] = "User with this username already exists.";

    user = await user_model.findOne({ email: doc.email });
    if (user) errors["email"] = "User with this email already exists.";

    if (doc.password.length < 6)
      errors["password"] = "Password must be greater than 6 character";

    if (doc.age < 18) errors["age"] = "Age must be greater than 18";

    res.status(200).json(errors);
  } catch (error) {
    res.status(400).json(error);
  }
};
