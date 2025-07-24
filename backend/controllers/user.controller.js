const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const z = require("zod");
const config = require("../config");
const jwt = require("jsonwebtoken");
const path = require("path");
// const axios = require("axios");

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ errors: "Invalid email" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ errors: "Invalid password" });
    }
    const token = jwt.sign(
      {
        id: user._id,
      },
      config.JWT_USER_PASSWORD,
      {
        expiresIn: "1d",
      }
    );
    const cookieOptions = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // 1 day
      httpOnly: true, //  can't be accsed via js directly
      secure: process.env.NODE_ENV === "production", // true for https only
      sameSite: "Strict", // CSRF attacks
    };
    res.cookie("jwt", token, cookieOptions);
    res
      .status(200)
      .json({ message: "Login successfully", token, success: true });
  } catch (error) {
    console.log("error in login", error);
    res.status(400).json({ errors: "error while loggin" });
  }
};

const signup = async (req, res) => {
  const { firstName, lastName, phoneNo, email, password } = req.body;

  // Regex for validate indian phone no.
  const regex = /^\+91[6-9]\d{9}$/;
  const validateNumber = regex.test(phoneNo);
  if (!validateNumber) {
    return res.status(400).json({ errors: "Enter valid Indian phone no" });
  }
  const existingNumber = await userModel.findOne({ phoneNo });
  if (existingNumber) {
    return res
      .status(400)
      .json({ message: "User already exist on this number" });
  }
  const existingMail = await userModel.findOne({ email });
  if (existingMail) {
    return res.status(400).json({ message: "User already exist on this mail" });
  }
  const userValidate = z.object({
    firstName: z.string().min(1, { message: "First name is required" }),
    lastName: z.string().min(1, { message: "Last name is required" }),
    phoneNo: z
      .string()
      .min(10, { message: "Phone number must be at least 10 digits" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be atleast 8 char long" }),
  });
  const validateData = userValidate.safeParse(req.body);
  if (!validateData.success) {
    return res
      .status(400)
      .json({
        errors: "error while sign up 400",
        issues: validateData.error.issues.map((err) => err.message),
      });
  }
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const userData = new userModel({
      firstName,
      lastName,
      phoneNo,
      email,
      password: hashedPassword,
    });
    await userData.save();
    res.status(200).json({ message: "Signup successfully", success: true });
  } catch (error) {
    console.log("Error while sighup", error);
    res.status(401).json({ errors: "Error while signing up" });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.log("error in logout", error);
    res.status(500).json({ errors: "Error in logout" });
  }
};

const downloadFile = async (req, res) => {
  try {
    // Check if the user is authorized to download the file
    const filePath = path.join(__dirname, "../public/doc/CV.pdf");
    res.download(filePath, function (err) {
      if (err) {
        console.log("Error in downloading file", err);
        res.status(500).json({ errors: "Error in downloading file" });
      }
    });
  } catch (error) {
    console.log("error in download file", error);
    res.status(500).json({ errors: "Error in downloading file" });
  }
};

const data = async (req, res) => {
  try {
    const profileData = req.userId;
    const user = await userModel.findById(profileData);
    if (!user) {
      return res.status(404).json({ errors: "User not found11" });
    }
    res.status(200).json({ user });
  } catch (error) {
    console.log("error in fetching user data", error);
    res.status(500).json({ errors: "Error in fetching user data12" });
  }
};

const userController = { login, signup, logout, downloadFile, data };

module.exports = userController;
