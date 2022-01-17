const mongoose = require("mongoose");

// Membuat Schema
const User = mongoose.model("user", {
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  //   tglDaftar: {
  //     type: Date,
  //     default: Date.now,
  //   },
});

// const user1 = new User({
//   name: "Alan Nuari",
//   email: "alan@gmail.com",
//   password: "12345678",
// });

// user1.save().then((data) => console.log(data));

module.exports = User;
