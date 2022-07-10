const Post = require("../../model/Profile");
const mongoose = require("mongoose");
const Profile = require("../../model/Profile");
const user_model = require("../../model/user");
var ObjectID = require("mongodb").ObjectID;

module.exports.detail = async (req, res) => {
  const id = req.param.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ error: "no user found" });
  else {
    try {
      const doc = await Profile.findById(id);
      res.status(200).json(doc);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

module.exports.Profiledetail = async (req, res) => {
  const user_id = req.params.id;
  //console.log(user_id);
  try {
    const profile = await Profile.findOne({ user: new ObjectID(user_id) });
    //console.log("profile", profile);
    const user = await user_model.findById(profile.user);
    res.status(200).json({ profile, user });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.update = async (req, res) => {
  const id = req.params.id;
  const doc = req.body;
  //console.log(doc.bio);
  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ error: "no user found" });
  else {
    try {
      const updatedDoc = await Profile.findByIdAndUpdate(id, doc, {
        new: true,
      });
      //console.log(updatedDoc.bio);
      res.status(200).json(updatedDoc);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

module.exports.deleteProfile = async (req, res) => {
  const id = req.param.id;

  if (!mongoose.Types.ObjectId.isValid(id))
    res.status(400).json({ error: "no user found" });
  else {
    try {
      await Profile.findByIdAndDelete(id);
      res.status(200).json(doc);
    } catch (error) {
      res.status(400).json(error);
    }
  }
};
