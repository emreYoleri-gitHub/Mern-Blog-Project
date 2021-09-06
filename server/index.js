import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import postRouter from "./routers/postRouter.js";

dotenv.config();
const app = express();

app.use(express.json({ limit: "20mb" }));
app.use(cors({credentials : true , origin : "http://localhost:3000"}));

app.use("/posts", postRouter);


app.get("/", (req, res) => {
  res.json({ message: "connected" });
});

app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("conntected to db"))
    .catch((err) => console.log(err));
});
