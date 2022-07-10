const { Router } = require("express");
const is_authenticated = require("../../middleware/authenticated");
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  detailPost,
  likePost,
  userposts,
} = require("./handler");

const router = Router();

//get all posts
router.get("/posts", is_authenticated, getPosts);

//create a post
router.post("/createPost", is_authenticated, createPost);

//update post
router.patch("/updatePost/:id", is_authenticated, updatePost);

//like post
router.patch("/likePost/:id", is_authenticated, likePost);

//delete post
router.delete("/deletePost/:id", is_authenticated, deletePost);

//post detail(comments)
router.get("/detailPost/:id", is_authenticated, detailPost);

router.post("/userposts", is_authenticated, userposts);

module.exports = router;
