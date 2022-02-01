const mongoose = require("mongoose");
// const moment = require('')

const current = new Date();
const timeStamp = new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(), current.getMinutes()));

// Membuat Schema
const Tamu = mongoose.model("visitor", {
  nama: {
    type: String,
  },
  instansi: {
    type: String,
  },
  nohp: {
    type: String,
  },
  tujuan: {
    type: String,
  },
  tglDatang: {
    type: Date,
    default: timeStamp,
  },
});

// const user1 = new User({
//   name: "Alan Nuari",
//   email: "alan@gmail.com",
//   password: "12345678",
// });

// user1.save().then((data) => console.log(data));

module.exports = Tamu;
