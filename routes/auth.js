const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../model/user");

// Menampilkan Pages Registrasi
router.get("/login", (req, res) => {
  res.render("pages/login");
});

// Menampilkan Pages Registrasi
router.get("/register", (req, res) => {
  res.render("pages/register");
});

const getHashedPassword = (password) => {
  const sha256 = crypto.createHash("sha256");
  const hash = sha256.update(password).digest("base64");
  return hash;
};

router.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  // Check if the password and confirm password fields match
  if (password === confirmPassword) {
    // Check if user with the same email is also registered
    if (await User.findOne({ email: email })) {
      res.render("pages/register", {
        message: "User already registered.",
        messageClass: "alert-danger",
      });

      return;
    }

    const hashedPassword = getHashedPassword(password);

    // Store user into the database if you are using one
    await User.insertMany({
      name: name,
      email: email,
      password: hashedPassword,
    });

    res.render("pages/login", {
      message: "Registration Complete. Please login to continue.",
      messageClass: "alert-success",
    });
  } else {
    res.render("pages/register", {
      message: "Password does not match.",
      messageClass: "alert-danger",
    });
  }
});

module.exports = router;
