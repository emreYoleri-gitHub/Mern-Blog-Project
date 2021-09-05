import express from "express";
import mongoose from "mongoose";
import Post from "../db/postModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Post id is not valid" });

    const post = await Post.findById(id);

    if (!post) return;

    res.status(299).json(post);
  } catch (error) {
    res.status(404).json({ message: "Post not found" });
  }
});

router.post("/", async (req, res) => {
  try {
    const post = req.body;

    const createdPost = await Post.create(post);

    res.status(201).json(createdPost);
  } catch (error) {
    res.json({ message: "create post faled" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Post id is not valid" });

    const { title, content, creator, image } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { title, content, creator, image, _id: id },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (error) {
    res.json({ message: "update post failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: "Post id is not valid" });

    await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post has been deleted" });
  } catch (error) {
    res.json({ message: "Post delete failed" });
  }
});

export default router;
