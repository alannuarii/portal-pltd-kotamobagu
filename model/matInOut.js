const mongoose = require("mongoose");

// Membuat Schema
const MatInOut = mongoose.model("matinout", {
  noMat: {
    type: String,
  },
  descMat: {
    type: String,
  },
  matIn: {
    type: Number,
  },
  dateIn: {
    type: Date,
  },
  matOut: {
    type: Number,
  },
  dateOut: {
    type: Date,
  },
  satuan: {
    type: String,
  },
});

// const pers1 = new Pers({
//   noMat: "000000003110514",
//   descMat: "CABLE PWR;NYY;1X70mm2;0.6/1kV;Opstig",
//   satuan: "M",
//   stock: 0,
//   hargaSat: 0,
//   totHarga: 0,
// });

// pers1.save().then((data) => console.log(data));

module.exports = MatInOut;
