const post_model = require("../../model/post");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const profile_model = require("../../model/Profile");

module.exports.getPosts = async (req, res) => {
  try {
    const posts = await post_model.find().sort({ _id: -1 });
    //console.log("found");
    res.status(200).json(posts);
  } catch (err) {
    console.log(err);
    res.status(300).json({ error: error });
  }
};

module.exports.createPost = async (req, res) => {
  let post_detail = req.body;
  const profile = await profile_model.findOne({ user: post_detail.user });
  //console.log("image is", img.profile_image);
  post_detail = {
    ...post_detail,
    profile_image: profile.profile_image,
  };
  const post = new post_model(post_detail);
  post.save((err, doc) => {
    if (!err) {
      console.log("post created");
      res.status(200).json({ message: "post created" });
    } else {
      res.status(400).json({ message: "post not created", error: err });
    }
  });
};

module.exports.updatePost = async (req, res) => {
  const id = req.params.id;
  let post_detail = req.body;
  const profile = await profile_model.findOne({ user: post_detail.user });
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with such id");
  try {
    const post = await post_model.findByIdAndUpdate(id, post_detail, {
      new: true,
    });
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(300).json({ error: error });
  }
};

module.exports.likePost = async (req, res) => {
  const id = req.params.id;

  const { users, status } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with such id");
  try {
    console.log("started");
    const post = await post_model.findById(id);
    if (status === "like") {
      if (
        !post.likes.find((obj) => {
          return obj.toString() === users._id;
        })
      )
        post.likes.push(users);

      //console.log(post.likes.length);
    } else {
      post.likes = post.likes.filter((user) => {
        return user.toString() !== users._id;
      });
    }

    const post_updated = await post_model.findByIdAndUpdate(id, post, {
      new: true,
    });
    //console.log(post_updated);
    res.status(200).json({ id: id, user: users });
    console.log("ended");
  } catch (error) {
    console.log(error);
    res.status(300).json({ error: error });
  }
};

module.exports.deletePost = async (req, res) => {
  const id = req.params.id;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(400).send("no post with such id");
  try {
    const data = await post_model.findByIdAndDelete(id);
    res.status(200).json({ id: id });
  } catch (error) {
    res.status(300).json({ error: error });
  }
};

module.exports.detailPost = async (req, res) => {
  const id = req.params.id;
  //console.log(id);
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("no post with such id");
  try {
    //console.log(id);
    const data = await post_model.findOne({ _id: id });
    //console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(300).json({ error: error });
  }
};

module.exports.userposts = async (req, res) => {
  const user_id = req.body.user_id;
  console.log(user_id);
  if (!mongoose.Types.ObjectId.isValid(user_id))
    return res.status(404).send("no user with such id");

  try {
    const data = await post_model.find({ user: user_id }).sort({ _id: -1 });
    //console.log(data);
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
