const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET = "Namaste";

const {
  validateName,
  validateEmail,
  validatePassword,
  validateUserName,
} = require("../utils/validators");

router.post("/signup", async (req, res) => {
  try {
    const { first_name, last_name, user_name, email, password, bio } = req.body;

    const existingUser = await User.findOne({ where: { email: email } });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(403)
        .json({ error: "User with the email already exists" });
    }

    if (!validateName(first_name)) {
      return res.status(400).json({
        error:
          "Invalid first name: name must be longer than two characters and must not include any numbers or special characters",
      });
    } else if (!validateName(last_name)) {
      return res.status(400).json({
        error:
          "Invalid last name: name must be longer than two characters and must not include any numbers or special characters",
      });
    } else if (!validateUserName(user_name)) {
      return res.status(400).json({
        error:
          "Invalid username: name must be longer than 2 characters and must inclue numbers with it",
      });
    } else if (!validateEmail(email)) {
      return res.status(400).json({
        error: "Invalid Email Id",
      });
    } else if (!validatePassword(password)) {
      return res.status(400).json({
        error:
          "Invalid password: password must be at least 8 characters long and must include atleast one - one uppercase letter, one lowercase letter, one digit, one special character",
      });
    }

    const hashedPassword = await bcrypt.hash(password, (saltOrRounds = 10));

    const profileImage = req.file ? req.file.path : "uploads/default.png";

    const newUser = await User.create({
      first_name,
      last_name,
      user_name,
      email,
      password: hashedPassword,
      bio,
      profileImage: profileImage,
    });

    return res.status(201).json({
      message: `User Signed up successfully!`,
      user: {
        id: newUser.id,
        user_name: newUser.user_name,
        email: newUser.email,
        password: newUser.password,
        bio: newUser.bio,
        profileImage: newUser.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ err: error.message });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email.length === 0) {
      return res.status(400).json({
        error: "Please enter a email to continue",
      });
    }
    if (password.length === 0) {
      return res.status(400).json({
        error: "Please enter password",
      });
    }

    const existingUser = await User.findOne({ where: { email: email } });

    if (!existingUser) {
      return res.status(400).json({
        error: "Email Not Found.",
      });
    }

    //* hashes the entered password and then compares it to the hashed password stored in the database
    const passwordMatched = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!passwordMatched) {
      return res.status(400).json({
        error: "Password doesn't matches",
      });
    }

    const payload = { user: { id: existingUser.dataValues.id } };
    const bearerToken = await jwt.sign(payload, SECRET, {
      expiresIn: 360000,
    });

    res.cookie("t", bearerToken, { expire: new Date() + 9999 });

    // console.log(res.cookie);
    return res.status(200).json({
      message: "Signed in Successfully!",
      bearerToken: bearerToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/signout", async (req, res) => {
  try {
    res.clearCookie("t");
    return res.status(200).json({ message: "Signed Out Successfully" });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
});

module.exports = router;
