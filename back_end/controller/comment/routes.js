const { Router } = require("express");
const is_authenticated = require("../../middleware/authenticated");
const {
  getComments,
  getComment,
  addComment,
  deleteComment,
  updateComment,
} = require("./handler");

const router = Router();

router.get("/getComments/:id", is_authenticated, getComments);
router.get("/getComment/:id", is_authenticated, getComment);
router.post("/addComment", is_authenticated, addComment);
router.patch("/updateComment/:id", is_authenticated, updateComment);
router.delete("/deleteComment", is_authenticated, deleteComment);

module.exports = router;
