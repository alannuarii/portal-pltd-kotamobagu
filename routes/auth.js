// const express = require("express");
// const router = express.Router();
// const crypto = require("crypto");
// const User = require("../model/user");
// const { cookie } = require("express/lib/response");

// // Menampilkan Pages Registrasi
// router.get("/login", (req, res) => {
//   res.render("pages/login");
// });

// // Menampilkan Pages Registrasi
// router.get("/register", (req, res) => {
//   res.render("pages/register");
// });

// const getHashedPassword = (password) => {
//   const sha256 = crypto.createHash("sha256");
//   const hash = sha256.update(password).digest("base64");
//   return hash;
// };

// router.post("/register", async (req, res) => {
//   const { name, email, password, confirmPassword } = req.body;

//   // Check if the password and confirm password fields match
//   if (password === confirmPassword) {
//     // Check if user with the same email is also registered
//     if (await User.findOne({ email: email })) {
//       res.render("pages/register", {
//         message: "User already registered.",
//         messageClass: "alert-danger",
//       });

//       return;
//     }

//     const hashedPassword = getHashedPassword(password);

//     // Store user into the database if you are using one
//     await User.insertMany({
//       name: name,
//       email: email,
//       password: hashedPassword,
//     });

//     res.render("pages/login", {
//       message: "Registration Complete. Please login to continue.",
//       messageClass: "alert-success",
//     });
//   } else {
//     res.render("pages/register", {
//       message: "Password does not match.",
//       messageClass: "alert-danger",
//     });
//   }
// });

// const generateAuthToken = () => {
//   return crypto.randomBytes(30).toString("hex");
// };

// // This will hold the users and authToken related to users
// const authTokens = {};

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   const hashedPassword = getHashedPassword(password);

//   const user = await User.findOne({ $and: [{ email: email }, { password: hashedPassword }] });
//   // console.log(user);

//   if (user) {
//     const authToken = generateAuthToken();

//     // Store authentication token
//     authTokens[authToken] = user;

//     // Setting the auth token in cookies
//     res.cookie("AuthToken", authToken);

//     // Redirect user to the protected page
//     res.redirect("/layout");
//   } else {
//     res.render("pages/login", {
//       message: "Invalid username or password",
//       messageClass: "alert-danger",
//     });
//   }
// });

// router.use((req, res, next) => {
//   // Get auth token from the cookies
//   const authToken = req.cookies["AuthToken"];

//   // Inject the user to the request
//   req.user = authTokens[authToken];

//   next();
// });

// const requireAuth = (req, res, next) => {
//   if (req.user) {
//     next();
//   } else {
//     res.render("pages/login", {
//       message: "Please login to continue",
//       messageClass: "alert-danger",
//     });
//   }
// };

// // router.get("/layout", requireAuth, (req, res) => {
// //   res.render("pages/layout");
// // });

// router.get("/logout", (req, res) => {
//   res.clearCookie("AuthToken");
//   res.redirect("/login");
// });

// module.exports = {router, requireAuth};
