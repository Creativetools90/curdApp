import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
// import route
import Route from "./routes/userRoute.js";
const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
app.use("/api", Route);
const url = process.env.database_url;
mongoose
  .connect(url)
  .then(() => {
    console.log("db is connected");
    app.listen(3000, () => {
      console.log("server is runniung");
    });
  })
  .catch((e) => console.log("not connected", e));
