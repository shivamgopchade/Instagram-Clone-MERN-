const { Router } = require("express");
const is_authenticated = require("../../middleware/authenticated");
const router = Router();
const {
  register,
  update,
  delete_user,
  details,
  signin,
  signout,
  validate_user,
  deactivate,
} = require("./handlers");

router.post("/signin", signin);
router.get("/signout", is_authenticated, signout);
router.get("/details/:id", is_authenticated, details);
router.post("/register", register);
router.patch("/update/:id", is_authenticated, update);
router.patch("/deactivate/:id", is_authenticated, deactivate);
router.delete("/delete/:id", is_authenticated, delete_user);
router.post("/validator", validate_user);

module.exports = router;
