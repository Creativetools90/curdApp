import users from "../model/userModel.js";
import jwt from "jsonwebtoken";
// for create users
export const Create = async (req, res) => {
  try {
    const userData = new users(req.body);

    if (!userData) return res.status(404).json({ message: "User not Created" });
    const SaveData = await userData.save();
    res.status(200).json({ msg: "user created successfully", SaveData });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// for get all users
export const getAllData = async (req, res) => {
  try {
    const usersData = await users.find();
    if (!usersData) return res.status(404).json({ msg: "users not found" });
    res.status(200).json({ msg: "users found", usersData });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// find all users
export const getUser = async (req, res) => {
  try {
    const findUser = await users.findById(req.params.id);
    if (!findUser) {
      return res.status(404).json({ msg: "your user not found" });
    }
    res.status(200).json({ msg: "user found", findUser });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
// delete user
export const deleteUser = async (req, res) => {
  try {
    const findUser = await users.findById(req.params.id);
    if (!findUser) return res.status(404).json({ msg: "user not found" });
    const deleteUser = await users.findByIdAndDelete(req.params.id);
    if (!deleteUser) return res.status(404).json({ msg: "user not delete" });
    res.status(200).json({ msg: "user delete", findUser });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
// update user
export const updateUser = async (req, res) => {
  try {
    const id = await users.findById(req.params.id);
    if (!id) return res.status(404).json({ msg: "user not found" });
    const update = await users.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json({ msg: "user update done !", update });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

// login user
export const Login = async (req, res) => {
  try {
    const { email, pass } = req.body;
    // email checking
    const emailFind = await users.findOne({ email: email });
    // pass  checking
    if (pass !== emailFind.pass)
      return res.status(404).json({ msg: "invalid password" });
    const token = jwt.sign({ userId: emailFind._id }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.cookie("jwt_token", token, { httpOnly: true });
    res.status(200).json({ msg: "Login successful", emailFind  , token });
  } catch (e) {
    res.status(403).json({ msg: "invalid email",e });
  }
};