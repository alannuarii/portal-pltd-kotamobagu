const mongoose = require("mongoose");

// Membuat Schema
const Pers = mongoose.model("persediaan", {
  dateIn: {
    type: Date,
  },
  noMat: {
    type: String,
  },
  descMat: {
    type: String,
  },
  stock: {
    type: Number,
    default: 0,
  },
  satuan: {
    type: String,
  },
  hargaSat: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
  totHarga: {
    type: Number,
    default: function () {
      return this.stock * this.hargaSat;
    },
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

module.exports = Pers;
