const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const {
  createComment,
  getComments,
  deleteComment,
  updateComment,
} = require("../controllers/commentController");

router.post("/:blogId", isAuth, createComment);
router.get("/:blogId", getComments);
router.delete("/delete/:commentId", isAuth, deleteComment);
router.put("/edit/:commentId", isAuth, updateComment)

module.exports = router;
