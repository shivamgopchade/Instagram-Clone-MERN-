const comment_model = require("../../model/Comment");
const Post = require("../../model/post");

module.exports.getComments = async (req, res) => {
  const post_id = req.params.id;
  try {
    const comments = await comment_model.find({ post: post_id });
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.getComment = async (req, res) => {
  try {
    const comment_id = req.params.id;
    const comment = await comment_model.findById(comment_id);
    res.status(200).json(comment);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.addComment = async (req, res) => {
  try {
    const body = req.body;
    //console.log(body);
    const comment = new comment_model(body);
    comment.save((err, doc) => {
      if (!err) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        console.log(err);
        res.status(400).json(err);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

module.exports.deleteComment = async (req, res) => {
  try {
    const body = req.body;
    const comment = await comment_model.findOne(body);
    const r = await comment_model.findByIdAndDelete(comment._id);
    res.status(200).json(r);
  } catch (error) {
    res.status(400).json(error);
  }
};

module.exports.updateComment = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const doc = await comment_model.findByIdAndUpdate(id, body);
    res.status(200).json(doc);
  } catch (error) {
    res.status(400).json(error);
  }
};
