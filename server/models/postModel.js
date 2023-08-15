const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      minlength: 3,
      maxlength: 200,
      require: [true, "Please enter a title"],
    },
    slug: {
      type: String,
      unique: true,
      minlength: 3,
      maxlength: 200,
      reqyured: true,
      lowercase: true,
    },
    content: {
      type: {},
      required: true,
      minlength: 20,
      maxlength: 200000,
    },
    user: {
      type: String,
      default: "admin",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
