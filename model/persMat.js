const mongoose = require("mongoose");

// Membuat Schema
const Pers = mongoose.model("persediaan", {
  noMat: {
    type: String,
  },
  descMat: {
    type: String,
  },
  satuan: {
    type: String,
  },
  stock: {
    type: Number,
  },
  hargaSat: {
    type: Number,
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
