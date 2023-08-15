const { default: mongoose } = require("mongoose");
const Post = require("../models/postModel");
const slugify = require("slugify");

createPost = async (req, res) => {
  let { title, content, user } = req.body;
  const slug = slugify(title);
  if (!user) {
    user = "admin";
  }
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content is required" });
  }
  try {
    const post = await Post.create({
      title: title,
      content: content,
      slug: slug,
      user: user,
    });
    res.json(post);
  } catch (error) {
    console.log("create error", error);
    res.status(400).json({ error });
  }
};

const getPost = async (req, res) => {
  try {
    const allPost = await Post.find({}).sort({ createdAt: -1 });

    res.json(allPost);
  } catch (error) {
    console.log(error);
  }
};

const getAPost = async (req, res) => {
  const search = req.params.slug;
  try {
    const searchPost = await Post.find({ slug: search });
    res.json(searchPost);
  } catch (error) {
    console.log(error);
  }
};

const updatePost = async (req, res) => {
  let { title, content, user } = req.body;
  const slugtitle = slugify(title);
  if (!user) {
    user = "admin";
  }
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content is required" });
  }
  const { slug } = req.params;
  try {
    const newPost = await Post.findOneAndUpdate(
      { slug: slug },
      { title: title, content: content, slug: slugtitle, user: user },
      { new: true }
    );
    console.log(newPost);
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  const { slug } = req.params;
  try {
    await Post.findOneAndDelete({ slug: slug });
  } catch (error) {
    console.log(error);
  }
  try {
    const allPost = await Post.find({}).sort({ createdAt: -1 });

    res.json(allPost);
  } catch (error) {
    console.log(error);
  }
};
module.exports = { createPost, getPost, getAPost, updatePost, deletePost };
