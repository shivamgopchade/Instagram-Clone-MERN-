const { Router } = require("express");
const is_authenticated = require("../../middleware/authenticated");
const { detail, deleteProfile, update, Profiledetail } = require("./handler");
const router = Router();

router.get("/detail/:id", is_authenticated, detail);
router.get("/Profiledetails/:id", is_authenticated, Profiledetail);
router.post("/update/:id", is_authenticated, update);
router.delete("/delete/:id", is_authenticated, deleteProfile);

module.exports = router;
