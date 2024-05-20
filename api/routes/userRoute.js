import express from "express";
import {
  Create,
  getAllData,
  getUser,
  deleteUser,
  updateUser,
  Login
} from "../controller/userController.js";
const Route = express.Router();

Route.post("/create", Create);
Route.get("/find", getAllData);
Route.get("/user/:id", getUser);
Route.delete("/delete/:id", deleteUser);
Route.put("/update/:id", updateUser);
Route.post('/login',Login);

export default Route;
