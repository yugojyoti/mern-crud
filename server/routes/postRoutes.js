const express = require("express");

const router = express.Router();
const {
  createPost,
  getPost,
  getAPost,
  updatePost,
  deletePost,
} = require("../controllers/postControllers");

router.post("/post", createPost);
router.get("/post", getPost);
router.get("/post/:slug", getAPost);
router.patch("/post/update/:slug", updatePost);
router.delete("/post/:slug", deletePost);

module.exports = router;
