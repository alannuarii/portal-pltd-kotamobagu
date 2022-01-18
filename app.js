const express = require("express");
const methodeOverride = require("method-override");
const cookieParser = require("cookie-parser");
const path = require("path");
const con = require("./config/db");
const app = express();

// Setup EJS
app.set("view engine", "ejs");

// Menggunakan Built-In Middleware untuk Akses File Static di Folder Public
app.use(express.static(path.join(__dirname, "public")));

// Parsing Body Request
app.use(express.urlencoded({ extended: true }));
app.use(methodeOverride("_method"));

// Parsing Cookie from HTTP Request
app.use(cookieParser());

// Include Router
const router = require("./routes/router");
app.use("/", router);

// Starting Server
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
