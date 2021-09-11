import express from "express";
import mongoose from "mongoose";
import User from "../db/userModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const user = req.body;

    const createdUser = await User.create(user);

    res.status(201).json(createdUser);
  } catch (error) {
    res.json({ message: "create user failed" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(404).json({
        message: "User not found",
      });

    const isPasswordCorrect =
      email === user.email && password === user.password;

    if (!isPasswordCorrect)
      return res.status(404).json({
        message: "Wrong password",
      });

    res.status(200).json({ user, accessToken });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
